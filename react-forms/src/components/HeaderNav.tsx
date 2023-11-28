import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
  return (
    <nav>
      <NavLink to="/form">Controlled Form</NavLink>;
      <NavLink to="/form-uncontrolled">Uncontrolled Form</NavLink>;
    </nav>
  );
};

export default HeaderNav;
