import {react} from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
        <div className="w-auto+ flex items-center flex-col">

          <h2 className="text-4xl p-6 mt-7 text-center">Categorized Quizzes</h2>

          <div className="flex items-center flex-col w-fit ">
            <div className="w-full text-center m-5 p-6 border-2 border-slate-500 bg-gray-950 hover:bg-gray-800 rounded-lg"><a className="text-5xl" href='/'>Can you be a programmer?</a></div>
            <div className="w-full text-center m-5 p-6 border-2 border-slate-500 bg-gray-950 hover:bg-gray-800 rounded-lg"><a className="text-5xl" href='/'>Can you be a doctor?</a></div>
            <div className="w-full text-center m-5 p-6 border-2 border-slate-500 bg-gray-950 hover:bg-gray-800 rounded-lg"><a className="text-5xl" href='/'>Can you be a lawyer?</a></div>
          </div>
        </div>
    </main>
  );

}

// <div className="flex items-center flex-col w-full p-12 mt-32 border-4 border-slate-500 bg-gray-950 rounded-lg"> main content
// <div className="w-60 text-center m-5 p-6 border-2 border-slate-500 bg-gray-950 hover:bg-gray-800 rounded-lg"> button