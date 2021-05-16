import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ isLoggedIn, quizArray }) {
  return (
    <nav className="nav">
      <ul>
        {isLoggedIn && quizArray.length !== 0 ? (
          [...Array(quizArray.length)].map(() => <li key={Math.random()}>Icon</li>)
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
      </ul>
    </nav>
  );
}
