import {boolean,pgTable,primaryKey,serial,text,timestamp,varchar,} from "drizzle-orm/pg-core";
export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  body:text(),
  created_at:timestamp().defaultNow(),
  done:boolean().default(false)
});