import './App.css';
import Footer from './components/Footer';
import VisibillityFilter from './components/VisibillityFilter.tsx';
import TodoList from './components/TodoList.tsx';
import TodoInput from './components/TodoInput.tsx';
import ReamingTodos from './components/RemaningTodos.tsx';

function App() {
  return (
    <>
      <TodoInput />

      <TodoList />

      <ReamingTodos />

      <hr />

      <VisibillityFilter />

      <hr />

      <Footer />
    </>
  );
}

export default App;
