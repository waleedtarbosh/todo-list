import { useState, useRef } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';

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
    <form onSubmit={handleAddTodo} className="flex-[2] glass-panel rounded-md p-1 flex items-center px-4 neon-border-focus transition-all duration-300 relative">
      <span className="material-symbols-outlined text-primary mr-3 neon-icon-glow" style={{ fontSize: '24px' }}>
        add_circle
      </span>
      
      <TextInputWithLabel 
        elementId="todoTitle"
        labelText="Todo"
        ref={inputRef}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        placeholder="Initiate new ritual..."
        className="py-3 pr-24"
      />

      <button 
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface-variant/50 border border-primary/50 text-primary font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold px-4 py-2 rounded-md hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_10px_rgba(255,45,85,0.5)] transition-all duration-300 uppercase disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-surface-variant/50 disabled:hover:border-primary/50 disabled:hover:shadow-none"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;