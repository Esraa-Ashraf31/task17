import express from "express";

import {listAllTodos,getTodoById,createTodo,updateTodo,deleteTodoById,toggleTodoDone} from "./db/todo.query.js";

export const todoRouter = express.Router();

// Get all todos
todoRouter.get("/", async (req, res) => {
const todos = await listAllTodos();
return res.status(200).json({
  data: todos,
});
});

//  Get a todo by ID
todoRouter.get("/:todo_id", async (req, res) => {
const id = Number(req.params.todo_id);
const todo = await getTodoById(id);
if (!todo) {
  return res.status(404).json({
    message: "Todo not found",
  });
}
return res.status(200).json({
  data: todo,
});
}
);

// Create a new todo
todoRouter.post("/", async (req, res) => {
const { title, body} = req.body;
const todo = await createTodo(title.trim(), body.trim());
return res.status(201).json({
  message: "Todo created successfully",
  data: todo,
});

});

// Update a todo
todoRouter.patch("/:todo_id", async (req, res) => {
const id = Number(req.params.todo_id);
const { title, body} = req.body;
const existingTodo = await getTodoById(id);
if (!existingTodo) {
  return res.status(404).json({
    message: "Todo not found",
  });
}
const updatedTodo = await updateTodo( id, title.trim(), body.trim());
return res.status(200).json({
  message: "Todo updated successfully",
  data: updatedTodo,
});
});

// Toggle a todo's done status
todoRouter.patch("/:todo_id/toggle", async (req, res) => {
const id = Number(req.params.todo_id);
const updatedTodo = await toggleTodoDone(id);
return res.status(200).json({
  message: "Todo status changed successfully",
  data: updatedTodo,
});

});

// Delete a todo
todoRouter.delete("/:todo_id", async (req, res) => {
const id = Number(req.params.todo_id);
const deletedTodo = await deleteTodoById(id);
return res.status(200).json({
  message: "Todo deleted successfully",
  data: deletedTodo,
});
});
