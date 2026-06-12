import React, { useMemo } from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ 
  todoList, 
  onCompleteTodo, 
  onUpdateTodo, 
  dataVersion,
  statusFilter = 'active'
}) {
  
  const filteredTodoList = useMemo(() => {
    let filteredTodos;

    switch (statusFilter) {
      case 'completed':
        filteredTodos = todoList.filter((todo) => todo.isCompleted);
        break;
      case 'active':
        filteredTodos = todoList.filter((todo) => !todo.isCompleted);
        break;
      case 'all':
      default:
        filteredTodos = todoList;
        break;
    }

    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [todoList, dataVersion, statusFilter]);

  const getEmptyMessage = () => {
    switch (statusFilter) {
      case 'completed':
        return 'No completed rituals yet. Complete some tasks to see them here.';
      case 'active':
        return 'No active rituals. Initiate a new ritual above.';
      case 'all':
      default:
        return 'No rituals found. Initiate one above to begin.';
    }
  };

  return (
    <div className="w-full mt-8 animate-fade-up-delay-1">
      {filteredTodoList.todos.length === 0 ? (
        <div className="glass-surface rounded-xl p-12 flex flex-col items-center justify-center text-center border border-surface-variant border-dashed">
          <span
            className="material-symbols-outlined text-surface-variant mb-4"
            style={{ fontSize: '48px', fontVariationSettings: "'wght' 200" }}
          >
            {statusFilter === 'completed' ? 'task_alt' : 'auto_awesome'}
          </span>
          <p className="text-[16px] leading-[24px] text-on-surface-variant font-body tracking-wide">
            {getEmptyMessage()}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {filteredTodoList.todos.map((todo, index) => (
            <React.Fragment key={todo.id}>
              <TodoListItem
                todo={todo}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
              {index < filteredTodoList.todos.length - 1 && (
                <div className="list-divider my-2 opacity-50" />
              )}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
