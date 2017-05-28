import { ADD_TODO, TOGGLE_TODO } from './constants';

const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        isCompleted: false,
      };
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        isCompleted: !state.isCompleted,
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, todo(undefined, action)];
    case TOGGLE_TODO:
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

export default todos;
