import { useState } from 'react';
import DOMPurify from 'dompurify';
import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../todoValidation';
import { useEditableTitle } from '../../../hooks/useEditableTitle';

function TodoListItem({ todo, onCompleteTodo, onDeleteTodo, onUpdateTodo }) {
  const [error, setError] = useState("");
  
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit
  } = useEditableTitle(todo.title);

  const MAX_LENGTH = 100;

  const handleTitleChange = (e) => {
    const value = e.target.value;
    updateTitle(value);

    // Live validation feedback
    if (value.trim().length > MAX_LENGTH) {
      setError(`Task title cannot exceed ${MAX_LENGTH} characters.`);
    } else {
      setError("");
    }
  };

  const handleUpdate = (event) => {
    if (!isEditing) return;
    event.preventDefault();
    
    const trimmedTitle = workingTitle.trim();

    // Validation: Empty Check
    if (!trimmedTitle) {
      setError("Task title cannot be empty.");
      return;
    }

    // Validation: Max Length Check
    if (trimmedTitle.length > MAX_LENGTH) {
      setError(`Task title cannot exceed ${MAX_LENGTH} characters.`);
      return;
    }

    // Security: Sanitize Input
    const sanitizedTitle = DOMPurify.sanitize(trimmedTitle);

    if (!sanitizedTitle) {
      setError("Invalid or unsafe characters detected.");
      return;
    }

    finishEdit();
    onUpdateTodo({ ...todo, title: sanitizedTitle });
    setError(""); // Clear error on success
  };

  const handleCancel = () => {
    cancelEdit();
    setError(""); // Clear errors if user cancels
  };

  if (isEditing) {
    return (
      <li className="task-card rounded-lg p-4 md:p-6 bg-surface-container-lowest/60 block">
        <form onSubmit={handleUpdate} className="flex flex-col gap-4 w-full">
          
          <div className="w-full flex flex-col gap-2">
            <TextInputWithLabel
              elementId={`editTodo${todo.id}`}
              labelText="Edit Todo"
              value={workingTitle}
              onChange={handleTitleChange}
              autoComplete="off"
              maxLength={MAX_LENGTH}
              className="w-full bg-transparent border border-primary/50 rounded-md px-4 py-2 font-display text-[18px] md:text-[24px] leading-normal font-semibold focus:border-primary focus:shadow-[inset_0_0_10px_rgba(255,45,85,0.2)] transition-all [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:transition-colors [&:-webkit-autofill]:duration-[50000s]"
              autoFocus
            />
            {/* Validation Message */}
            {error && (
              <div className="text-red-500 text-[12px] md:text-[13px] font-medium animate-fade-up pl-2 tracking-wide w-full text-left">
                ⚠️ {error}
              </div>
            )}
          </div>

          <div className="flex justify-end items-center gap-3 w-full">
            <button
              type="button"
              onClick={handleCancel}
              className="text-on-surface-variant hover:text-on-surface text-[12px] md:text-[14px] tracking-[0.05em] font-semibold uppercase transition-colors px-3 py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={!isValidTodoTitle(workingTitle) || workingTitle.trim().length > MAX_LENGTH}
              className="bg-primary/20 border border-primary text-primary text-[12px] md:text-[14px] tracking-[0.05em] font-semibold uppercase px-4 py-2 rounded-md hover:bg-primary/30 transition-all disabled:bg-gray-800 disabled:text-gray-500 disabled:border-gray-700 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              Update
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li
      className={`task-card rounded-lg p-6 flex items-center justify-between group bg-surface-container-lowest/60 ${
        todo.isCompleted ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        {/* toggle */}
        <button
          onClick={() => onCompleteTodo(todo.id)}
          className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
            todo.isCompleted
              ? 'border-primary bg-primary/20 cursor-pointer hover:border-outline-variant hover:bg-transparent'
              : 'border-outline-variant hover:border-primary hover:bg-primary/20'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] text-primary transition-opacity ${
              todo.isCompleted
                ? 'opacity-100 neon-icon-glow'
                : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            check
          </span>
        </button>

        {/* Task text */}
        <div className="flex flex-col">
          <span
            onClick={!todo.isCompleted ? startEditing : undefined}
            className={`font-display text-[18px] md:text-[24px] leading-normal font-semibold transition-colors cursor-pointer ${
              todo.isCompleted
                ? 'text-on-surface-variant line-through cursor-default'
                : 'text-on-surface group-hover:text-primary'
            }`}
          >
            {todo.title}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {!todo.isCompleted && (
          <button
            onClick={startEditing}
            className="text-outline-variant hover:text-primary transition-colors p-2"
            title="Edit task"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              edit
            </span>
          </button>
        )}
        <button
          onClick={() => onDeleteTodo(todo.id)}
          className="text-outline-variant hover:text-error transition-colors p-2"
          title="Delete task"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            delete
          </span>
        </button>
      </div>
    </li>
  );
}

export default TodoListItem;
