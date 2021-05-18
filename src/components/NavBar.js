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
          <>
            <p>
              <Link to={'/signup'} className="nav-link">
                Sign Up{' '}
              </Link>
            </p>
            <p>
              <Link to={'/login'} className="nav-link">
                {' '}
                Login
              </Link>
            </p>
          </>
        )}
      </div>
      <div className="nav-right">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
}
