// src/components/EpisodeToggleButton.tsx
'use client';

import { toggleEpisodeWatched } from '@/actions/tracking-actions';
import { useTransition } from 'react';

interface Props {
    slug: string;
    episodeId: number;
    episodeNumber: number;
    title: string;
    watched: boolean;
}

export function EpisodeToggleButton({
    slug,
    episodeId,
    episodeNumber,
    title,
    watched,
}: Props) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() =>
                startTransition(() => {
                    toggleEpisodeWatched(slug, episodeId, watched);
                })
            }
            className={`w-full text-left px-3 py-2 border text-xs flex items-center justify-between transition-colors ${watched
                    ? 'bg-amber-500/15 border-amber-500/60 text-[#F5F2EB]'
                    : 'bg-[#121110] border-[#2A2724] text-[#8C8275] hover:border-amber-500/40'
                }`}
        >
            <span className="truncate">
                <strong className="text-amber-500 mr-2">EP {String(episodeNumber).padStart(2, '0')}</strong>
                {title || `Episode ${episodeNumber}`}
            </span>
            <span className="ml-2 shrink-0 uppercase tracking-wider text-[11px]">
                {isPending ? '...' : watched ? 'Watched' : 'Unwatched'}
            </span>
        </button>
    );
}