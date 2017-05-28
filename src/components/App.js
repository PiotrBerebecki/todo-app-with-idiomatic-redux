import React from 'react';
import Header from './Header';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';

const App = () => (
  <div>
    <Header />
    <AddTodo />
    <VisibleTodoList />
  </div>
);

export default App;
