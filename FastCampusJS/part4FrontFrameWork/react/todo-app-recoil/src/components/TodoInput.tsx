import React from 'react';
import { useRecoilState } from 'recoil';

import { todosState } from '../recoil/atoms/todoState.ts';

function TodoInput() {
  const [todos, setTodos] = useRecoilState(todosState);

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
  return (
    <>
      <input
        type="text"
        placeholder="할일을 입력해주십쇼."
        onKeyDown={(event) => 할일추가(event)}
      />
    </>
  );
}

export default TodoInput;
