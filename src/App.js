import React, { useState } from 'react';
import { useHistory, BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

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
    isLoggedIn: true,
    user: 'Alex',
    userID: '123',
  });
  const [quizState, setQuizState] = useState([]);

  // Axios GET request to API method to check if there is a logged in user
  // const loginStatus = () => {
  //   axios
  //     .get(process.env.REACT_APP_DOMAIN + '/logged_in', { withCredentials: true })
  //     .then((response) => {
  //       if (response.data.logged_in) {
  //         handleLogin(response.data.user);
  //       } else {
  //         handleLogout();
  //       }
  //     })
  //     .catch((error) => console.log('api errors:', error));
  // };

  // Axios GET to quiz API for questions and answers
  const getQuiz = (numberOfQs, difficulty) => {
    axios
      .get(
        'https://opentdb.com/api.php?amount=' +
          numberOfQs +
          '&category=9&difficulty=' +
          difficulty +
          '&type=multiple'
      )
      .then((response) => {
        const quizData = response.data.results;
        setQuizState(quizData);
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
  };

  // Sets isLoggedIn to False and clears current user data
  // const handleLogout = () => {
  //   setLoginState((prevState) => ({
  //     ...prevState,
  //     isLoggedIn: false,
  //     user: '',
  //     userID: '',
  //   }));
  // };

  // On re-render, check loginStatus
  // useEffect(loginStatus);

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
              <Route
                exact
                path="/quiz"
                render={(props) => {
                  loginState.isLoggedIn ? (
                    <Quiz {...props} quizState={quizState} />
                  ) : (
                    <Redirect to="/" />
                  );
                }}
              />
              <Route exact path="/" render={(props) => <Home {...props} getQuiz={getQuiz} />} />

              {/* URL with no matching route calls the 404 component */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}
