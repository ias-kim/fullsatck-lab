import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import { Todo } from './type/Todo.ts';
import VisibillityFilter from './components/VisibillityFilter.tsx';
import TodoList from './components/TodoList.tsx';
import TodoInput from './components/TodoInput.tsx';

function ReamingTodos() {
  return null;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todo-react') || '[]'),
  );

  // 10. 지속성 - 데이터를 지속적으로 저장하여 ,웹 페이지 새로고침 후에도 할 일 목록을 유지.
  useEffect(() => {
    localStorage.setItem('todo-react', JSON.stringify(todos));
  }, [todos]);

  // 7. 할 일 필터링 - 완료된 할 일과 진행 중인 할 일을 구분하여 볼 수 있는 필터 기능.
  const [visiblityFilter, setVisiblityFilter] = useState('ALL');

  return (
    <>
      <TodoInput todos={todos} setTodos={setTodos} />
      <TodoList
        visiblityFilter={visiblityFilter}
        setTodos={setTodos}
        todos={todos}
      />

      <ReamingTodos todos={todos} />
      <hr />

      <VisibillityFilter
        visibilityFilter={visiblityFilter}
        setVisiblityFilter={setVisiblityFilter}
      />

      <hr />

      <Footer todos={todos} setTodos={setTodos} />
    </>
  );
}

export default App;
