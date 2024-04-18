import React, { useState } from 'react';

const WrittenResponse = ({ keywords, onUserAnswerChange, answerStatus, quizSubmitted }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleUserAnswerChange = (e) => {
    const { value } = e.target;
    setUserAnswer(value);
    onUserAnswerChange(value);
  };
  
  return (
    <div className='question'>
      <div className="question-label">
        {quizSubmitted && (
          <>
            {answerStatus === 'correct' ? '✔️' : answerStatus === 'incorrect' ? '❌' : null} {/* Render checkmark or cross mark */}
          </>
        )}
      </div>
      {quizSubmitted && answerStatus === 'incorrect' && (
        <div>Keywords: {keywords.join(', ')}</div>
       )}
      <input
        className='answer-input'
        type="text"
        value={userAnswer}
        onChange={handleUserAnswerChange}
        placeholder="Enter your answer"
      />
    </div>
  );
};

export default WrittenResponse;