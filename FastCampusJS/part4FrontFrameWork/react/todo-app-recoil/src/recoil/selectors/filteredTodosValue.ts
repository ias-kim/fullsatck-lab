import { selector } from 'recoil';
import { todosState } from '../atoms/todoState.ts';
import { visibillityFilterState } from '../atoms/visiblityFilterState.ts';

export const filteredTodosValue = selector({
  key: 'filteredTodosValue',
  get: ({ get }) => {
    const todos = get(todosState);
    const visiblityFilter = get(visibillityFilterState);

    switch (visiblityFilter) {
      case 'ALL':
        return todos;
      case 'ACTIVE':
        return todos.filter((todo) => !todo.completed);
      case 'COMPLETED':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },
});
