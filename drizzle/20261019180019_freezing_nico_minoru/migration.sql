CREATE TABLE "todos" (
	"id" serial PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"body" text,
	"created_at" timestamp DEFAULT now(),
	"done" boolean DEFAULT false
);
