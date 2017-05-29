import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import logger from 'redux-logger';

import todoApp from './reducers/index';

const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  }
  return next(action);
};

const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return createStore(todoApp, applyMiddleware(...middlewares));
};

export default configureStore;
