import Button from './Button.tsx';
import { useRecoilState } from 'recoil';
import { todosState } from '../recoil/atoms/todoState.ts';

function Footer() {
  const [todos, setTodos] = useRecoilState(todosState);

  // 8. 할 일 일괄 완료 처리 - 모든 할 일을 한 번에 완료 처리할 수 있는 기능.
  const 전체완료토글 = () => {
    const allChecked = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !allChecked })));
  };

  // 9. 할 일 일괄 삭제 - 완료된 할 일만을 선택적으로 일괄 삭제하는 기능.
  const 완료된할일삭제 = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };
  return (
    <>
      <div>
        <Button onClick={() => 전체완료토글()}>전체완료토글</Button>
        <Button onClick={() => 완료된할일삭제()}>완료된 할일 삭제</Button>
      </div>
    </>
  );
}

export default Footer;
