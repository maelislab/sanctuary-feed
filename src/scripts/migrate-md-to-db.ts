import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { db } from '../db';
import { vaultItems } from '../db/schema';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

async function migrateMarkdownToDB() {
  console.log('[-] Starting migration from Markdown vault to SQLite...');

  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('[!] No src/content directory found. Skipping.');
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const fullPath = path.join(CONTENT_DIR, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const genresString = Array.isArray(data.genres) 
      ? data.genres.join(', ') 
      : (data.genres || '');

    const sourcesString = Array.isArray(data.sources) 
      ? data.sources.join(', ') 
      : (data.sources || '');

    await db.insert(vaultItems).values({
      slug,
      title: data.title || 'Untitled',
      category: data.category || 'Archive',
      cover: data.cover || data.image || '',
      score: data.score || '',
      ageRating: data.ageRating || '',
      year: data.year || '',
      status: data.status || '',
      genres: genresString,
      sources: sourcesString,
      summary: data.summary || '',
      content: content.trim(),
      date: data.date || new Date().toISOString().split('T')[0],
      updated: data.updated || '',
    }).onConflictDoNothing();

    console.log(`[+] Migrated: ${slug}`);
  }

  console.log('[+] Markdown migration complete! All entries backed up to sqlite.db');
}

migrateMarkdownToDB();