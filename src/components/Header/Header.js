import React from 'react';
import PropTypes from 'prop-types';
import FilterMenu from '../FilterMenu/FilterMenu';
import './Header.css';

const Header = props => (
  <header className="App-header">
    <h1 className="App-title">{props.title}</h1>
    <span className="App-description">{props.description}</span>
    <FilterMenu
      filterBy={props.filterBy}
      orderBy={props.orderBy}
      filterChange={props.filterChange}
      orderChange={props.orderChange}
    />
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
  orderChange: PropTypes.func.isRequired
};

export default Header;
