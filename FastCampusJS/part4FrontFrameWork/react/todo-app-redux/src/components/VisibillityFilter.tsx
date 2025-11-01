import Button from './Button.tsx';
import { useAppSelector, useAppDispatch } from '../app/hooks.ts';
import {
  _완료한일보기,
  _전체보기,
  _해야할일보기,
} from '../features/visibilityFilter/visibilityFilterSlice.ts';

function VisibillityFilter() {
  const visibilityFilter = useAppSelector(
    (state) => state.visivisibilityFilter,
  );

  const dispatch = useAppDispatch();

  const 전체보기 = () => dispatch(_전체보기());
  const 해야할일보기 = () => dispatch(_해야할일보기());
  const 완료한일보기 = () => dispatch(_완료한일보기());
  return (
    <>
      <div>
        <div>{visibilityFilter}</div>
        <Button onClick={() => 전체보기()}>전체보기</Button>
        <Button onClick={() => 해야할일보기()}>해야할 일 보기</Button>
        <Button onClick={() => 완료한일보기()}>완료한 일 보기</Button>
      </div>
    </>
  );
}

export default VisibillityFilter;
