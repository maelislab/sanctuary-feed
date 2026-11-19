import { updateVaultEntry } from '@/actions/vault-actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { addSeasonWithEpisodes } from '@/actions/tracking-actions';
import { EpisodeToggleButton } from '@/components/EpisodeToggleButton';
import { getEntryTrackingData } from '@/lib/tracking';

interface EditPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tracking = await getEntryTrackingData(slug);
  const addSeasonAction = addSeasonWithEpisodes.bind(null, slug);

  if (!tracking) {
    notFound();
  }

  const { item, seasons } = tracking;


  // Bind the slug to the server action
  const updateActionWithSlug = updateVaultEntry.bind(null, slug);

  const sourceToString = (s: string | string[] | null | undefined) =>
    Array.isArray(s) ? s.join(',') : (s ?? '');

  return (
    <main className="min-h-screen bg-[#121110] text-[#E6E1DA] p-8 font-mono">
      <div className="max-w-2xl mx-auto">
        <header className="border-b border-[#2A2724] pb-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-amber-500">SANCTUARY // EDIT ENTRY</h1>
            <p className="text-xs text-[#8C8275] mt-1">Updating local archive: {slug}.md</p>
          </div>
          <Link
            href="/"
            className="text-xs px-3 py-1 bg-[#1C1A18] border border-[#2A2724] hover:border-amber-500/50 text-[#B3ACA1] transition-colors"
          >
            ← Back to Vault
          </Link>
        </header>

        {!item ? (
          <div className="text-center py-20 border border-dashed border-[#2A2724] text-[#8C8275] text-sm">
            No entries found matching your query.
          </div>
        ) : (
          <form action={updateActionWithSlug} className="space-y-6 bg-[#181614] border border-[#2A2724] p-6 shadow-lg relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40" />

            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={item.title}
                required
                className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={item.category}
                  className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Cover Image URL</label>
                <input
                  type="url"
                  name="cover"
                  defaultValue={item.cover ?? ""}
                  className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Score</label>
                <input type="text" name="score" defaultValue={item.score ?? ""} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Age Rating</label>
                <input type="text" name="ageRating" defaultValue={item.ageRating ?? ""} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Year</label>
                <input type="text" name="year" defaultValue={item.year ?? ""} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Status</label>
                <input type="text" name="status" defaultValue={item.status ?? ""} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Genres</label>
                <input type="text" name="genres" defaultValue={sourceToString(item.sources)} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Sources</label>
                <input type="text" name="sources" defaultValue={sourceToString(item.sources)} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Summary / Logline</label>
              <input
                type="text"
                name="summary"
                defaultValue={item.summary ?? ""}
                className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Description Content</label>
              <textarea
                name="content"
                rows={8}
                defaultValue={item.content}
                required
                className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-[#2A2724]">
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#121110] font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {!seasons ? (
          <div className="text-center py-20 border border-dashed border-[#2A2724] text-[#8C8275] text-sm">
            No entries found matching your query.
          </div>
        ) : (
          <section className="mt-10 pt-8 border-t border-[#2A2724] space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-amber-500 uppercase tracking-wider">
                Seasons & Episodes
              </h2>
            </div>

            <form
              action={addSeasonAction}
              className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#181614] border border-[#2A2724] p-4"
            >
              <input
                type="number"
                name="seasonNumber"
                min={1}
                defaultValue={(seasons.length ?? 0) + 1}
                placeholder="Season #"
                className="bg-[#121110] border border-[#2A2724] p-2 text-xs text-[#F5F2EB]"
              />
              <input
                type="text"
                name="title"
                placeholder="Season title (optional)"
                className="bg-[#121110] border border-[#2A2724] p-2 text-xs text-[#F5F2EB]"
              />
              <input
                type="number"
                name="episodesCount"
                min={0}
                max={500}
                defaultValue={12}
                placeholder="Episodes count"
                className="bg-[#121110] border border-[#2A2724] p-2 text-xs text-[#F5F2EB]"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-[#121110] font-bold text-xs uppercase tracking-wider px-4 py-2"
              >
                + Add Season
              </button>
            </form>

            <div className="space-y-4">
              {seasons.map((season) => {
                const watchedCount = season.episodes.filter((e) => e.watched).length;
                return (
                  <div key={season.id} className="bg-[#181614] border border-[#2A2724] p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#2A2724] pb-2">
                      <h3 className="text-sm font-bold text-[#F5F2EB]">
                        S{season.seasonNumber} — {season.title}
                      </h3>
                      <span className="text-xs text-amber-400">
                        {watchedCount} / {season.episodes.length} watched
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {season.episodes.map((ep) => (
                        <EpisodeToggleButton
                          key={ep.id}
                          slug={slug}
                          episodeId={ep.id}
                          episodeNumber={ep.episodeNumber}
                          title={ep.title || ''}
                          watched={ep.watched}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}