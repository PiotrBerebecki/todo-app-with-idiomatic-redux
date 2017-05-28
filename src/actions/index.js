import uuid from 'uuid/v4';

export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: uuid(),
    text,
  };
};

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
};

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};
