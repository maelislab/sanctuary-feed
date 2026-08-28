import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

export interface VaultItem {
  slug: string;
  title: string;
  cover?: string;
  date: string;
  category: string;
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

      console.log(`getVaultItems: ${data}`)

      return {
        slug,
        title: data.title || 'Untitled',
        cover: data.cover || data.image || 'no-cover',
        date: data.date || '',
        category: data.category || 'General',
        summary: data.summary || '',
        content,
      };
    });

  return items.sort((a: VaultItem, b: VaultItem) => (a.date > b.date ? -1 : 1));
}