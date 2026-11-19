// src/actions/tracking-actions.ts
'use server';

import { db } from '@/db';
import { episodes, seasons, vaultItems } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addSeasonWithEpisodes(slug: string, formData: FormData) {
    const seasonNumber = Number(formData.get('seasonNumber') || 1);
    const title = String(formData.get('title') || '').trim();
    const episodesCount = Math.max(0, Math.min(500, Number(formData.get('episodesCount') || 0)));

    const [item] = await db
        .select()
        .from(vaultItems)
        .where(eq(vaultItems.slug, slug))
        .limit(1);

    if (!item || seasonNumber < 1) return;

    const [createdSeason] = await db
        .insert(seasons)
        .values({
            vaultItemId: item.id,
            seasonNumber,
            title: title || `Season ${seasonNumber}`,
            episodesCount,
        })
        .onConflictDoNothing()
        .returning();

    const targetSeason =
        createdSeason ??
        (
            await db
                .select()
                .from(seasons)
                .where(and(eq(seasons.vaultItemId, item.id), eq(seasons.seasonNumber, seasonNumber)))
                .limit(1)
        )[0];

    if (targetSeason && episodesCount > 0) {
        const epRows = Array.from({ length: episodesCount }, (_, idx) => ({
            seasonId: targetSeason.id,
            episodeNumber: idx + 1,
            title: `Episode ${idx + 1}`,
            watched: false,
            watchedAt: '',
        }));

        await db.insert(episodes).values(epRows).onConflictDoNothing();
    }

    revalidatePath(`/edit/${slug}`);
    revalidatePath('/');
}

export async function toggleEpisodeWatched(slug: string, episodeId: number, currentWatched: boolean) {
    const nextWatched = !currentWatched;
    const today = new Date().toISOString().split('T')[0];

    await db
        .update(episodes)
        .set({
            watched: nextWatched,
            watchedAt: nextWatched ? today : '',
        })
        .where(eq(episodes.id, episodeId));

    revalidatePath(`/edit/${slug}`);
    revalidatePath('/');
}