import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <NavLink to="/form">Controlled Form</NavLink>;
      <NavLink to="/form-uncontrolled">Uncontrolled Form</NavLink>;
    </>
  );
};

export default Home;
