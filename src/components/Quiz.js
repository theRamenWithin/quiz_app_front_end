import React, { useState, useEffect } from 'react';

export default function Quiz({ quizArray }) {
  console.log('quizArray:');
  console.log(quizArray);

  const [quizState, setQuizState] = useState(quizArray);

  console.log('quizState:');
  console.log(quizState);

  useEffect(() => {
    setQuizState(quizArray);
  }, [quizArray]);

  // Randomly shuffle an array
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

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const selectHandler = (e) => {
    console.log(e.target);
    const { id, value } = e.target;
    let newArr = [...quizState];
    newArr[id].selected_answer = value;
    setQuizState(newArr);
  };

  const backHandler = () => {};
  const forwardHandler = () => {};

  return (
    <>
      {quizArray.map((item, i) => {
        const answerArray = [...item.incorrect_answers, item.correct_answer];
        const shuffledAnswerArray = shuffle(answerArray);

        return (
          <div key={i}>
            <h1>{item.question}</h1>
            <form onSubmit={submitHandler}>
              {shuffledAnswerArray.map((answer, ii) => (
                <>
                  <input type="button" key={ii} id={i} value={answer} onClick={selectHandler} />
                </>
              ))}
            </form>
            <div className="quiz-nav-controls">
              <button disabled="disabled" className="back-button" onClick={backHandler}>
                Back
              </button>
              <button disabled="disabled" className="forward-button" onClick={forwardHandler}>
                Forward
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
