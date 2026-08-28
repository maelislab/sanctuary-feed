// src/app/page.tsx
import { getAllVaultItems, VaultItem } from '@/lib/vault';
import path from 'path';
import ReactMarkdown from 'react-markdown';

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
          <div className="text-xs px-3 py-1 rounded bg-[#1C1A18] border border-amber-500/30 text-amber-400">
            SECURE ARCHIVE
          </div>
        </header>

        <section className="space-y-6">
          {items.length === 0 ? (
            <p className="text-[#8C8275] italic">Vault is empty. Run your ingress script to populate content.</p>
          ) : (
            items.map((item) => (
              <article
                key={item.slug}
                className="bg-[#181614] border border-[#2A2724] hover:border-amber-500/50 transition-colors p-6 rounded-none shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40" />
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-amber-500/80 font-semibold tracking-wider uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs text-[#8C8275]">{item.date}</span>
                </div>
                <h2 className="text-xl font-bold text-[#F5F2EB] mb-2">{item.title}</h2>
                {item.cover && (
                  <div className="mb-4 overflow-hidden border border-[#2A2724] w-64 relative">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                )}
                <p className="text-sm text-[#B3ACA1] mb-4">{item.summary}</p>
                <div className="text-sm text-[#D1CBC1] bg-[#121110] p-4 border border-[#24211E] prose prose-invert max-w-none">
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