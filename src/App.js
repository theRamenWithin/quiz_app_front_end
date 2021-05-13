import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// API Request
import axios from 'axios';

// Navigation
import NavBar from './components/NavBar.js';

// Page Content
import Home from './components/Home';
import Quiz from './components/Quiz';
import Login from './components/Login';
import SignUp from './components/SignUp';

// 404 Page
import NotFound from './components/404';

// Styling
import './App.css';

export default function App() {
  const [loginState, setLoginState] = useState({
    isLoggedIn: false,
    user: '',
    userID: '',
  });

  // Axios GET request to API method to check if there is a logged in user
  const loginStatus = () => {
    axios
      .get(process.env.REACT_APP_DOMAIN + '/logged_in', { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          handleLogin(response.data.user);
        } else {
          handleLogout();
        }
      })
      .catch((error) => console.log('api errors:', error));
  };

  // Sets isLoggedIn to True and user to user data received from Rails
  const handleLogin = (data) => {
    setLoginState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      user: data.username,
      userID: data.id,
    }));
    // setIsLoggedIn(true);
    // setUserID(data.id);
    // setUser(data.username);
  };

  // Sets isLoggedIn to False and clears current user data
  const handleLogout = () => {
    setLoginState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
      user: '',
      userID: '',
    }));
    // setIsLoggedIn(false);
    // setUserID(data.id);
    // setUser('');
  };

  // On re-render, check loginStatus
  useEffect(loginStatus);

  return (
    <>
      <Router>
        <div className="main-container">
          <NavBar isLoggedIn={loginState.isLoggedIn} isQuizPage={false} />

          <div className="content-container">
            <Switch>
              <Route
                exact
                path="/signup"
                render={(props) => <SignUp {...props} handleLogin={handleLogin} />}
              />
              <Route
                exact
                path="/login"
                render={(props) => <Login {...props} handleLogin={handleLogin} />}
              />
              <Route exact path="/quiz" component={Quiz} />
              <Route exact path="/" component={Home} />

              {/* URL with no matching route calls the 404 component */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}
