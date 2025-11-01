import { createSlice } from '@reduxjs/toolkit';

// 7. 할 일 필터링 - 완료된 할 일과 진행 중인 할 일을 구분하여 볼 수 있는 필터 기능.
// const [visiblityFilter, setVisiblityFilter] = useState('ALL');
export const visibilityFilterSlice = createSlice({
  name: 'visibilityFilter',
  initialState: 'ALL',
  reducers: {
    _전체보기: () => 'ALL',
    _해야할일보기: () => 'ACTIVE',
    _완료한일보기: () => 'COMPLETED',
  },
});

// Action creators are generated for each case reducer function
export const { _전체보기, _해야할일보기, _완료한일보기 } =
  visibilityFilterSlice.actions;

export default visibilityFilterSlice.reducer;
