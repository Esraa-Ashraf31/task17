import {db} from "./db.js"
import { eq, sql } from "drizzle-orm";
import { todos } from "./schema.js";
// 1. Get all todos
export async function listAllTodos() {
const data = await db.select({
      id: todos.id,
      title:todos.title,
      body: todos.body,
      created_at: todos.created_at,
      done:todos.done,
    }).from(todos)
    .orderBy(todos.id)
return data;
}

// 2. Get a todo by ID
export async function getTodoById(id) {
    const data = await db
    .select({
      id: todos.id,
      title:todos.title,
      body: todos.body,
      created_at: todos.created_at,
      done:todos.done,
    })
    .from(todos)
    .where(eq(todos.id, id))
    .limit(1);

  if (data.length) {
    return data[0];
  } else {
    return false;
  }
}

// 3. Create a new todo
export async function createTodo(title, body,done) {
     const result = await db.insert(todos).values({
    title: title,
    body: body,
    done: done,
  });

  return result;
}

// 4. Update a todo
export async function updateTodo(id,body) {
  const result = await db.update(todos).set(body).where(eq(todos.id, id));
  return result;
}
// 5. Delete a todo by ID
export async function deleteTodoById(id) {
    await db.delete(todos).where(eq(todos.id, id));
}

// 6. Toggle todo's done status

export async function toggleTodoDone(id) {
  const [updated] = await db
    .update(todos)
    .set({ done: sql`not ${todos.done}` })
    .where(eq(todos.id, id))
    .returning();

  return updated ?? false;
}
