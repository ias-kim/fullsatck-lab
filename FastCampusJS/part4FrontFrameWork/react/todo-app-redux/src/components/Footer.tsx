import Button from './Button.tsx';
import { useAppSelector, useAppDispatch } from '../app/hooks.ts';
import {
  _완료된할일삭제,
  _전체완료토글,
} from '../features/todos/todosSlice.ts';

function Footer() {
  const count = useAppSelector((state) => state.counter.value);

  const dispatch = useAppDispatch();

  // 8. 할 일 일괄 완료 처리 - 모든 할 일을 한 번에 완료 처리할 수 있는 기능.
  const 전체완료토글 = () => dispatch(_전체완료토글());

  // 9. 할 일 일괄 삭제 - 완료된 할 일만을 선택적으로 일괄 삭제하는 기능.
  const 완료된할일삭제 = () => dispatch(_완료된할일삭제());
  return (
    <>
      <button>{count}</button>
      {/*<Button onClick={handleInc}>증가: {count}</Button>*/}
      {/*<Button onClick={handleDec}>감소: {count}</Button>*/}

      <div>
        <Button onClick={() => 전체완료토글()}>전체완료토글</Button>
        <Button onClick={() => 완료된할일삭제()}>완료된 할일 삭제</Button>
      </div>
    </>
  );
}

export default Footer;
