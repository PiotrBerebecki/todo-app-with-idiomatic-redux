import { normalize } from 'normalizr';

import * as schema from './schema';
import * as api from './../api/index';
import { getIsFetching } from './../reducers/index';
import {
  TOGGLE_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO_SUCCESS,
} from './../constants/index';

export const addTodo = text => {
  return dispatch => {
    api.addTodo(text).then(response => {
      dispatch({
        type: ADD_TODO_SUCCESS,
        response: normalize(response, schema.todo),
      });
    });
  };
};

export const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};

export const fetchTodos = filter => {
  return (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
      return Promise.resolve();
    }

    dispatch({
      type: FETCH_TODOS_REQUEST,
      filter,
    });

    return api.fetchTodos(filter).then(
      response => {
        dispatch({
          type: FETCH_TODOS_SUCCESS,
          filter,
          response: normalize(response, schema.arrayOfTodos),
        });
      },
      error => {
        dispatch({
          type: FETCH_TODOS_FAILURE,
          filter,
          message: error.message || 'Something went wrong',
        });
      }
    );
  };
};
