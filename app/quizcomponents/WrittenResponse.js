import React, { useState } from 'react';

const WrittenResponse = ({ question, keywords, onUserAnswerChange }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleUserAnswerChange = (e) => {
    const { value } = e.target;
    setUserAnswer(value);
    onUserAnswerChange(value);
  };

  return (
    <div>
      <div>Type: written_response</div>
      <div>Question: {question}</div>
      <div>Keywords: {keywords.join(', ')}</div>
      <input
        type="text"
        value={userAnswer}
        onChange={handleUserAnswerChange}
        placeholder="Enter your answer"
      />
    </div>
  );
};

export default WrittenResponse;
