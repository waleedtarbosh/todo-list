import { useReducer, useEffect } from "react";
import TodoForm from "../features/Todos/TodoForm";
import TodoList from "../features/Todos/TodoList/TodoList";
import SortBy from "../shared/SortBy";
import useDebounce from "../utils/useDebounce";
import FilterInput from "../shared/FilterInput";
import { todoReducer, initialTodoState, TODO_ACTIONS } from "../reducers/todoReducer";
import { useAuth } from "../contexts/AuthContext";
export default function TodosPage() {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    filterError,
    dataVersion,
  } = state;
  const debouncedFilterTerm = useDebounce(filterTerm, 300);
  
  const handleFilterChange = (newTerm) => {
    dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: { filterTerm: newTerm } });
  };

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {
      try {
        dispatch({ type: TODO_ACTIONS.FETCH_START });
        
        const paramsObject = {
          sortBy,
          sortDirection,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);
        const response = await fetch(`/api/tasks?${params}`, {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          throw new Error("unauthorized");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        dispatch({ type: TODO_ACTIONS.FETCH_SUCCESS, payload: { todos: data.tasks } });
      } catch (err) {
        const isFilterError = debouncedFilterTerm || sortBy !== "creationDate" || sortDirection !== "desc";
        dispatch({ 
          type: TODO_ACTIONS.FETCH_ERROR, 
          payload: { message: err.message, isFilterError } 
        });
      }
    }

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };
    
    dispatch({ type: TODO_ACTIONS.ADD_TODO_START, payload: { tempTodo } });

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({ title: todoTitle, isCompleted: false }),
      });

      if (!response.ok) throw new Error("Failed to add task to server");

      const data = await response.json();
      const realTodo = data.task || data;

      dispatch({ type: TODO_ACTIONS.ADD_TODO_SUCCESS, payload: { tempId: tempTodo.id, realTodo } });
    } catch (err) {
      dispatch({ 
        type: TODO_ACTIONS.ADD_TODO_ERROR, 
        payload: { tempId: tempTodo.id, message: `Rollback: ${err.message}` } 
      });
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((t) => t.id === id);
    if (!originalTodo) return;

    dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_START, payload: { id } });

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          isCompleted: true,
          title: originalTodo.title,
        }),
      });

      if (!response.ok) throw new Error("Failed to mark task as completed");
      
      dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS });
    } catch (err) {
      dispatch({ 
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR, 
        payload: { id, originalTodo, message: `Rollback: ${err.message}` } 
      });
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((t) => t.id === editedTodo.id);

    dispatch({ type: TODO_ACTIONS.UPDATE_TODO_START, payload: { editedTodo } });

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) throw new Error("Failed to update task");
      
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO_SUCCESS });
    } catch (err) {
      dispatch({ 
        type: TODO_ACTIONS.UPDATE_TODO_ERROR, 
        payload: { editedTodo, originalTodo, message: `Rollback: ${err.message}` } 
      });
    }
  }

  return (
    <div>
      {error && (
        <div
          style={{
            color: "red",
            margin: "10px 0",
            padding: "10px",
            border: "1px solid red",
          }}
        >
          Error: {error}
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })} style={{ marginLeft: "15px" }}>
            Clear Error
          </button>
        </div>
      )}

      {filterError && (
        <div
          style={{
            color: "orange",
            margin: "10px 0",
            padding: "10px",
            border: "1px solid orange",
          }}
        >
          <p>{filterError}</p>
          <button
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}
            style={{ marginRight: "10px" }}
          >
            Clear Filter Error
          </button>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}>
            Reset Filters
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading your todos... ⏳</p>}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(newSortBy) => 
          dispatch({ type: TODO_ACTIONS.SET_SORT, payload: { sortBy: newSortBy, sortDirection } })
        }
        onSortDirectionChange={(newSortDirection) => 
          dispatch({ type: TODO_ACTIONS.SET_SORT, payload: { sortBy, sortDirection: newSortDirection } })
        }
      />
      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </div>
  );
}
