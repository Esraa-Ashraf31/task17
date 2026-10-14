import express from "express";
import { todoRouter } from "./todo.routes.js";

const app = express();

process.loadEnvFile()

app.use(express.json());

app.use("/todo", todoRouter);

app.use((err, req, res, next) => {
  console.log("err", err);
  res.status(500).json({ error: "something went wrong" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});