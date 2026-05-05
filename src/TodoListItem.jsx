import React from 'react';

function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.isCompleted || false}
        onChange={() => onCompleteTodo(todo.id)}
      />
      {todo.title}
    </li>
  );
}

export default TodoListItem;