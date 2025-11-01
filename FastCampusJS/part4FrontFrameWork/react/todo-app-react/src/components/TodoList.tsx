import TodoItems from './TodoItems.tsx';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import type { Todo } from '../type/Todo.ts';

interface Props {
  visiblityFilter: string;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

function TodoList({ visiblityFilter, todos, setTodos }: Props) {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const filteredTodos = useMemo(() => {
    switch (visiblityFilter) {
      case 'ALL':
        return todos;
      case 'ACTIVE':
        return todos.filter((todo) => !todo.completed);
      case 'COMPLETED':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [visiblityFilter, todos]);

  return (
    <>
      <ol>
        {filteredTodos.map((todo) => (
          <TodoItems
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            editingTodo={editingTodo}
            setEditingTodo={setEditingTodo}
          />
        ))}
      </ol>
    </>
  );
}

export default TodoList;
