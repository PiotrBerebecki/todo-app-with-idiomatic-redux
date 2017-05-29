import uuid from 'uuid/v4';
import { getIsFetching } from './../reducers/index';

import * as api from './../api/index';
import {
  ADD_TODO,
  TOGGLE_TODO,
  REQUEST_TODOS,
  RECEIVE_TODOS,
} from './../constants/index';

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

const requestTodos = (filter, response) => {
  return {
    type: REQUEST_TODOS,
    filter,
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
  return (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
      return Promise.resolve();
    }

    dispatch(requestTodos(filter));

    return api.fetchTodos(filter).then(response => {
      dispatch(receiveTodos(filter, response));
    });
  };
};
