// MultipleChoiceQuestion.js
import React from 'react';
import MultipleChoiceButton from './MultipleChoiceButton';

const MultipleChoiceQuestion = ({ index, question, selectedAnswer, onSelectOption, answerStatus, quizSubmitted }) => {
  // Determine if the question was answered correctly or incorrectly
  const isCorrect = answerStatus === 'correct';
  const isIncorrect = answerStatus === 'incorrect';

  return (
    <div>
      <div className="question-label">
        {quizSubmitted && (
          <>
            {isCorrect ? '✔️' : isIncorrect ? '❌' : null} {/* Render checkmark or cross mark */}
          </>
        )}
        Question {index + 1}
      </div>
      <div className="question">Question: {question.text}</div>
      <div className="answer-options">
        {question.options.map((option, optionIndex) => (
          <MultipleChoiceButton
            key={optionIndex}
            option={option}
            selected={selectedAnswer === option}
            onSelect={() => onSelectOption(option)}
            className={
              quizSubmitted
                ? selectedAnswer === option
                  ? isCorrect
                    ? 'answer-correct'
                    : isIncorrect
                      ? 'answer-incorrect'
                      : 'answer-unselected'
                  : question.answer === option && isIncorrect
                    ? 'answer-correct'
                    : 'answer-unselected'
                : selectedAnswer === option
                  ? 'answer-button'
                  : 'answer-unselected'
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
