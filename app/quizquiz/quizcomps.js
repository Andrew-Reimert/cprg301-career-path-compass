import React, { useState } from 'react';
import './quiz.css';

const QuizComps = () => {
  const questions = [
    {
      question: 'What do programmers use when thier code is not working?',
      options: ['The Internet', 'Teachers', 'A Noose', 'Friends'],
      correctAnswer: 'A Noose',
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    // Add more questions as needed
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleAnswerClick = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    setShowNextButton(true);
  };

  const handleNextClick = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setShowNextButton(false);
    }
  };

  return (
    <div className="quiz-container">
      <div className="question-label">Question {currentQuestion + 1}</div>
      <div className="question">{questions[currentQuestion].question}</div>
      <div className="answer-options">
        {questions[currentQuestion].options.map((option, index) => (
          <button className="answer-button" key={index} onClick={() => handleAnswerClick(option)}>
            {option}
          </button>
        ))}
      </div>
      {showNextButton && <button className='answer-button' onClick={handleNextClick}>Next</button>}
      {currentQuestion === questions.length - 1 && showNextButton && (
        <div>Quiz Complete! Your answers: {userAnswers.join(', ')}</div>
      )}
    </div>
  );
};

export default QuizComps;
