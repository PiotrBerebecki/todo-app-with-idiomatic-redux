import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getVisibleTodos, getIsFetching } from './../reducers/index';
import * as actions from '../actions';
import Todo from './Todo';

class VisibleTodoList extends Component {
  componentDidMount(prevProps) {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // user has navigated if not equal
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }

  handleClick = id => {
    this.props.toggleTodo(id);
  };

  render() {
    const { todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

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
    isFetching: getIsFetching(state, filter),
    filter,
  };
};

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ toggleTodo }, dispatch);
// };

// rather than above we can use
// mapDispatchToProps shorthand "when Map Dispatch To Props Is Object"
export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
