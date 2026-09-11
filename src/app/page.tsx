// src/app/page.tsx
import { getAllVaultItems, VaultItem } from '@/lib/vault';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function SanctuaryHome() {
  const items: VaultItem[] = getAllVaultItems();

  return (
    <main className="min-h-screen bg-[#121110] text-[#E6E1DA] p-8 font-mono">
      <div className="max-w-3xl mx-auto">
        <header className="border-b border-[#2A2724] pb-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-amber-500">SANCTUARY // MEDIA VAULT</h1>
            <p className="text-xs text-[#8C8275] mt-1">Status: Isolated & Caching Locally. Zero telemetry.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/add"
              className="text-xs px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-600 text-[#121110] font-bold transition-colors"
            >
              + Add Entry
            </Link>
            <div className="text-xs px-3 py-1 rounded bg-[#1C1A18] border border-amber-500/30 text-amber-400">
              SECURE
            </div>
          </div>
          <div className="text-xs px-3 py-1 rounded bg-[#1C1A18] border border-amber-500/30 text-amber-400">
            SECURE ARCHIVE
          </div>
        </header>

        <section className="space-y-6">
          {items.length === 0 ? (
            <p className="text-[#8C8275] italic">Vault is empty. Run your ingress script to populate content.</p>
          ) : (
            // src/app/page.tsx snippet for rendering each article card
            items.map((item) => (
              <article
                key={item.slug}
                className="bg-[#181614] border border-[#2A2724] hover:border-amber-500/50 transition-colors p-6 rounded-none shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40" />

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-amber-500/80 font-semibold tracking-wider uppercase">
                      {item.category}
                    </span>
                    <Link
                      href={`/edit/${item.slug}`}
                      className="text-[10px] uppercase px-2 py-0.5 bg-[#1C1A18] border border-[#2A2724] hover:border-amber-500/50 text-[#B3ACA1] hover:text-amber-400 transition-colors"
                    >
                      [Edit]
                    </Link>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#8C8275] block">Added: {item.date}</span>
                    {item.updated && (
                      <span className="text-[10px] text-amber-500/70 block">
                        [Updated: {item.updated}]
                      </span>
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-[#F5F2EB] mb-4">{item.title}</h2>

                {/* Two-Column Grid: Cover Image (Left) + 4-Tier Pill Tags (Right) */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 mb-6 items-start">
                  {item.cover ? (
                    <div className="overflow-hidden border border-[#2A2724] h-72 relative bg-[#121110]">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-72 border border-[#2A2724] bg-[#121110] flex items-center justify-center text-xs text-[#8C8275]">
                      No Cover
                    </div>
                  )}

                  {/* 4-Tier Tag Section */}
                  <div className="space-y-3">
                    {/* Row 1: Score, Age-Rating, Year */}
                    <div className="flex flex-wrap gap-2 items-center">
                      {item.score && (
                        <span className="px-3 py-1 bg-[#1C1A18] border border-amber-500/40 text-amber-400 text-xs font-bold rounded-full flex items-center gap-1.5">
                          ★ {item.score}
                        </span>
                      )}
                      {item.ageRating && (
                        <span className="px-3 py-1 bg-[#1C1A18] border border-[#2A2724] text-[#D1CBC1] text-xs rounded-full">
                          👁 {item.ageRating}
                        </span>
                      )}
                      {item.year && (
                        <span className="px-3 py-1 bg-[#1C1A18] border border-[#2A2724] text-[#D1CBC1] text-xs rounded-full">
                          📅 {item.year}
                        </span>
                      )}
                    </div>

                    {/* Row 2: Status */}
                    {item.status && (
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                          🔄 {item.status}
                        </span>
                      </div>
                    )}

                    {/* Row 3: Genres */}
                    {item.genres && item.genres.length > 0 && item.genres[0] !== '' && (
                      <div className="flex flex-wrap gap-2 items-center pt-1">
                        {item.genres.map((genre, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[#121110] border border-[#2A2724] text-xs text-[#B3ACA1] rounded-full">
                            🏷 {genre}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Row 4: Sources */}
                    {item.sources && item.sources.length > 0 && item.sources[0] !== '' && (
                      <div className="flex flex-wrap gap-2 items-center pt-1 border-t border-[#2A2724]/50">
                        {item.sources.map((source, idx) => (
                          <span key={idx} className="px-2.5 py-0.5 bg-[#1C1A18] border border-[#2A2724] text-xs text-amber-500/90 rounded-full">
                            🔗 {source}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description / Content Section */}
                <div className="text-sm text-[#D1CBC1] bg-[#121110] p-4 border border-[#24211E] prose prose-invert max-w-none">
                  <h3 className="text-xs uppercase tracking-wider text-amber-500 font-bold mb-2">Description</h3>
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}