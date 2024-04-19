
export default function Schools() {
  return (
    <main className="flex flex-col items-center">
        <div className="w-auto flex items-center flex-col">

          <h2 className="text-4xl p-6 mt-7 text-center">Browse Schools</h2>

          <div className="flex items-center flex-col w-full">
            <a className="quiz-button" href="../quiz"><span className="text-5xl">Southern Alberta Institute of Technology</span></a>
            <a className="quiz-button" href="../quiz"><span className="text-5xl">Bow Valley College</span></a>
            <a className="quiz-button" href="../quiz"><span className="text-5xl">University of Calgary</span></a>
          </div>
        </div>
    </main>
  );

}

