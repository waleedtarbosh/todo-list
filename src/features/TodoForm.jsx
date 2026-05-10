import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const inputRef = useRef(null);

  const handleAddTodo = (event) => {
    event.preventDefault(); 
    
    if (workingTodoTitle.trim() !== "") {
      onAddTodo(workingTodoTitle);
      setWorkingTodoTitle(""); 
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel 
        elementId="todoTitle"
        labelText="Todo"
        ref={inputRef}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      />
      <button 
        type="submit"
        disabled={!workingTodoTitle.trim()}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
