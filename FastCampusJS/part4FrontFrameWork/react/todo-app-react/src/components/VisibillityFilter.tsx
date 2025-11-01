import Button from './Button.tsx';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  visibilityFilter: string;
  setVisiblityFilter: Dispatch<SetStateAction<string>>;
}

function VisibillityFilter({ visibilityFilter, setVisiblityFilter }: Props) {
  const 전체보기 = () => {
    setVisiblityFilter('ALL');
  };
  const 해야할일보기 = () => {
    setVisiblityFilter('ACTIVE');
  };
  const 완료한일보기 = () => {
    setVisiblityFilter('COMPLETED');
  };
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
