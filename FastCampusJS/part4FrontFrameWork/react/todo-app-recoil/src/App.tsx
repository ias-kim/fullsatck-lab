import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import VisibillityFilter from './components/VisibillityFilter.tsx';
import TodoList from './components/TodoList.tsx';
import TodoInput from './components/TodoInput.tsx';
import RemaningTodos from './components/RemaningTodos.tsx';

function App() {
  return (
    <>
      <TodoInput />

      <TodoList />

      <RemaningTodos />
      <hr />

      <VisibillityFilter />

      <hr />

      <Footer />
    </>
  );
}

export default App;
