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
      title: todoTitle,
      isCompleted: false
    };
    
    setTodoList(previous => [newTodo, ...previous]);
  }

  function completeTodo(id) {
    setTodoList(previous => 
      previous.map(todo => 
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }

  return (
    <div>
      <TodoHeader />
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;