import {react} from 'react';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
        <div className="w-xl">
      
        <div className="flex items-center flex-col w-full p-4 mt-6 border-2 border-slate-500 bg-gray-950 rounded-lg">
          <h2 className="text-4xl p-6 text-center">Welcome to the Canadian Carrer Path Compass</h2>
          <p className="text-center p-3">This system is designed to help you find the best option for your post-secondary education.</p>
          <p className="text-center p-3">You can choose from the following:</p>
          <p className="text-center p-3">Take one of our categorized quizzes to help you understand the field you want to go into, and which school fits you.</p>
          <p className="text-center p-3">Browse available schools as well as use our filtering system to find what school fits your needs.</p>

          <div className="flex justify-around p-6">
          <div className="w-40 text-center m-3 p-3 border-2 bg-slate-900 hover:bg-slate-800 rounded-lg"><a href="/quiz">Take a Quiz!</a></div>
          <div className="w-40 text-center m-3 p-3 border-2 bg-slate-900 hover:bg-slate-800 rounded-lg"><a href="/quiz">Browse Schools</a></div>
          </div>
        </div>

      </div>
    </main>
  );

}