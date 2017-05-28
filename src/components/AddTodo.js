import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from '../actions';

class AddTodo extends Component {
  state = {
    todo: '',
  };

  handleText = e => {
    this.setState({
      todo: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.todo === '') {
      return;
    }

    this.props.addTodo(this.state.todo);

    this.setState({
      todo: '',
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.todo} onChange={this.handleText} />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addTodo }, dispatch);
};

export default connect(null, mapDispatchToProps)(AddTodo);
