import { db } from '@/db';
import { episodes, seasons, vaultItems } from '@/db/schema';
import { and, desc, eq, like, or, sql } from 'drizzle-orm';

export interface VaultItem {
  id: number;
  slug: string;
  title: string;
  cover?: string | null;
  date: string;
  updated?: string | null;
  category: string;
  score?: string | null;
  ageRating?: string | null;
  year?: string | null;
  status?: string | null;
  genres?: string[];
  sources?: string[];
  summary: string;
  content: string;
  seasonsCount: number;
  watchedEpisodes: number;
  totalEpisodes: number;
}

export async function getAllVaultItems(filters?: {
  search?: string;
  category?: string;
  status?: string;
}): Promise<VaultItem[]> {
  try {
    const conditions = [];

    if (filters?.search) {
      const searchTerm = `%${filters.search}%`;
      conditions.push(
        or(
          like(vaultItems.title, searchTerm),
          like(vaultItems.summary, searchTerm),
          like(vaultItems.genres, searchTerm)
        )
      );
    }

    if (filters?.category && filters.category !== 'All') {
      conditions.push(eq(vaultItems.category, filters.category));
    }

    if (filters?.status && filters.status !== 'All') {
      conditions.push(eq(vaultItems.status, filters.status));
    }

    const baseQuery = db
      .select({
        item: vaultItems,
        seasonsCount: sql<number>`count(distinct ${seasons.id})`,
        totalEpisodes: sql<number>`count(${episodes.id})`,
        watchedEpisodes: sql<number>`coalesce(sum(case when ${episodes.watched} = 1 then 1 else 0 end), 0)`,
      })
      .from(vaultItems)
      .leftJoin(seasons, eq(seasons.vaultItemId, vaultItems.id))
      .leftJoin(episodes, eq(episodes.seasonId, seasons.id));

    const rows =
      conditions.length > 0
        ? await baseQuery
          .where(and(...conditions))
          .groupBy(vaultItems.id)
          .orderBy(desc(vaultItems.date))
        : await baseQuery
          .groupBy(vaultItems.id)
          .orderBy(desc(vaultItems.date));

    if (!Array.isArray(rows)) return [];

    return rows.map(({ item, seasonsCount, totalEpisodes, watchedEpisodes }) => ({
      ...item,
      cover: item.cover || undefined,
      score: item.score || undefined,
      ageRating: item.ageRating || undefined,
      year: item.year || undefined,
      status: item.status || undefined,
      updated: item.updated || undefined,
      summary: item.summary || '',
      genres: item.genres ? item.genres.split(',').map((g) => g.trim()) : [],
      sources: item.sources ? item.sources.split(',').map((s) => s.trim()) : [],
      seasonsCount: Number(seasonsCount) || 0,
      totalEpisodes: Number(totalEpisodes) || 0,
      watchedEpisodes: Number(watchedEpisodes) || 0,
    }));
  } catch (error) {
    console.error('Failed to fetch vault items from SQLite:', error);
    return [];
  }
}