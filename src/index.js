import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import { loadState, saveState } from './localStorage';
import todoApp from './reducers';
import App from './components/App';

const persistedState = loadState();

const store = createStore(
  todoApp,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
