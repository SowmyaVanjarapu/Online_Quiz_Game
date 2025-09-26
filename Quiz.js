// src/Quiz.js
import React, { useState, useEffect } from "react";

const quizQuestions = [
  {
    question: "Which language runs in a web browser?",
    opt1: "A: Java",
    opt2: "B: C++",
    opt3: "C: Python",
    opt4: "D: JavaScript",
    correct: "opt4",
  },
  {
    question: "What does CSS stand for?",
    opt1: "A: Central Style Sheets",
    opt2: "B: Cascading Style Sheets",
    opt3: "C: Cascading Simple Sheets",
    opt4: "D: Cars SUVs Sailboats",
    correct: "opt2",
  },
  {
    question: "What does HTML stand for?",
    opt1: "A: Hypertext Markup Language",
    opt2: "B: Hypertext Markdown Language",
    opt3: "C: Hyperloop Machine Language",
    opt4: "D: Helicopters Terminals Motorboats Lamborghinis",
    correct: "opt1",
  },
  {
    question: "What year was JavaScript launched?",
    opt1: "A: 1996",
    opt2: "B: 1995",
    opt3: "C: 1994",
    opt4: "D: none of the above",
    correct: "opt2",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    opt1: "A: <script>",
    opt2: "B: <head>",
    opt3: "C: <javascript>",
    opt4: "D: <js>",
    correct: "opt1",
  },
  {
    question: "The external JavaScript file must contain the <script> tag",
    opt1: "A: True",
    opt2: "B: No",
    opt3: "C: False",
    opt4: "D: Yes",
    correct: "opt1",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    opt1: "A: alertbox('Hello World');",
    opt2: "B: msg('Hello World');",
    opt3: "C: message('Hello World');",
    opt4: "D: alert('Hello World');",
    correct: "opt4",
  },
  {
    question: "How do you create a function in JavaScript?",
    opt1: "A: function = myFunction()",
    opt2: "B: function:myFunction()",
    opt3: "C: function myFunction()",
    opt4: "D: function {myFunction}()",
    correct: "opt3",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    opt1: "A: if i = 5 then",
    opt2: "B: if i = 5",
    opt3: "C: if (i == 5)",
    opt4: "D: if i == 5 then",
    correct: "opt3",
  },
  {
    question: "How does a FOR loop start?",
    opt1: "A: for i = 1 to 5",
    opt2: "B: for (i = 0; i <= 5; i++)",
    opt3: "C: for (i <= 5; i++)",
    opt4: "D: for(i = 0; i <=5)",
    correct: "opt2",
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(10);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleNext();
    }
  }, [timer]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNext = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    setSelectedOption("");

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(10); // Reset timer
    } else {
      setIsQuizComplete(true); // Mark quiz as complete
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption("");
    setTimer(10);
    setIsQuizComplete(false); // Reset quiz completion status
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-pink-500">
      <div className="flex flex-col items-center min-h-[400px] w-[400px] bg-white rounded-2xl shadow-lg p-4">
        <h1 className="text-purple-600 text-2xl font-bold mb-4">Quiz APP</h1>
        {isQuizComplete ? (
          <div className="text-center p-12">
            <h2 className="text-lg font-bold mb-4">Quiz Completed!</h2>
            <p className="mb-2">
              You scored <span className="font-semibold">{score}</span> out of{" "}
              <span className="font-semibold">{quizQuestions.length}</span>.
            </p>
            <button
              onClick={restartQuiz}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded transition duration-200 ease-in-out hover:bg-purple-700"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="question mb-4 shadow border border-gray-300 rounded p-2 text-lg font-serif text-center">
              <span className="font-semibold">
                {currentQuestionIndex + 1}.{" "}
              </span>
              <span>{quizQuestions[currentQuestionIndex].question}</span>
            </div>
            <div className="timer mb-4 text-center text-lg font-bold">
              Time Remaining:{" "}
              <span className="text-purple-600">{timer} seconds</span>
            </div>
            <div className="option-container mb-4 flex flex-col w-full p-2">
              {["opt1", "opt2", "opt3", "opt4"].map((opt) => (
                <div key={opt}>
                  <input
                    type="radio"
                    name="opt"
                    id={opt}
                    value={opt}
                    checked={selectedOption === opt}
                    onChange={handleOptionChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={opt}
                    className={`block border border-gray-300 p-2 rounded mb-2 cursor-pointer transition duration-500 ease-in-out ${
                      selectedOption === opt
                        ? "bg-[rgb(159,84,159)] text-white shadow-[3px_3px_4px_1px_rgb(78,69,78)]"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {quizQuestions[currentQuestionIndex][opt]}
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-purple-600 text-white py-2 rounded transition duration-200 ease-in-out hover:bg-purple-700"
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
