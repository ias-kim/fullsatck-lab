import TodoItems from './TodoItems.tsx';
import { useRecoilValue } from 'recoil';
import { filteredTodosValue } from '../recoil/selectors/filteredTodosValue.ts';

function TodoList() {
  // 7. 할 일 필터링 - 완료된 할 일과 진행 중인 할 일을 구분하여 볼 수 있는 필터 기능.

  const filteredTodos = useRecoilValue(filteredTodosValue);

  return (
    <>
      <ol>
        {filteredTodos.map((todo) => (
          <TodoItems key={todo.id} todo={todo} />
        ))}
      </ol>
    </>
  );
}

export default TodoList;
