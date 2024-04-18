"use client";
import React, { useState, useEffect } from 'react';
import MultipleChoiceButton from '../quizcomponents/MultipleChoiceButton';
import WrittenResponse from '../quizcomponents/WrittenResponse';

export default function QuizPage({ xmlPath }) {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [answerStatus, setAnswerStatus] = useState([]); 

  useEffect(() => {
    const fetchXML = async () => {
      try {
        const response = await fetch(xmlPath);
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        const parsedQuestions = Array.from(xmlDoc.querySelectorAll('question')).map(question => {
          const type = question.getAttribute('type');
          const text = question.querySelector('text').textContent;

          switch (type) {
            case 'multiple_choice':
              const options = Array.from(question.querySelectorAll('option')).map(option => option.textContent);
              const answer = question.querySelector('answer').textContent;
              return { type, text, options, answer };
            case 'written_response':
              const keywords = Array.from(question.querySelectorAll('keyword')).map(keyword => keyword.textContent);
              return { type, text, keywords };
            default:
              return null;
          }
        });

        setQuestions(parsedQuestions.filter(Boolean));
        setSelectedAnswers(new Array(parsedQuestions.length).fill(''));
        setAnswerStatus(new Array(parsedQuestions.length).fill(null)); 
      } catch (error) {
        console.error('Error fetching or parsing XML:', error);
      }
    };

    fetchXML();
  }, [xmlPath]);

  const handleWrittenResponseChange = (index, userAnswer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[index] = userAnswer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleOptionSelect = (index, option) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[index] = option;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleSubmitQuiz = () => {
    let totalRating = 0;
    const updatedAnswerStatus = [...answerStatus];
    questions.forEach((question, index) => {
      switch (question.type) {
        case 'multiple_choice':
          if (selectedAnswers[index] === question.answer) {
            updatedAnswerStatus[index] = 'correct';
            totalRating += 1;
          } else {
            updatedAnswerStatus[index] = 'incorrect';
          }
          break;
        case 'written_response':
          // Implementation for written response questions
          break;
        default:
          break;
      }
    });
    setAnswerStatus(updatedAnswerStatus);
    setQuizSubmitted(true); // Set quiz as submitted
    const overallRating = (totalRating / questions.length * 100).toFixed(2);
    console.log('Overall Rating:', overallRating);
  };

  return (
    <div className="quiz-container">
      {questions.map((question, index) => (
        <div key={index}>
          <div className="question-label">Question {index + 1}</div>
          <div className="question">Question: {question.text}</div>

          {question.type === 'multiple_choice' && (
            <div className="answer-options">
            {question.options.map((option, optionIndex) => (
              <MultipleChoiceButton
              key={optionIndex}
              option={option}
              selected={selectedAnswers[index] === option}
              onSelect={() => handleOptionSelect(index, option)}
              className={
                quizSubmitted
                  ? selectedAnswers[index] === option
                    ? answerStatus[index] === 'correct'
                      ? 'answer-correct'
                      : answerStatus[index] === 'incorrect'
                        ? 'answer-incorrect'
                        : 'answer-unselected'
                    : question.answer === option && answerStatus[index] === 'incorrect'
                      ? 'answer-correct'
                      : 'answer-unselected'
                  : selectedAnswers[index] === option
                    ? 'answer-button'
                    : 'answer-unselected'
              }
            />
              ))}
            </div>
          )}

          {question.type === 'written_response' && (
            <WrittenResponse 
              question={question.text} 
              keywords={question.keywords} 
              onUserAnswerChange={(userAnswer) => handleWrittenResponseChange(index, userAnswer)}
            />
          )}
          <hr className="line"/>
        </div>
      ))}
      <button className='answer-button' onClick={handleSubmitQuiz}>Submit Quiz</button>
    </div>
  );
}
