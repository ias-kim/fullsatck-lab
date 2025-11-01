import { createSlice } from '@reduxjs/toolkit';
import type { Todo } from '../../type/Todo.ts';

// 7. 할 일 필터링 - 완료된 할 일과 진행 중인 할 일을 구분하여 볼 수 있는 필터 기능.
// const [visiblityFilter, setVisiblityFilter] = useState('ALL');
export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    _할일추가: (todos, action) => {
      const title = action.payload;

      const id = todos.length + 1;
      const completed = false;
      const newTodo = { id, title, completed };

      // 불변성을 지키기 위한 새로운 JS 표현법
      return [...todos, newTodo];
    },
    _할일완료토글: (todos, action) => {
      const target = action.payload;

      // 직관적인 형태
      // const todo = todos.find(todo => todo.id === target.id)
      // if (todo) {
      //   todo.completed = !todo.completed
      // }
      return todos.map((todo) =>
        todo.id === target.id ? { ...todo, completed: !todo.completed } : todo,
      );
    },
    _할일삭제하기: (todos, action) => {
      const target = action.payload;
      // 삭제는 불변성을 유지하면서 어떻게 할 수 있을까?
      return todos.filter((todo) => todo.id !== target.id);
    },
    _할일제목변경: (todos, action) => {
      const { target, title } = action.payload;
      return todos.map((todo) =>
        todo.id === target.id ? { ...todo, title } : todo,
      );
    },
    _전체완료토글: (todos) => {
      const allChecked = todos.every((todo) => todo.completed);
      return todos.map((todo) => ({ ...todo, completed: !allChecked }));
    },
    _완료된할일삭제: (todos) => {
      return todos.filter((todo) => !todo.completed);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  _할일추가,
  _할일완료토글,
  _할일삭제하기,
  _할일제목변경,
  _전체완료토글,
  _완료된할일삭제,
} = todosSlice.actions;

export default todosSlice.reducer;
