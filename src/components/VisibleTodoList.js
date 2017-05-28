import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getVisibleTodos } from './../reducers/index';
import { toggleTodo } from '../actions';
import Todo from './Todo';
import { fetchTodos } from './../api/index';

class VisibleTodoList extends Component {
  componentDidMount(prevProps) {
    fetchTodos(this.props.filter).then(todos => {
      console.log(this.props.filter, todos);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos => {
        console.log(this.props.filter, todos);
      });
    }
  }

  handleClick = id => {
    toggleTodo(id);
  };

  render() {
    return (
      <ul>
        {this.props.todos.map(todo => (
          <Todo key={todo.id} {...todo} onClick={this.handleClick} />
        ))}
      </ul>
    );
  }
}

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
  const filter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
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
