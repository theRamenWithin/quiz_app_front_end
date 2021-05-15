import React, { useState } from 'react';

export default function Home({ getQuiz }) {
  const [values, setValues] = useState({
    numberOfQs: 5,
    difficulty: 'medium',
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getQuiz(values.numberOfQs, values.difficulty);
  };

  return (
    <>
      <h1>Quiz App</h1>
      <h2>by Alex Pike</h2>

      <form onSubmit={submitHandler}>
        <div>
          <label>Number of Questions:</label>
          <input
            type="number"
            min="3"
            max="8"
            step="1"
            name="numberOfQs"
            value={values.numberOfQs}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label>Difficulty:</label>
          <select name="difficulty" value="medium" onChange={inputChangeHandler}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <button type="submit">Start Quiz!</button>
        </div>
      </form>
    </>
  );
}
