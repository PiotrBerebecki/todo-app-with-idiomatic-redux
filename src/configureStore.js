import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import logger from 'redux-logger';

import todoApp from './reducers/index';

const configureStore = () => {
  const middlewares = [promise];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return createStore(todoApp, applyMiddleware(...middlewares));
};

export default configureStore;
