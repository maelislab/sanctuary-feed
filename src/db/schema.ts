import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';

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
  genres: text('genres').default(''),
  sources: text('sources').default(''),
  summary: text('summary').default(''),
  content: text('content').notNull(),
  date: text('date').notNull(),
  updated: text('updated').default(''),
});

export const seasons = sqliteTable(
  'seasons',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    vaultItemId: integer('vault_item_id')
      .notNull()
      .references(() => vaultItems.id, { onDelete: 'cascade' }),
    seasonNumber: integer('season_number').notNull(),
    title: text('title').default(''),
    episodesCount: integer('episodes_count').default(0),
  },
  (table) => [
    uniqueIndex('seasons_item_num_idx').on(table.vaultItemId, table.seasonNumber),
  ]
);

export const episodes = sqliteTable(
  'episodes',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    seasonId: integer('season_id')
      .notNull()
      .references(() => seasons.id, { onDelete: 'cascade' }),
    episodeNumber: integer('episode_number').notNull(),
    title: text('title').default(''),
    watched: integer('watched', { mode: 'boolean' }).notNull().default(false),
    watchedAt: text('watched_at').default(''),
  },
  (table) => [
    uniqueIndex('episodes_season_num_idx').on(table.seasonId, table.episodeNumber),
  ]
);