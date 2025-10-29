import React, { useEffect, useMemo, useRef, useState } from 'react';
import cx from 'classnames';
import './App.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todo-react') || '[]'),
  );

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState();
  const editingInput = useRef<HTMLInputElement>(null);
  // 1. 할 일 목록 생성 - 사용자가 새로운 할 일을 입력할 수 있는 기능.
  const 할일추가 = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      const id = todos.length + 1;
      const title = event.currentTarget.value;
      const completed = false;

      const newTodo = { id, title, completed };

      // 불변성을 지키기 위한 새로운 JS 표현법
      setTodos([...todos, newTodo]);

      event.currentTarget.value = '';
    }
  };

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

  // 4. 할 일 개수 표시 - 전체 및 남아 있는 할 일의 개수를 표시하는 기능.
  const numRemainingTodos = todos.filter((todo) => !todo.completed).length;

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

  // 7. 할 일 필터링 - 완료된 할 일과 진행 중인 할 일을 구분하여 볼 수 있는 필터 기능.
  const [visiblityFilter, setVisiblityFilter] = useState('ALL');
  const filteredTodos = useMemo(() => {
    switch (visiblityFilter) {
      case 'ALL':
        return todos;
      case 'ACTIVE':
        return todos.filter((todo) => !todo.completed);
      case 'COMPLETED':
        return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [visiblityFilter, todos]);

  const 전체보기 = () => {
    setVisiblityFilter('ALL');
  };
  const 해야할일보기 = () => {
    setVisiblityFilter('ACTIVE');
  };
  const 완료한일보기 = () => {
    setVisiblityFilter('COMPLETED');
  };

  // 8. 할 일 일괄 완료 처리 - 모든 할 일을 한 번에 완료 처리할 수 있는 기능.
  const 전체완료토글 = () => {
    const allChecked = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !allChecked })));
  };

  // 9. 할 일 일괄 삭제 - 완료된 할 일만을 선택적으로 일괄 삭제하는 기능.
  const 완료된할일삭제 = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // 10. 지속성 - 데이터를 지속적으로 저장하여 ,웹 페이지 새로고침 후에도 할 일 목록을 유지.
  useEffect(() => {
    localStorage.setItem('todo-react', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <input
        type="text"
        placeholder="할일을 입력해주십쇼."
        onKeyDown={(event) => 할일추가(event)}
      />
      <ol>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={cx('todos', { completed: todo.completed })}
          >
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
                onChange={(event) =>
                  setEditingTodoTitle(event.currentTarget.value)
                }
                onBlur={할일제목변경취소}
                onKeyDown={(event) => 할일제목변경(event, todo)}
                autoFocus
              />
            )}
          </li>
        ))}
      </ol>
      <div>남은 할일 : {numRemainingTodos}</div>

      <hr />

      <div>
        <div>{visiblityFilter}</div>
        <button onClick={() => 전체보기()}>전체보기</button>
        <button onClick={() => 해야할일보기()}>해야할일보기</button>
        <button onClick={() => 완료한일보기()}>완료한일보기</button>
      </div>

      <div>
        <button onClick={() => 전체완료토글()}>전체완료토글</button>
        <button onClick={() => 완료된할일삭제()}>완료된 할일 삭제</button>
      </div>
    </>
  );
}

export default App;
