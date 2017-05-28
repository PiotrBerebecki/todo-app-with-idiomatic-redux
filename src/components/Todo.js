import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, isCompleted, text, id }) => {
  const handleClick = e => {
    onClick(id);
  };

  return (
    <li
      onClick={handleClick}
      style={{
        textDecoration: isCompleted ? 'line-through' : 'none',
      }}
    >
      {text}
    </li>
  );
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Todo;
