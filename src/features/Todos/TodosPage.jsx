import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList/TodoList';

export default function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {
      try {
        setIsTodoListLoading(true);
        setError('');

        const response = await fetch('/api/tasks', {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': token
          },
          credentials: 'include'
        });

        if (response.status === 401) {
          throw new Error('unauthorized');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTodoList(data.tasks); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsTodoListLoading(false);
      }
    }

    fetchTodos();
  }, [token]);

  async function addTodo(todoTitle) {
    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };
    setTodoList(previous => [tempTodo, ...previous]);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
        },
        credentials: 'include',
        body: JSON.stringify({ title: todoTitle, isCompleted: false })
      });

      if (!response.ok) throw new Error('Failed to add task to server');

      const data = await response.json();
      const realTodo = data.task || data; 
      
      setTodoList(previous => 
        previous.map(todo => todo.id === tempTodo.id ? realTodo : todo)
      );

    } catch (err) {
      setTodoList(previous => previous.filter(todo => todo.id !== tempTodo.id));
      setError(`Rollback: ${err.message}`);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find(t => t.id === id);
    if (!originalTodo) return;

    setTodoList(previous => 
      previous.map(todo => todo.id === id ? { ...todo, isCompleted: true } : todo)
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
        },
        credentials: 'include',
        body: JSON.stringify({ 
          isCompleted: true, 
          createdAt: originalTodo.createdAt 
        })
      });

      if (!response.ok) throw new Error('Failed to mark task as completed');
    } catch (err) {
      // التراجع في حال الفشل
      setTodoList(previous => 
        previous.map(todo => todo.id === id ? originalTodo : todo)
      );
      setError(`Rollback: ${err.message}`);
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find(t => t.id === editedTodo.id);
    
    setTodoList(previous => 
      previous.map(todo => todo.id === editedTodo.id ? { ...editedTodo } : todo)
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
          createdAt: editedTodo.createdAt
        })
      });

      if (!response.ok) throw new Error('Failed to update task');
    } catch (err) {
      setTodoList(previous => 
        previous.map(todo => todo.id === editedTodo.id ? originalTodo : todo)
      );
      setError(`Rollback: ${err.message}`);
    }
  }

  return (
    <div>
      {error && (
        <div style={{ color: 'red', margin: '10px 0', padding: '10px', border: '1px solid red' }}>
          Error: {error}
          <button onClick={() => setError('')} style={{ marginLeft: '15px' }}>Clear Error</button>
        </div>
      )}

      {isTodoListLoading && <p>Loading your todos... ⏳</p>}

      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
    </div>
  );
}