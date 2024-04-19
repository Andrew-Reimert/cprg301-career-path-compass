"use client";
import React, { useState, useEffect } from 'react';
import MultipleChoiceQuestion from '../quizcomponents/MultipleChoiceQuestion';
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
            const correctKeywords = question.keywords;
            const userAnswer = selectedAnswers[index].toLowerCase();
            const userKeywords = userAnswer.split(/\W+/);
            const correctKeywordCount = correctKeywords.filter(keyword =>
              userKeywords.includes(keyword.toLowerCase())
            ).length;
            updatedAnswerStatus[index] = correctKeywordCount === correctKeywords.length ? 'correct' : 'incorrect';
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
          <div className="question w-fit">Question: {question.text}</div>

          {question.type === 'multiple_choice' && (
            <MultipleChoiceQuestion
              question={question}
              selectedAnswer={selectedAnswers[index]}
              onSelectOption={(option) => handleOptionSelect(index, option)}
              answerStatus={answerStatus[index]}
              quizSubmitted={quizSubmitted}
            />
          )}

          {question.type === 'written_response' && (
            <WrittenResponse 
            keywords={question.keywords} 
            quizSubmitted={quizSubmitted}
            answerStatus={answerStatus[index]} // Ensure this value is correct
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
