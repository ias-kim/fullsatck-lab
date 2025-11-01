import cx from 'classnames';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { Todo } from '../type/Todo.ts';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  editingTodo: Todo | null;
  setEditingTodo: Dispatch<SetStateAction<Todo | null>>;
}

function TodoItems({
  todo,
  todos,
  setTodos,
  editingTodo,
  setEditingTodo,
}: Props) {
  const [editingTodoTitle, setEditingTodoTitle] = useState();
  const editingInput = useRef<HTMLInputElement>(null);

  // 2. 할 일 목록 표시 - 입력된 할 일을 목록 형태로 보여주는 기능.
  // 3. 할 일 완료 표시 - 할 일의 완료 상태를 표시 및 변경할 수 있는 기능.
  const 할일완료토글 = (target: Todo) => {
    // 불변성 유지
    setTodos(
      todos.map((todo) =>
        todo === target ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // 5. 할 일 삭제 - 목록에서 특정 할 일을 삭제하는 기능.
  const 할일삭제하기 = (target: Todo) => {
    // 삭제는 불변성을 유지하면서 어떻게 할 수 있을까?
    setTodos(todos.filter((todo) => todo !== target));
  };

  // 6. 할 일 수정 - 이미 입력된 할 일의 내용을 수정하는 기능.
  const 할일수정 = (target: Todo) => {
    setEditingTodo(target);
    setEditingTodoTitle(target.title);
  };
  const 할일제목변경취소 = () => {
    setEditingTodo(null);
  };
  const 할일제목변경 = (
    event: React.KeyboardEvent<HTMLInputElement>,
    target: Todo,
  ) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      const title = editingTodoTitle;
      setTodos(
        todos.map((todo) =>
          todo.id === target.id ? { ...todo, title: editingTodoTitle } : todo,
        ),
      );
      setEditingTodo(null);
    }
  };
  useEffect(() => {
    if (editingInput.current) {
      editingInput.current.focus();
    }
  }, [editingTodo]);

  return (
    <>
      <li key={todo.id} className={cx('todos', { completed: todo.completed })}>
        {editingTodo !== todo ? (
          <>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => 할일완료토글(todo)}
            />

            <span onDoubleClick={() => 할일수정(todo)}>{todo.title}</span>
            <button onClick={() => 할일삭제하기(todo)}>삭제</button>
          </>
        ) : (
          <input
            type="text"
            ref={editingInput}
            value={editingTodoTitle}
            onChange={(event) => setEditingTodoTitle(event.currentTarget.value)}
            onBlur={할일제목변경취소}
            onKeyDown={(event) => 할일제목변경(event, todo)}
            autoFocus
          />
        )}
      </li>
    </>
  );
}

export default TodoItems;
