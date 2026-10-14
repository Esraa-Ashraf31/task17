import { pool } from "../db.js";

// 1. Get all todos
export async function listAllTodos() {
const res = await pool.query("SELECT * FROM todos ORDER BY id ASC");
return res.rows;
}

// 2. Get a todo by ID
export async function getTodoById(id) {
const res = await pool.query("SELECT * FROM todos WHERE id = $1 LIMIT 1",[id]);
return res.rows[0];
}

// 3. Create a new todo
export async function createTodo(title, body) {
const res = await pool.query("INSERT INTO todos (title, body) VALUES ($1, $2)",[title, body]);
return res.rows[0];
}

// 4. Update a todo
export async function updateTodo(id, title, body) {
const res = await pool.query("UPDATE todos SET title = $1, body = $2 WHERE id = $3",[title, body, id]);
return res.rows[0];
}
// 5. Delete a todo by ID
export async function deleteTodoById(id) {
const res = await pool.query("DELETE FROM todos WHERE id = $1",[id]);
return res.rows[0];
}

// 6. Toggle todo's done status
export async function toggleTodoDone(id) {
const res = await pool.query(
"UPDATE todos SET done = NOT done WHERE id = $1 ",[id]);
return res.rows[0];
}
