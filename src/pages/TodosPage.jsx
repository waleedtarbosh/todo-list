import { useReducer, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import TodoForm from "../features/Todos/TodoForm";
import TodoList from "../features/Todos/TodoList/TodoList";
import SortBy from "../shared/SortBy";
import useDebounce from "../utils/useDebounce";
import FilterInput from "../shared/FilterInput";
import StatusFilter from "../shared/StatusFilter";
import { todoReducer, initialTodoState, TODO_ACTIONS } from "../reducers/todoReducer";
import { useAuth } from "../contexts/AuthContext";

export default function TodosPage() {
  const { token } = useAuth();
  
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';

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

  // Count active todos
  const activeTodoCount = useMemo(
    () => todoList.filter((t) => !t.isCompleted).length,
    [todoList]
  );

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
    <div className="min-h-screen font-body antialiased overflow-x-hidden bg-surface-container-lowest bg-[radial-gradient(circle_at_50%_0%,rgba(255,45,85,0.15)_0%,transparent_70%)]">
      {/* Ambient Glow Layers */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-container/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Canvas */}
      <main className="pt-[100px] pb-12 px-margin-mobile md:px-margin-desktop min-h-screen flex flex-col items-center">
        <div className="w-full max-w-[800px] flex flex-col gap-gutter">
          {/* Page Header */}
          <div className="flex flex-col gap-2 mb-4 animate-fade-up">
            <h1 className="font-display text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface neon-text-glow">
              My Todos
            </h1>
            <p className="text-[18px] leading-[28px] text-on-surface-variant">
              Focus your energy. Complete the ritual.
            </p>
          </div>

          {/* Error Messages */}
          {error && (
            <div className="glass-panel rounded-lg p-4 border-error/50 flex items-center justify-between animate-fade-up">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error" style={{ fontSize: '20px' }}>error</span>
                <span className="text-error text-[14px]">{error}</span>
              </div>
              <button
                onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
                className="text-on-surface-variant hover:text-primary transition-colors text-[14px] tracking-[0.05em] font-semibold uppercase"
              >
                Dismiss
              </button>
            </div>
          )}

          {filterError && (
            <div className="glass-panel rounded-lg p-4 border-orange-500/50 flex items-center justify-between animate-fade-up">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-orange-400" style={{ fontSize: '20px' }}>warning</span>
                <span className="text-orange-400 text-[14px]">{filterError}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}
                  className="text-on-surface-variant hover:text-primary transition-colors text-[14px] tracking-[0.05em] font-semibold uppercase"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
                  className="text-primary hover:text-primary/80 transition-colors text-[14px] tracking-[0.05em] font-semibold uppercase"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Action Area (Search & Add) */}
          <div className="flex flex-col md:flex-row gap-4 mb-4 animate-fade-up-delay-1">
            {/* Search */}
            <FilterInput
              filterTerm={filterTerm}
              onFilterChange={handleFilterChange}
            />
            {/* Add Task */}
            <TodoForm onAddTodo={addTodo} />
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-4 animate-fade-up-delay-1">
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
            <StatusFilter />
          </div>

          {/* Loading State */}
          {isTodoListLoading && (
            <div className="flex items-center justify-center py-12 gap-3">
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-[14px] tracking-[0.05em] font-semibold text-primary uppercase">
                Loading rituals...
              </span>
            </div>
          )}

          {/* Task List */}
          {!isTodoListLoading && (
            <div className="animate-fade-up-delay-2">
              <TodoList
                todoList={todoList}
                onCompleteTodo={completeTodo}
                onUpdateTodo={updateTodo}
                dataVersion={dataVersion}
                statusFilter={statusFilter}
              />
            </div>
          )}

          {/* Status Footer */}
          {!isTodoListLoading && todoList.length > 0 && (
            <div className="mt-12 text-center flex flex-col items-center justify-center gap-2 animate-fade-up-delay-3">
              <div className="w-12 h-1 bg-primary rounded-full glow-sm drop-shadow-[0_0_10px_#ff2d55] mb-4" />
              <p className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-primary uppercase neon-text-glow">
                {activeTodoCount === 0
                  ? 'All rituals complete. Well done.'
                  : `You have ${activeTodoCount} active task${activeTodoCount !== 1 ? 's' : ''} remaining. Keep it up!`}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
