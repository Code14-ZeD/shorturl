CREATE TABLE "short_urls" (
	"id" varchar(12) PRIMARY KEY NOT NULL,
	"original" varchar(2048) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
