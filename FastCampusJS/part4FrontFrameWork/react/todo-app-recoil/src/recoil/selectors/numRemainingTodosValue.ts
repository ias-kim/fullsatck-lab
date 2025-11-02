import { selector } from 'recoil';
import { todosState } from '../atoms/todoState.ts';

export const numRemainingTodosValues = selector({
  key: 'numRemainingTodosValues',
  get: ({ get }) => {
    const todos = get(todosState);
    return todos.filter((todo) => !todo.completed).length;
  },
});
