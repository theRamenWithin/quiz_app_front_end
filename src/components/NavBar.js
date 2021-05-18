import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/ManezCo.png';

import '../styles/NavBar.css';

export default function NavBar({ loginState }) {
  return (
    <div className="nav">
      <div className="nav-left">
        {loginState.isLoggedIn ? (
          <p>Welcome back, {loginState.user}</p>
        ) : (
          <ul>
            <li>
              <Link to={'/signup'} className="nav-link">
                Sign Up{' '}
              </Link>
            </li>
            <li>
              <Link to={'/login'} className="nav-link">
                {' '}
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="nav-right">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
}
