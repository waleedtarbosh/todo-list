import { useState, useRef } from 'react';
import DOMPurify from 'dompurify';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from './todoValidation';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const MAX_LENGTH = 100;

  const handleChange = (e) => {
    const value = e.target.value;
    setWorkingTodoTitle(value);

    // Live validation feedback
    if (value.trim().length > MAX_LENGTH) {
      setError(`Task title cannot exceed ${MAX_LENGTH} characters.`);
    } else {
      setError("");
    }
  };

  const handleAddTodo = (event) => {
    event.preventDefault(); 
    
    const trimmedTitle = workingTodoTitle.trim();

    // Validation: Empty Check
    if (!trimmedTitle) {
      setError("Task title cannot be empty.");
      return;
    }

    // Validation: Max Length Check on submit
    if (trimmedTitle.length > MAX_LENGTH) {
      setError(`Task title cannot exceed ${MAX_LENGTH} characters.`);
      return;
    }

    // Security: Sanitize Input before passing it to the parent
    const sanitizedTitle = DOMPurify.sanitize(trimmedTitle);

    // In case DOMPurify removes everything
    if (!sanitizedTitle) {
      setError("Invalid or unsafe characters detected.");
      return;
    }

    // Success!
    onAddTodo(sanitizedTitle);
    setWorkingTodoTitle(""); 
    setError("");
    inputRef.current.focus();
  };

  return (
    <div className="flex-[2] flex flex-col gap-2 w-full relative">
      <form onSubmit={handleAddTodo} className="glass-panel rounded-md p-1 flex items-center px-4 neon-border-focus transition-all duration-300 relative w-full">
        <span className="material-symbols-outlined text-primary mr-3 neon-icon-glow" style={{ fontSize: '24px' }}>
          add_circle
        </span>
        
        <TextInputWithLabel 
          elementId="todoTitle"
          labelText="Todo"
          ref={inputRef}
          value={workingTodoTitle}
          onChange={handleChange}
          placeholder="Initiate new ritual..."
          autoComplete="off"
          className="py-3 pr-24 w-full bg-transparent text-white placeholder:text-surface-variant/70 border-none outline-none focus:ring-0 shadow-none [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:transition-colors [&:-webkit-autofill]:duration-[50000s]"
        />

        <button 
          type="submit"
          disabled={!isValidTodoTitle(workingTodoTitle) || workingTodoTitle.trim().length > MAX_LENGTH}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface-variant/50 border border-primary/50 text-primary font-body text-[14px] leading-[20px] tracking-[0.05em] font-semibold px-4 py-2 rounded-md hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_10px_rgba(255,45,85,0.5)] transition-all duration-300 uppercase disabled:bg-gray-800 disabled:text-gray-500 disabled:border-gray-700 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {error && (
        <div className="text-red-500 text-[13px] font-medium animate-fade-up pl-2 tracking-wide">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

export default TodoForm;