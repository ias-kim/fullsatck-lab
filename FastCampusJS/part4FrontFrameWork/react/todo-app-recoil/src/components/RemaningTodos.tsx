import { useRecoilValue } from 'recoil';
import { numRemainingTodosValues } from '../recoil/selectors/numRemainingTodosValue.ts';

function RemaningTodos() {
  // 4. 할 일 개수 표시 - 전체 및 남아 있는 할 일의 개수를 표시하는 기능.
  const numRemainingTodos = useRecoilValue(numRemainingTodosValues);

  return (
    <>
      <div>남은 할일 : {numRemainingTodos}</div>
    </>
  );
}

export default RemaningTodos;
