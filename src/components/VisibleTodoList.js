import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleTodo } from '../actions';
import Todo from './Todo';

const VisibleTodoList = ({ todos, toggleTodo }) => {
  const handleClick = id => {
    toggleTodo(id);
  };

  return (
    <ul>
      {todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={handleClick} />
      ))}
    </ul>
  );
};

VisibleTodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.isCompleted);
    case 'active':
      return todos.filter(t => !t.isCompleted);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state.todos, ownProps.filter),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleTodo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList);
