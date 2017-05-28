import uuid from 'uuid/v4';

export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: uuid(),
    text,
  };
};

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};
