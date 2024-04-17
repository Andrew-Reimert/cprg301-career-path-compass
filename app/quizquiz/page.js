"use client";
import {react} from 'react';
import QuizComps from './quizcomps';

export default function App() {
  return (
    <main className="flex flex-col items-center">
      <div className="w-xl">
        <QuizComps />
      </div>
    </main>
  );

}
