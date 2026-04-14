import React, { useState } from "react";
import { User } from "lucide-react";

const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setFeedback("Please select an answer.");
      return;
    }

    const correctAnswer = quizData[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
      setFeedback("✅ Correct!");
      setScore(score + 1);
    } else {
      setFeedback(`❌ Incorrect! Correct answer: ${correctAnswer}`);
    }
  };

  const handleNext = () => {
    setSelectedAnswer("");
    setFeedback("");

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg text-center shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center justify-center">
          <User className="mr-2" /> Quiz Completed 🎉
        </h2>
        <p className="text-lg text-gray-700">
          Your Score: {score} / {quizData.length}
        </p>
      </div>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg text-center shadow-lg">
      <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center justify-center">
        <User className="mr-2" /> Quiz
      </h2>

      <p className="text-gray-600 mb-4">
        Question {currentQuestion + 1} of {quizData.length}
      </p>

      <h3 className="text-lg font-semibold text-gray-800 mb-6">{question.question}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <label key={index} className="block">
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => setSelectedAnswer(option)}
              className="mr-2"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>

      <button onClick={handleSubmit} className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors mr-4">
        Submit
      </button>

      {feedback && <p className="mt-4 text-lg font-bold text-blue-900">{feedback}</p>}

      {feedback && (
        <button onClick={handleNext} className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors mt-4">
          Next
        </button>
      )}
    </div>
  );
}