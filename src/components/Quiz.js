import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
      difficulty: quizArray[0].difficulty,
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
  return (
    <>
      <form onSubmit={submitHandler}>
        {quizArray.map((item, i) => {
          const answerArray = [...item.incorrect_answers, item.correct_answer];
          const shuffledAnswerArray = shuffle(answerArray);

          return (
            <div key={i} style={currentQuestion === i ? null : { display: 'none' }}>
              <h1>
                Q{i + 1} - {item.question}
              </h1>

              {shuffledAnswerArray.map((answer, ii) => (
                <>
                  <input type="button" key={ii} id={i} value={answer} onClick={selectHandler} />
                </>
              ))}
            </div>
          );
        })}
        {quizState.length <= answerCount && quizState.length === currentQuestion + 1 ? (
          <button type="submit">Submit Quiz</button>
        ) : null}
      </form>

      <div className="quiz-nav-controls">
        <button disabled={isBackDisabled} className="back-button" onClick={backHandler}>
          Back
        </button>
        <button disabled={isForwardDisabled} className="forward-button" onClick={forwardHandler}>
          Forward
        </button>
      </div>
    </>
  );
}
