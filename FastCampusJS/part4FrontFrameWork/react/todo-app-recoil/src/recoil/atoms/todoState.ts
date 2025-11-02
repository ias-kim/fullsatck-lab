import { atom } from 'recoil';
import type { Todo } from '../../type/Todo.ts';
import { createLocalStorageEffect } from '../effects/createLocalStorageEffect.ts';

export const todosState = atom<Todo[]>({
  key: 'todoState',
  default: [],
  effects: [createLocalStorageEffect('todo-react', [])],
});

// State<Todo[]>(JSON.parse(localStorage.getItem('todo-react') || '[]'),);

// 10. 지속성 - 데이터를 지속적으로 저장하여 ,웹 페이지 새로고침 후에도 할 일 목록을 유지.
// useEffect(() => {
//   localStorage.setItem('todo-react', JSON.stringify(todos));
// }, [todos]);