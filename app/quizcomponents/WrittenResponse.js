import React, { useState } from 'react';

const WrittenResponse = ({ question, keywords, onUserAnswerChange }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleUserAnswerChange = (e) => {
    const { value } = e.target;
    setUserAnswer(value);
    onUserAnswerChange(value);
  };

  return (
    <div className='question'>
      {/*<div>Type: written_response</div>*/}
      {/*<div>Question: {question}</div>*/}
      {/*<div>Keywords: {keywords.join(', ')}</div>*/}
      <input
        className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500t'
        type="text"
        value={userAnswer}
        onChange={handleUserAnswerChange}
        placeholder="Enter your answer"
      />
    </div>
  );
};

export default WrittenResponse;
