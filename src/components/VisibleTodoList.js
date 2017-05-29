import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import {
  getVisibleTodos,
  getErrorMessage,
  getIsFetching,
} from './../reducers/index';
import * as actions from '../actions';
import Todo from './Todo';
import FetchError from './FetchError';

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
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  handleClick = id => {
    this.props.toggleTodo(id);
  };

  render() {
    const { todos, isFetching, errorMessage } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
      );
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
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
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
