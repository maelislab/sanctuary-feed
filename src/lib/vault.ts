import path from 'path';
import { db } from '@/db';
import { vaultItems } from '@/db/schema';
import { desc, like, or, eq, and } from 'drizzle-orm';


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
  genres?: string[] | null;
  sources?: string[];
  summary?: string | null;
  content: string;
}

export async function getAllVaultItems(filters?: { search?: string; category?: string }): Promise<VaultItem[]> {
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
      )
    }

    if (filters?.category && filters.category !== 'All') {
      conditions.push(eq(vaultItems.category, filters.category));
    }

    const queryBuilder = db.select().from(vaultItems);

    const items = conditions.length > 0
      ? await queryBuilder.where(and(...conditions)).orderBy(desc(vaultItems.date))
      : await queryBuilder.orderBy(desc(vaultItems.date));

    if (!Array.isArray(items)) return [];

    return items.map((item) => ({
      ...item,
      cover: item.cover || undefined,
      score: item.score || undefined,
      ageRating: item.ageRating || undefined,
      year: item.year || undefined,
      status: item.status || undefined,
      updated: item.updated || undefined,
      genres: item.genres ? item.genres.split(',').map((g: string) => g.trim()) : [],
      sources: item.sources ? item.sources.split(',').map((s: string) => s.trim()) : []
    }));
  } catch (error) {
    console.error('Failed to fetch vault items from SQLite:', error);
    return [];
  }
};