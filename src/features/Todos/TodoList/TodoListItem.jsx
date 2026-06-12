import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../../utils/todoValidation';
import { useEditableTitle } from '../../../hooks/useEditableTitle';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit
  } = useEditableTitle(todo.title);

  const handleUpdate = (event) => {
    if (!isEditing) return;
    event.preventDefault();
    
    const finalTitle = finishEdit();
    onUpdateTodo({ ...todo, title: finalTitle });
  };

  if (isEditing) {
    return (
      <li className="task-card rounded-lg p-6 bg-surface-container-lowest/60 block">
        <form onSubmit={handleUpdate} className="flex items-center gap-4">
          
          <TextInputWithLabel
            elementId={`editTodo${todo.id}`}
            labelText="Edit Todo"
            value={workingTitle}
            onChange={(e) => updateTitle(e.target.value)}
            className="flex-1 border border-primary/50 rounded-md px-4 py-2 font-display text-[24px] leading-[32px] font-semibold focus:border-primary focus:shadow-[inset_0_0_10px_rgba(255,45,85,0.2)] transition-all"
            autoFocus
          />

          <button
            type="button"
            onClick={cancelEdit}
            className="text-on-surface-variant hover:text-on-surface text-[14px] tracking-[0.05em] font-semibold uppercase transition-colors px-3 py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={!isValidTodoTitle(workingTitle)}
            className="bg-primary/20 border border-primary text-primary text-[14px] tracking-[0.05em] font-semibold uppercase px-4 py-2 rounded-md hover:bg-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Update
          </button>
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
          onClick={() => !todo.isCompleted && onCompleteTodo(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
            todo.isCompleted
              ? 'border-primary bg-primary/20 cursor-default'
              : 'border-outline-variant hover:border-primary hover:bg-primary/20'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[16px] text-primary transition-opacity ${
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
            className={`font-display text-[24px] leading-[32px] font-semibold transition-colors cursor-pointer ${
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
      {!todo.isCompleted && (
        <div className="flex items-center gap-3">
          <button
            onClick={startEditing}
            className="text-outline-variant hover:text-primary transition-colors p-2"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              edit
            </span>
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoListItem;
