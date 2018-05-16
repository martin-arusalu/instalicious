import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = props => (
  <header className="App-header">
    <h1 className="App-title">{props.title}</h1>
    <p className="App-description">{props.description}</p>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Header;
