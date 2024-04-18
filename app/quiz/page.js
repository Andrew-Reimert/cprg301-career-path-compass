import React from 'react';
import QuizPage from './QuizPage';

export default function App() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-5xl p-6 mt-7">Can you be a Programmer?</h1>
      <div className="w-xl">
        <QuizPage xmlPath='/xmlquizzes/testquiz.xml' />
      </div>
    </main>
  );
}
