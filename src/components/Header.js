import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => (
  <div className="header">
    <Link to="/">Home</Link>
    <Link to="/history">History</Link>
  </div>
);

export default Header;
