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

  if (todoItem) {

    todoList.push(newTodo); // Update todoList array
    // console.log(todoList);
  }

  res.redirect('/'); // Pass updated todoList
});

app.get('/edit/:id', (req, res) => {
  const todoId = parseFloat(req.params.id);
  const todoToEdit = todoList.find(todo => todo.id === todoId);

  res.render('edit.ejs', { todo: todoToEdit });
})

app.post('/edit/:id', (req, res) => {
  const {editedTodoItem} = req.body
  const todoId = parseFloat(req.params.id);
  const todoToEditIndex = todoList.findIndex(todo => todo.id === todoId);
  console.log(todoList[todoToEditIndex])

  if (todoToEditIndex !== -1){
    todoList[todoToEditIndex] = {...todoList[todoToEditIndex], item: editedTodoItem}
  }


  console.log(todoList)

  res.redirect('/')
})

app.post('/delete/:id', (req, res) => {
  const {id} = req.params
  const todoId = parseFloat(id);

  todoList = todoList.filter(item => item.id !== todoId)

  console.log(todoList)
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Successfully connected to Port ${PORT}`);
});
