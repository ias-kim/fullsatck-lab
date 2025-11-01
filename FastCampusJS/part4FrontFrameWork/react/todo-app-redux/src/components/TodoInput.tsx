import { useAppDispatch } from '../app/hooks.ts';
import { _할일추가 } from '../features/todos/todosSlice.ts';

function TodoInput() {
  const dispatch = useAppDispatch();

  // 1. 할 일 목록 생성 - 사용자가 새로운 할 일을 입력할 수 있는 기능.
  const 할일추가 = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key !== 'Enter') return;
    const title = event.currentTarget.value;
    dispatch(_할일추가(title));
    event.currentTarget.value = '';
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
