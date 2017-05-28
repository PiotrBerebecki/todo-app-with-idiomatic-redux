import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setVisibilityFilter } from '../actions';

const FilterLink = ({ active, children, setVisibilityFilter, filter }) => {
  const handleClick = e => {
    e.preventDefault();
    setVisibilityFilter(filter);
  };

  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a href="#" onClick={handleClick}>
      {children}
    </a>
  );
};

FilterLink.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setVisibilityFilter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);
