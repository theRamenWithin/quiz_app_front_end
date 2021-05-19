import React, { useState } from 'react';
import { useHistory } from 'react-router';

// API Request
import axios from 'axios';

export default function SignUp({ handleLogin }) {
  const history = useHistory();

  /**
   * State
   */
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  /**
   * Form Functions
   */
  const submitHandler = (e) => {
    e.preventDefault();

    // Build user for request
    let user = {
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
    };

    // Create a POST request to sign up
    axios
      .post(process.env.REACT_APP_DOMAIN + '/sign_up', { user }, { withCredentials: true })
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
        <p className="header">Sign Up</p>
      </div>

      <form onSubmit={submitHandler}>
        <div className="form-input">
          <label>First Name</label>
          <input
            type="text"
            required
            name="name"
            value={values.name}
            onChange={inputChangeHandler}
          />
        </div>
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
          <label>Password Confirmation</label>
          <input
            type="password"
            required
            name="passwordConfirmation"
            value={values.passwordConfirmation}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="form-input">
          <button className="button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
