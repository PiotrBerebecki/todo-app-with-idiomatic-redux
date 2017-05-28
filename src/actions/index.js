import uuid from 'uuid/v4';

import * as api from './../api/index';
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

const receiveTodos = (filter, response) => {
  return {
    type: RECEIVE_TODOS,
    filter,
    response,
  };
};

export const fetchTodos = filter => {
  return api
    .fetchTodos(filter)
    .then(response => receiveTodos(filter, response));
};
