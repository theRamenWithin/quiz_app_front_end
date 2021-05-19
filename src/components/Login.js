import React, { useState } from 'react';
import { useHistory } from 'react-router';

// API Request
import axios from 'axios';

export default function Login({ handleLogin }) {
  let history = useHistory();

  /**
   * State
   */
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  /**
   * Form Functions
   */
  // On submit, build an object to send to the Rails API
  const submitHandler = (e) => {
    e.preventDefault();

    // Build user for request
    let user = {
      email: values.email,
      password: values.password,
    };

    // Create a POST request to login
    axios
      .post(process.env.REACT_APP_DOMAIN + '/login', { user }, { withCredentials: true })
      .then((response) => {
        handleLogin(response.data);
        history.push('/');
      })
      .catch((error) => console.log('api errors:', error));
  };

  // Sets form input in state
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <div className="hero-text">
        <p className="header">Login</p>
      </div>

      <form onSubmit={submitHandler}>
        <div className="form-input">
          <label>Email</label>
          <input
            type="email"
            required
            name="email"
            value={values.email}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="form-input">
          <label>Password</label>
          <input
            type="password"
            required
            name="password"
            value={values.password}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="form-input">
          <button className="button" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
}
