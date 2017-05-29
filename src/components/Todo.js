import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, completed, text, id }) => {
  const handleClick = e => {
    onClick(id);
  };

  return (
    <li
      onClick={handleClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none',
      }}
    >
      {text}
    </li>
  );
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Todo;
