'use server';

import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';

export async function createVaultEntry(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const cover = formData.get('cover') as string;
  const score = formData.get('score') as string;
  const ageRating = formData.get('ageRating') as string;
  const year = formData.get('year') as string;
  const status = formData.get('status') as string;
  const genres = formData.get('genres') as string;
  const sources = formData.get('sources') as string;
  const summary = formData.get('summary') as string;
  const content = formData.get('content') as string;

  if (!title) {
    throw new Error('Title is required');
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${new Date().toISOString().split('T')[0]}"
category: "${category || 'Archive'}"
cover: "${cover || ''}"
score: "${score || ''}"
ageRating: "${ageRating || ''}"
year: "${year || ''}"
status: "${status || ''}"
genres: "${genres || ''}"
sources: "${sources || ''}"
summary: "${summary.replace(/"/g, '\\"')}"
---

### Description
${content}

### Preservation Status
- **Source Integrity:** Verified and locked.
- **Local Checksum:** Secure.
`;

  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  fs.writeFileSync(filePath, fileContent, 'utf8');
  redirect('/');
}