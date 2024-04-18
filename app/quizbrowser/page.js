
export default function Quizzes() {
  return (
    <main className="flex flex-col items-center">
        <div className="w-auto flex items-center flex-col">

          <h2 className="text-4xl p-6 mt-7 text-center">Categorized Quizzes</h2>

          <div className="flex items-center flex-col w-full">
            <a className="block w-full text-center m-5 p-6 border-2 border-slate-500 bg-gray-950 hover:bg-gray-800 rounded-lg" href="../quiz"><span className="text-5xl">Can you be a programmer?</span></a>
            <a className="block w-full text-center m-5 p-6 border-2 border-slate-500 bg-gray-950 hover:bg-gray-800 rounded-lg" href="../quiz"><span className="text-5xl">Can you be a doctor?</span></a>
            <a className="block w-full text-center m-5 p-6 border-2 border-slate-500 bg-gray-950 hover:bg-gray-800 rounded-lg" href="../quiz"><span className="text-5xl">Can you be a teacher?</span></a>
          </div>
        </div>
    </main>
  );

}

