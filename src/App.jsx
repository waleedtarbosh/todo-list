import "./App.css";
import { useState } from 'react';
import TodoHeader from "./TodoHeader.jsx";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle
    };
    
    setTodoList(previous => [newTodo, ...previous]);
  }

  return (
    <div>
      <TodoHeader />
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;