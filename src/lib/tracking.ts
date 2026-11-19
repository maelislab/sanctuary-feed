// src/lib/tracking.ts
import { db } from '@/db';
import { episodes, seasons, vaultItems } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';

export async function getEntryTrackingData(slug: string) {
    const [item] = await db
        .select()
        .from(vaultItems)
        .where(eq(vaultItems.slug, slug))
        .limit(1);

    if (!item) return null;

    const itemSeasons = await db
        .select()
        .from(seasons)
        .where(eq(seasons.vaultItemId, item.id))
        .orderBy(asc(seasons.seasonNumber));

    const seasonIds = itemSeasons.map((s) => s.id);
    const allEpisodes =
        seasonIds.length > 0
            ? await db
                .select()
                .from(episodes)
                .orderBy(asc(episodes.episodeNumber))
            : [];

    const episodesBySeason = new Map<number, typeof allEpisodes>();
    for (const ep of allEpisodes) {
        if (!seasonIds.includes(ep.seasonId)) continue;
        const current = episodesBySeason.get(ep.seasonId) ?? [];
        current.push(ep);
        episodesBySeason.set(ep.seasonId, current);
    }

    return {
        item,
        seasons: itemSeasons.map((season) => ({
            ...season,
            episodes: episodesBySeason.get(season.id) ?? [],
        })),
    };
}