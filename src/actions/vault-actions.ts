'use server';

import { db } from '@/db';
import { vaultItems } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function createVaultEntry(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title) throw new Error('Title is required');

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const today = new Date().toISOString().split('T')[0];

  await db.insert(vaultItems).values({
    slug,
    title,
    category: (formData.get('category') as string) || 'Archive',
    cover: (formData.get('cover') as string) || '',
    score: (formData.get('score') as string) || '',
    ageRating: (formData.get('ageRating') as string) || '',
    year: (formData.get('year') as string) || '',
    status: (formData.get('status') as string) || '',
    genres: (formData.get('genres') as string) || '',
    sources: (formData.get('sources') as string) || '',
    summary: (formData.get('summary') as string) || '',
    content: (formData.get('content') as string) || '',
    date: today,
  });

  redirect('/');
}

export async function updateVaultEntry(slug: string, formData: FormData) {
  const title = formData.get('title') as string;
  if (!title) throw new Error('Title is required');

  const today = new Date().toISOString().split('T')[0];

  await db
    .update(vaultItems)
    .set({
      title,
      category: (formData.get('category') as string) || 'Archive',
      cover: (formData.get('cover') as string) || '',
      score: (formData.get('score') as string) || '',
      ageRating: (formData.get('ageRating') as string) || '',
      year: (formData.get('year') as string) || '',
      status: (formData.get('status') as string) || '',
      genres: (formData.get('genres') as string) || '',
      sources: (formData.get('sources') as string) || '',
      summary: (formData.get('summary') as string) || '',
      content: (formData.get('content') as string) || '',
      updated: today,
    })
    .where(eq(vaultItems.slug, slug));

  redirect('/');
}