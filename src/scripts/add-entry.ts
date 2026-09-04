import fs from 'fs';
import path from 'path';
import readline from 'readline';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function createManualEntry() {
  console.log('--- SANCTUARY MANUAL INGRESS ---');
  console.log('Bypassing external APIs. Archiving clean data locally.\n');

  const title = await askQuestion('Anime/Manga Title: ');
  const cover = await askQuestion('Cover Image URL (optional): ');
  const category = await askQuestion('Category (e.g., Classic Anime, Manga Archive): ');
  const summary = await askQuestion('Short Summary / Logline: ');
  const synopsis = await askQuestion('Full Synopsis / Notes: ');

  if (!title) {
    console.log('[!] Title is required.');
    rl.close();
    return;
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
cover: "${cover || ''}"
date: "${new Date().toISOString().split('T')[0]}"
category: "${category || 'Archive'}"
summary: "${summary.replace(/"/g, '\\"')}"
---

### Synopsis / Details
${synopsis}

### Preservation Status
- **Source Integrity:** Manually verified and locked.
- **Local Checksum:** Secure.
`;

  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`\n[+] Successfully locked and loaded: src/content/${slug}.md`);

  rl.close();
}

createManualEntry();