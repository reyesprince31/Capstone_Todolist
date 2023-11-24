import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

let todoList = []; // Use let instead of const to allow modification

app.use(express.urlencoded({ extended: true })); // Use extended: true for nested objects

app.get("/", (req, res) => {
  res.render("index.ejs", { todoList }); // Pass todoList as data object
});

app.post("/submit", (req, res) => {
  const { todoItem } = req.body;

  const newTodo = {
    id: Math.random(),
    item: todoItem,
  };

  todoList.push(newTodo); // Update todoList array
  console.log(todoList);

  res.render("index.ejs", { todoList }); // Pass updated todoList
});

app.listen(PORT, () => {
  console.log(`Successfully connected to Port ${PORT}`);
});
