import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { todos } from "./schema.js";

export const todoSelectSchema = createSelectSchema(todos);
export const todoInsertSchema = createInsertSchema(todos);