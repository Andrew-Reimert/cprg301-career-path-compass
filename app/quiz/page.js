import React from 'react';
import QuizPage from './QuizPage';

export default function App() {
  return (
    <main className="flex flex-col items-center">
      <div className="w-xl">
        <QuizPage xmlPath='/xmlquizzes/testquiz.xml' />
      </div>
    </main>
  );
}
