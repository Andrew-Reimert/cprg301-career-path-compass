"use client";
import React, { useState, useEffect } from 'react';
import MultipleChoiceButton from '../quizcomponents/MultipleChoiceButton';
import WrittenResponse from '../quizcomponents/WrittenResponse';

export default function QuizPage({ xmlPath }) {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [ratings, setRatings] = useState([]);

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
        setSelectedAnswers(new Array(parsedQuestions.length).fill('')); // Initialize selectedAnswers array
      } catch (error) {
        console.error('Error fetching or parsing XML:', error);
      }
    };

    fetchXML();
  }, [xmlPath]);

  const handleOptionSelect = (index, option) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[index] = option;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleWrittenResponseChange = (index, userAnswer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[index] = userAnswer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleSubmitQuiz = () => {
    // Compare selected answers with correct answers
    let totalRating = 0;
    questions.forEach((question, index) => {
      switch (question.type) {
        case 'multiple_choice':
          if (selectedAnswers[index] === question.answer) {
            console.log(`Question ${index + 1}: Correct`);
            totalRating += 1; // Increment rating for correct multiple choice answers
          } else {
            console.log(`Question ${index + 1}: Incorrect`);
          }
          break;
        case 'written_response':
          const correctKeywords = question.keywords;
          const userAnswer = selectedAnswers[index].toLowerCase();
          const userKeywords = userAnswer.split(/\W+/);
          const correctKeywordCount = correctKeywords.filter(keyword =>
            userKeywords.includes(keyword.toLowerCase())
          ).length;
          console.log(`Question ${index + 1}: ${correctKeywordCount} out of ${correctKeywords.length} keywords correct`);
          totalRating += (correctKeywordCount / correctKeywords.length); // Increment rating based on keyword correctness
          break;
        default:
          break;
      }
    });
    const overallRating = (totalRating / questions.length * 100).toFixed(2); // Calculate overall rating as percentage
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
                  className="answer-button"
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
      <button className='answer-deselected' onClick={handleSubmitQuiz}>Submit Quiz</button>
    </div>
  );
}
