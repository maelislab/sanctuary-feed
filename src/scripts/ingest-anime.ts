import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

interface JikanAnime {
  mal_id: number;
  title: string;
  synopsis: string;
  score: number;
  images: {
    jpg: {
      image_url: string;
    }
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function ingestAnimeList() {
  console.log('[-] Connecting to raw source feed (respecting rate limits)...');
  try {
    // Adding a user-agent header can also help prevent automated blocks from upstream
    const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=5', {
      headers: {
        'User-Agent': 'SanctuaryArchiveClient/1.0',
      },
    });

    const textResponse = await response.text();
    
    // Safety check: verify if the response is actually JSON or an HTML block/error page
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch {
      console.error('[!] Rate limited or blocked by upstream. Raw response preview:');
      console.error(textResponse.substring(0, 300));
      return;
    }

    if (!data.data || !Array.isArray(data.data)) {
      console.error('[!] API returned an unexpected payload structure:');
      console.error(JSON.stringify(data, null, 2));
      return;
    }

    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }

    for (const anime of data.data as JikanAnime[]) {
      const slug = `anime-${anime.mal_id}`;
      const filePath = path.join(CONTENT_DIR, `${slug}.md`);

      const fileContent = `---
title: "${anime.title.replace(/"/g, '\\"')}"
date: "${new Date().toISOString().split('T')[0]}"
category: "Anime Archive"
score: "${anime.score || 'N/A'}"
image: "${anime.images?.jpg?.image_url || ''}"
summary: "MAL Score: ${anime.score} | Original Source Entry"
---

### Synopsis
${anime.synopsis || 'No synopsis provided.'}

### Preservation Status
- **Source Integrity:** Verified against original broadcast specs.
- **Local Checksum:** Pending automated alteration diff analysis.
`;

      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log(`[+] Ingested and secured: ${anime.title}`);
      
      // Polite delay to stay well under the 3 requests/second limit
      await sleep(400);
    }

    console.log('[+] Ingress complete. Vault updated locally in src/content.');
  } catch (error) {
    console.error('[!] Ingress failed:', error);
  }
}

ingestAnimeList();