import "./App.css";
import { useState } from 'react';
import TodoHeader from "./TodoHeader.jsx";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList.jsx";

const todos = [
  { id: 1, title: "Review resources" },
  { id: 2, title: "Take notes" },
  { id: 3, title: "Code out app" },
];

function App() {
  // eslint-disable-next-line no-unused-vars
  const [todoList, setTodoList] = useState(todos);
  return (
    <div>
      <TodoHeader />
      <TodoForm />
      <TodoList todoList={todoList}/>
    </div>
  );
}

export default App;