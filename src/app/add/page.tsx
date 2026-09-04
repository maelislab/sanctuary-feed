import { createVaultEntry } from '@/actions/vault-actions';
import Link from 'next/link';

export default function AddEntryPage() {
  return (
    <main className="min-h-screen bg-[#121110] text-[#E6E1DA] p-8 font-mono">
      <div className="max-w-2xl mx-auto">
        <header className="border-b border-[#2A2724] pb-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-amber-500">SANCTUARY // MANUAL INGRESS UI</h1>
            <p className="text-xs text-[#8C8275] mt-1">Direct local markdown generation.</p>
          </div>
          <Link
            href="/"
            className="text-xs px-3 py-1 bg-[#1C1A18] border border-[#2A2724] hover:border-amber-500/50 text-[#B3ACA1] transition-colors"
          >
            ← Back to Vault
          </Link>
        </header>

        <form action={createVaultEntry} className="space-y-6 bg-[#181614] border border-[#2A2724] p-6 shadow-lg relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40" />

          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Classic Media Title"
              className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g., Classic Anime / Manga"
                className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Cover Image URL (Optional)</label>
              <input
                type="url"
                name="cover"
                placeholder="https://..."
                className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Short Summary</label>
            <input
              type="text"
              name="summary"
              placeholder="Brief logline or score details..."
              className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Score</label>
              <input type="text" name="score" placeholder="e.g., 8.23" className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Age Rating</label>
              <input type="text" name="ageRating" placeholder="e.g., PG-13 - Teens" className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Year</label>
              <input type="text" name="year" placeholder="e.g., 2026" className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Status</label>
              <input type="text" name="status" placeholder="Ongoing / Completed / Hiatus" className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Genres (comma separated)</label>
              <input type="text" name="genres" placeholder="Action, Comedy, Isekai" className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Sources (comma separated)</label>
              <input type="text" name="sources" placeholder="MAL, TVDB" className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Full Synopsis / Content (Markdown supported)</label>
            <textarea
              name="content"
              rows={6}
              required
              placeholder="Write or paste untranslated/uncensored summary and preservation notes..."
              className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-[#2A2724]">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#121110] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Lock and Secure Entry
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}