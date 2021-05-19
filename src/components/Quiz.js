import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Styling
import '../styles/Quiz.css';

export default function Quiz({ quizArray, setQuizResultState }) {
  let history = useHistory();

  /**
   * State
   */
  const [quizState, setQuizState] = useState([{}]);
  const [answerCount, setAnswerCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isBackDisabled, setIsBackDisabled] = useState('true');
  const [isForwardDisabled, setIsForwardDisabled] = useState('true');

  // Takes quizArray prop, adds a new array of shuffled answers for each question
  // Sets quiz state with the new array
  useEffect(() => {
    let newQuizArr = [...quizArray];

    newQuizArr.forEach((item) => {
      const answerArray = [...item.incorrect_answers, item.correct_answer];
      shuffle(answerArray);
      item.shuffled_answer_array = answerArray;
    });
    setQuizState(newQuizArr);
  }, [quizArray]);

  useEffect(() => {
    // If the current question is now the first, disable the back button
    // Otherwise, enable the back button
    if (currentQuestion === 0) {
      setIsBackDisabled('true');
    } else {
      setIsBackDisabled('');
    }

    // If the current question is the last question
    // Or the current question has no selected answer
    // Disable the forward button
    if (
      currentQuestion + 1 === quizState.length ||
      quizState[currentQuestion].selected_answer === undefined
    ) {
      setIsForwardDisabled('true');
    } else {
      setIsForwardDisabled('');
    }
  }, [currentQuestion]);

  /**
   * Helper functions
   */
  // Randomly shuffles a given array
  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  /**
   * Form Functions
   */

  // Submit figures out the result, sets the state in App and navigates to the result page
  const submitHandler = (e) => {
    e.preventDefault();

    const numOfCorrectQs = () => {
      let count = 0;
      quizArray.forEach((element) => {
        if (element.correct_answer === element.selected_answer) {
          count++;
        }
      });
      return count;
    };
    const outcome = quizArray.length === numOfCorrectQs() ? 'Pass' : 'Fail';

    const results = {
      outcome: outcome,
      numOfQs: quizArray.length,
      numOfCorrectQs: numOfCorrectQs(),
      difficulty: atob(quizArray[0].difficulty),
    };
    setQuizResultState(results);
    history.push('./result');
  };

  // Answer handles setting the selected answer in state
  // Updates the number of answered questions
  // Enables the forward navigation button if it's not the last question
  const selectHandler = (e) => {
    const { id, value } = e.target;
    let newArr = [...quizState];
    newArr[id].selected_answer = btoa(value);
    setQuizState(newArr);

    let count = 0;
    quizState.forEach((element) => {
      if (element.selected_answer) {
        count++;
      }
    });
    setAnswerCount(count);

    if (currentQuestion + 1 !== quizState.length) {
      setIsForwardDisabled('');
    }
  };

  // Previous question
  // On pressing back, go back one question
  const backHandler = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  // Next Question
  // On pressing forward, go forward one question
  // Enable the back button
  const forwardHandler = () => {
    setCurrentQuestion(currentQuestion + 1);
    setIsBackDisabled('');
  };

  /**
   * Render
   */
  // Until the quizState has been filled, show a message
  return quizArray.length === 0 ? (
    <p className="fetch-text">Fetching quiz...</p>
  ) : (
    <>
      <form onSubmit={submitHandler}>
        {quizState.map((item, i) => {
          return (
            // Make divs for each question with answer buttons
            // only display if it's the current question
            <div key={i} style={currentQuestion === i ? null : { display: 'none' }}>
              <div className="question">
                <h1>
                  Q{i + 1} - {atob(item.question)}
                </h1>
              </div>
              {/* Make the answers buttons */}
              <div className="answers">
                {item.shuffled_answer_array.map((answer, ii) => (
                  <>
                    <input
                      type="button"
                      key={ii}
                      id={i}
                      className={item.selected_answer === answer ? 'selected' : 'input'}
                      value={atob(answer)}
                      onClick={selectHandler}
                    />
                  </>
                ))}
              </div>
            </div>
          );
        })}
        {/* Make a visual progress bar, a small circle for each question, answered or otherwise */}
        {quizState.length <= answerCount && quizState.length === currentQuestion + 1 ? (
          <div className="submit-container">
            <button className="submit" type="submit">
              Submit Quiz
            </button>
          </div>
        ) : null}
      </form>

      {/* Navigatin controls for moving between questions */}
      <div className="quiz-nav-controls">
        <button disabled={isBackDisabled} className="nav-button" onClick={backHandler}>
          &lt;
        </button>
        <button disabled={isForwardDisabled} className="nav-button" onClick={forwardHandler}>
          &gt;
        </button>
      </div>

      <div className="quiz-icons">
        {quizState.map((item, i) => (
          <div className={item.selected_answer ? 'quiz-icon-answered' : 'quiz-icon'} key={i} />
        ))}
      </div>
    </>
  );
}
