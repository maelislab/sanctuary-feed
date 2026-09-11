import { updateVaultEntry } from '@/actions/vault-actions';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EditPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditEntryPage({ params }: EditPageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'src', 'content', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Bind the slug to the server action
  const updateActionWithSlug = updateVaultEntry.bind(null, slug);

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

        <form action={updateActionWithSlug} className="space-y-6 bg-[#181614] border border-[#2A2724] p-6 shadow-lg relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40" />

          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={data.title}
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
                defaultValue={data.category}
                className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Cover Image URL</label>
              <input
                type="url"
                name="cover"
                defaultValue={data.cover}
                className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Score</label>
              <input type="text" name="score" defaultValue={data.score} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Age Rating</label>
              <input type="text" name="ageRating" defaultValue={data.ageRating} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Year</label>
              <input type="text" name="year" defaultValue={data.year} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Status</label>
              <input type="text" name="status" defaultValue={data.status} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Genres</label>
              <input type="text" name="genres" defaultValue={Array.isArray(data.genres) ? data.genres.join(', ') : data.genres} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Sources</label>
              <input type="text" name="sources" defaultValue={Array.isArray(data.sources) ? data.sources.join(', ') : data.sources} className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Summary / Logline</label>
            <input
              type="text"
              name="summary"
              defaultValue={data.summary}
              className="w-full bg-[#121110] border border-[#2A2724] p-3 text-sm text-[#F5F2EB] focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-amber-500 mb-2">Description Content</label>
            <textarea
              name="content"
              rows={8}
              defaultValue={content}
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
      </div>
    </main>
  );
}