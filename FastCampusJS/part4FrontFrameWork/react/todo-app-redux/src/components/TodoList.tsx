import TodoItems from './TodoItems.tsx';
import { useMemo, useState } from 'react';
import type { Todo } from '../type/Todo.ts';
import { useAppSelector } from '../app/hooks.ts';

function TodoList() {
  const todos = useAppSelector((state) => state.todos);
  const visibilityFilter = useAppSelector(
    (state) => state.visivisibilityFilter,
  );

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const filteredTodos = useMemo(() => {
    switch (visibilityFilter) {
      case 'ALL':
        return todos;
      case 'ACTIVE':
        return todos.filter((todo) => !todo.completed);
      case 'COMPLETED':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [visibilityFilter, todos]);

  return (
    <>
      <ol>
        {filteredTodos.map((todo) => (
          <TodoItems
            key={todo.id}
            todo={todo}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
          />
        ))}
      </ol>
    </>
  );
}

export default TodoList;
