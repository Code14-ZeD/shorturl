CREATE TABLE "clicks" (
	"id" serial PRIMARY KEY NOT NULL,
	"short_url_id" varchar(12) NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"ip" varchar(45),
	"user_agent" varchar(512)
);
--> statement-breakpoint
ALTER TABLE "short_urls" ADD COLUMN "click_count" integer DEFAULT 0 NOT NULL;