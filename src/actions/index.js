import uuid from 'uuid/v4';

import { ADD_TODO, TOGGLE_TODO, RECEIVE_TODOS } from './../constants/index';

export const addTodo = text => {
  return {
    type: ADD_TODO,
    id: uuid(),
    text,
  };
};

export const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};

export const receiveTodos = (filter, response) => {
  return {
    type: RECEIVE_TODOS,
    filter,
    response,
  };
};
