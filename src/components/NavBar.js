import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ isLoggedIn, isQuizPage }) {
  // Renders a Navbar split into two sides.
  return (
    <nav className="nav">
      <ul>
        {/* Render the Login & Sign Up links if not signed in */}
        {isLoggedIn && isQuizPage ? (
          <>
            <li>{/* Some loop for the quiz icons */}</li>
            <div className="quiz-controls"></div>
          </>
        ) : (
          <>
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
          </>
        )}
        {/*  */}
      </ul>
    </nav>
  );
}
