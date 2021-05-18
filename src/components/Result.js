import React from 'react';
import { Link } from 'react-router-dom';

// Styling
import '../styles/Result.css';

export default function Result({ quizResult }) {
  return (
    <div className="results">
      <h1>Your quiz result: {quizResult.outcome}</h1>
      <h2>
        Quiz difficulty was:{' '}
        {quizResult.difficulty.charAt(0).toUpperCase() + quizResult.difficulty.slice(1)}
      </h2>
      <h2>
        You answered {quizResult.numOfCorrectQs} correctly out of {quizResult.numOfQs}.
      </h2>

      {quizResult.outcome === 'Pass' ? (
        <p>
          Well done.{quizResult.difficulty !== 'hard' ? ' Why not try a harder difficulty?' : null}
        </p>
      ) : (
        <p>Too bad. Why not try again?</p>
      )}

      <Link to={'/'} className="nav-link">
        Back to Home
      </Link>
    </div>
  );
}
