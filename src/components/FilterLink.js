import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ children, filter }) => {
  return (
    <NavLink
      exact
      to={filter === 'all' ? '/' : `/${filter}`}
      activeStyle={{
        textDecoration: 'none',
        color: 'black',
      }}
    >
      {children}
    </NavLink>
  );
};

FilterLink.propTypes = {
  children: PropTypes.node.isRequired,
  filter: PropTypes.string.isRequired,
};

export default FilterLink;
