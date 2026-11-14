CREATE TABLE `seasons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vault_item_id` integer NOT NULL,
	`season_number` integer NOT NULL,
	`title` text DEFAULT '',
	`episodes_count` integer DEFAULT 0,
	FOREIGN KEY (`vault_item_id`) REFERENCES `vault_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `vault_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`category` text DEFAULT 'Archive' NOT NULL,
	`cover` text DEFAULT '',
	`score` text DEFAULT '',
	`age_rating` text DEFAULT '',
	`year` text DEFAULT '',
	`status` text DEFAULT '',
	`genres` text DEFAULT '',
	`sources` text DEFAULT '',
	`summary` text DEFAULT '',
	`content` text NOT NULL,
	`date` text NOT NULL,
	`updated` text DEFAULT ''
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vault_items_slug_unique` ON `vault_items` (`slug`);