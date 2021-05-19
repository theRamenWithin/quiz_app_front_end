import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Styling
import '../styles/Home.css';

export default function Home({ isLoggedIn, getQuiz, setQuizState }) {
  let history = useHistory();

  // When Home is mounted, clear the current quizState
  useEffect(() => {
    setQuizState([]);
  }, []);

  /**
   * Form Functions
   */
  // State
  const [values, setValues] = useState({
    numberOfQs: 5,
    difficulty: 'medium',
  });

  // Input
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Submit
  const submitHandler = (e) => {
    e.preventDefault();
    getQuiz(values.numberOfQs, values.difficulty);
    history.push('./quiz');
  };

  /**
   * Render
   */
  return (
    <>
      <div className="hero-text">
        <p className="header">Quiz App</p>
      </div>

      {isLoggedIn ? (
        <form onSubmit={submitHandler}>
          <div className="form-input">
            <label>Number of Questions (3-8)</label>
            <input
              required
              type="number"
              min="3"
              max="8"
              name="numberOfQs"
              value={values.numberOfQs}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="form-input">
            <label>Difficulty</label>
            <select name="difficulty" value={values.difficulty} onChange={inputChangeHandler}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="form-input">
            <button className="button" type="submit">
              Start Quiz!
            </button>
          </div>
        </form>
      ) : (
        <p>Please login to start a new quiz</p>
      )}
    </>
  );
}
