import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

export interface VaultItem {
  slug: string;
  title: string;
  cover?: string;
  date: string;
  updated?: string;
  category: string;
  score?: string;
  ageRating?: string;
  year?: string;
  status?: string;
  genres?: string[];
  sources?: string[];
  summary: string;
  content: string;
}

export function getAllVaultItems(): VaultItem[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const files = fs.readdirSync(contentDirectory);
  const items = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        cover: data.cover || data.image || '',
        date: data.date || '',
        updated: data.updated || '',
        category: data.category || 'General',
        score: data.score || '',
        ageRating: data.ageRating || '',
        year: data.year || '',
        status: data.status || '',
        genres: Array.isArray(data.genres) ? data.genres : (data.genres ? data.genres.split(',').map((s: string) => s.trim()) : []),
        sources: Array.isArray(data.sources) ? data.sources : (data.sources ? data.sources.split(',').map((s: string) => s.trim()) : []),
        summary: data.summary || '',
        content,
      };
    });

  return items.sort((a, b) => (a.date > b.date ? -1 : 1));
}