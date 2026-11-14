import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const vaultItems = sqliteTable('vault_items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    category: text('category').notNull().default('Archive'),
    cover: text('cover').default(''),
    score: text('score').default(''),
    ageRating: text('age_rating').default(''),
    year: text('year').default(''),
    status: text('status').default(''),
    genres: text('genres').default(''), // Stored as comma-separated string for simplicity
    sources: text('sources').default(''), // Stored as comma-separated string
    summary: text('summary').default(''),
    content: text('content').notNull(),
    date: text('date').notNull(),
    updated: text('updated').default(''),
});

// Prepared for your upcoming seasons breakdown
export const seasons = sqliteTable('seasons', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    vaultItemId: integer('vault_item_id')
        .notNull()
        .references(() => vaultItems.id, { onDelete: 'cascade' }),
    seasonNumber: integer('season_number').notNull(),
    title: text('title').default(''),
    episodesCount: integer('episodes_count').default(0),
});