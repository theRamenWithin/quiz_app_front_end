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
  const [shuffled, setShuffled] = useState(false);

  console.log('currentQuestion ' + currentQuestion);
  console.log('answerCount ' + answerCount);

  console.log('quizState:');
  console.log(quizState);

  // Set initial state from props
  useEffect(() => {
    setQuizState(quizArray);
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

  // Submit
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);

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
    console.log(results);
    setQuizResultState(results);
    history.push('./result');
  };

  // Answer selection
  const selectHandler = (e) => {
    const { id, value } = e.target;
    let newArr = [...quizState];
    newArr[id].selected_answer = value;
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
  const backHandler = () => {
    // On pressing back, go back one question
    setCurrentQuestion(currentQuestion - 1);
  };

  // Next Question
  const forwardHandler = () => {
    // On pressing forward, go forward one question
    // Enable the back button
    setCurrentQuestion(currentQuestion + 1);
    setIsBackDisabled('');
  };

  /**
   * Render
   */
  return quizArray.length === 0 ? (
    <p className="fetch-text">Fetching quiz...</p>
  ) : (
    <>
      <form onSubmit={submitHandler}>
        {quizArray.map((item, i) => {
          // Create an array of the correct and incorrect answers
          const answerArray = [...item.incorrect_answers, item.correct_answer];
          // Shuffle the order but only once
          if (!shuffled) {
            shuffle(answerArray);
            setShuffled(true);
          }

          return (
            // Make divs for each question with answer buttons
            //only display if it's the current question
            <div key={i} style={currentQuestion === i ? null : { display: 'none' }}>
              <div className="question">
                <h1>
                  Q{i + 1} - {atob(item.question)}
                </h1>
              </div>
              <div className="answers">
                {answerArray.map((answer, ii) => (
                  <>
                    <input
                      type="button"
                      key={ii}
                      id={i}
                      className={item.selected_answer === atob(answer) ? 'selected' : 'input'}
                      value={atob(answer)}
                      onClick={selectHandler}
                    />
                  </>
                ))}
              </div>
            </div>
          );
        })}
        {quizState.length <= answerCount && quizState.length === currentQuestion + 1 ? (
          <div className="submit-container">
            <button className="submit" type="submit">
              Submit Quiz
            </button>
          </div>
        ) : null}
      </form>

      <div className="quiz-nav-controls">
        <button disabled={isBackDisabled} className="nav-button" onClick={backHandler}>
          &lt;
        </button>
        <button disabled={isForwardDisabled} className="nav-button" onClick={forwardHandler}>
          &gt;
        </button>
      </div>

      <div className="quiz-icons">
        {[...Array(quizArray.length)].map((i) => (
          <div className="quiz-icon" key={i}></div>
        ))}
      </div>
    </>
  );
}
