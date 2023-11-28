import './HeaderNav.css';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
  return (
    <nav className="header-nav">
      <NavLink className="nav-link" to="/form">
        Controlled Form
      </NavLink>
      ;
      <NavLink className="nav-link" to="/form-uncontrolled">
        Uncontrolled Form
      </NavLink>
      ;
    </nav>
  );
};

export default HeaderNav;
