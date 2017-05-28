import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getVisibleTodos } from './../reducers/index';
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

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state, ownProps.match.params.filter || 'all'),
  };
};

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ toggleTodo }, dispatch);
// };

// rather than above we can use
// mapDispatchToProps shorthand "when Map Dispatch To Props Is Object"
export default withRouter(
  connect(mapStateToProps, { toggleTodo })(VisibleTodoList)
);
