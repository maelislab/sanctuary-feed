CREATE TABLE `episodes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`season_id` integer NOT NULL,
	`episode_number` integer NOT NULL,
	`title` text DEFAULT '',
	`watched` integer DEFAULT false NOT NULL,
	`watched_at` text DEFAULT '',
	FOREIGN KEY (`season_id`) REFERENCES `seasons`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `episodes_season_num_idx` ON `episodes` (`season_id`,`episode_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `seasons_item_num_idx` ON `seasons` (`vault_item_id`,`season_number`);