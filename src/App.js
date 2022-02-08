import { useEffect, useState } from "react";

export default function App() {
  const [question, setQuestion] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (userChoice === null) return;
    // Validate answer
    if (userChoice === question.correct_answer) {
      setCorrectCount((correctCount) => correctCount + 1);
    }
    fetchQuestions();
    console.log(correctCount);
  }, [userChoice]);

  function fetchQuestions() {
    setQuestion(null);
    setUserChoice(null);
    // fetch questions
    fetch(`https://opentdb.com/api.php?amount=1&type=boolean`)
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data.results[0]);
      });
  }
  function restart() {
    setCorrectCount(0);
    fetchQuestions();
  }

  return (
    <div className="App">
      <div className="min-h-screen py-32 bg-black text-white">
        <div className="container px-5 flex items-center justify-around">
          <h1 className="text-center font-bold text-6xl text-sky-400 ">
            Trivia!
          </h1>
          <p className="underline decoration-green-500 decoration-wavy decoration-2">
            Correct: {correctCount}
          </p>
        </div>

        <div className="flex h-2/3 mt-20">
          <div className="w-3/4 px-20 py-10 text-center space-y-10">
            {question && (
              <p
                dangerouslySetInnerHTML={{ __html: question.question }}
                className="text-4xl"
              />
            )}
            <div className="flex justify-around">
              <button
                onClick={() => setUserChoice("True")}
                className="text-6xl text-green-400 bg-clip-text hover:animate-pulse"
              >
                O
              </button>
              <button
                onClick={() => setUserChoice("False")}
                className="text-6xl text-red-400 bg-clip-text hover:animate-pulse"
              >
                X
              </button>
            </div>
          </div>
          <div className="w-1/4 flex items-center justify-center">
            <p
              onClick={restart}
              className="text-6xl text-white hover:cursor-pointer hover:animate-bounce"
            >
              🔄
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
