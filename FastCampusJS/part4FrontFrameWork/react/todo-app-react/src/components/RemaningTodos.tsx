import { Todo } from '../type/Todo.ts';

interface Props {
  todos: Todo[];
}

function RemaningTodos({ todos }: Props) {
  // 4. 할 일 개수 표시 - 전체 및 남아 있는 할 일의 개수를 표시하는 기능.
  const numRemainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      <div>남은 할일 : {numRemainingTodos}</div>
    </>
  );
}

export default RemaningTodos;
