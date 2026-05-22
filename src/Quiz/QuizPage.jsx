

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateQuiz } from '../services/quizService';
import api from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, RotateCcw, ChevronRight } from 'lucide-react';

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, topic, lesson, allLessons, currentLessonIndex, allTopics, currentTopicIndex, userForm } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const content = lesson?.detailedContent || '';
        const qs = await generateQuiz(subject, topic, content);
        setQuestions(qs);
      } catch (err) {
        toast.error('Failed to generate quiz');
      } finally {
        setLoading(false);
      }
    };
    if (subject && topic) loadQuiz();
    else setLoading(false);
  }, [subject, topic, lesson]);

  const saveProgress = async (percent) => {
    try {
      await api.post('/progress/complete', {
        subject: subject,
        lessonId: lesson?.lessonId,
        lessonTitle: lesson?.lessonTitle || topic,
        topic: topic,   
        score: percent
      });
    } catch (err) {
      console.error('Failed to save progress', err);
    }
  };

  const handleSubmit = () => {
    if (!selected) {
      setFeedback('Please select an answer');
      setTimeout(() => setFeedback(''), 2000);
      return;
    }
    const isCorrect = selected === questions[currentIndex].correct;
    setAnswers([...answers, {
      question: questions[currentIndex].question,
      userAnswer: selected,
      correct: isCorrect,
      correctAnswer: questions[currentIndex].correct,
      explanation: questions[currentIndex].explanation
    }]);
    if (isCorrect) setScore(score + 1);
    setFeedback(isCorrect ? ' Correct!' : ` Incorrect. Correct answer: ${questions[currentIndex].correct}`);
    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setCompleted(true);
        const percent = Math.round(((score + (isCorrect ? 1 : 0)) / questions.length) * 100);
        saveProgress(percent);
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelected('');
        setFeedback('');
      }
    }, 1500);
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setSelected('');
    setFeedback('');
    setCompleted(false);
    setScore(0);
  };

  const handleNextContent = () => {
    if (allLessons && currentLessonIndex !== undefined) {
      const nextLessonIndex = currentLessonIndex + 1;
      if (nextLessonIndex < allLessons.length) {
        navigate(`/lesson/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}?lessonId=${allLessons[nextLessonIndex].lessonId}`, {
          state: {
            subject: subject,
            topic: topic,
            lesson: allLessons[nextLessonIndex],
            allLessons: allLessons,
            currentIndex: nextLessonIndex,
            allTopics: allTopics,
            currentTopicIndex: currentTopicIndex,
            userForm: userForm
          }
        });
        toast.success(`Moving to next lesson: ${allLessons[nextLessonIndex].lessonTitle}`);
        return;
      }
    }
    if (allTopics && currentTopicIndex !== undefined) {
      const nextTopicIndex = currentTopicIndex + 1;
      if (nextTopicIndex < allTopics.length) {
        const nextTopic = allTopics[nextTopicIndex];
        navigate(`/lesson/${encodeURIComponent(subject)}/${encodeURIComponent(nextTopic.topic)}`, {
          state: {
            subject: subject,
            topic: nextTopic.topic,
            lesson: null,
            allTopics: allTopics,
            currentTopicIndex: nextTopicIndex,
            userForm: userForm
          }
        });
        toast.success(`Topic completed! Moving to next topic: ${nextTopic.topic}`);
        return;
      }
    }
    navigate('/dashboard');
    toast.success(`Subject "${subject}" completed!! Choose another subject to continue learning.`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a365d] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Generating your AI quiz...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-600 text-lg">No questions available. Please try again.</div>
      </div>
    );
  }

  // QUIZ RESULTS VIEW
  if (completed) {
    const percent = Math.round((score / questions.length) * 100);
    const message = percent >= 80 ? 'Excellent! You\'ve mastered this lesson!' : percent >= 60 ? 'Good job! Keep practicing!' : 'Keep learning! Review the lesson and try again.';
    const passColor = percent >= 70 ? 'text-green-600' : percent >= 50 ? 'text-yellow-600' : 'text-red-600';

    const hasMoreLessons = allLessons && currentLessonIndex !== undefined && (currentLessonIndex + 1) < allLessons.length;
    const hasMoreTopics = allTopics && currentTopicIndex !== undefined && (currentTopicIndex + 1) < allTopics.length;
    let nextButtonText = 'Back to Dashboard';
    let nextButtonAction = () => navigate('/dashboard');
    let infoMessage = '';

if (hasMoreLessons) {
      nextButtonText = 'Next Lesson →';
      nextButtonAction = handleNextContent;
      infoMessage = ` You have ${allLessons.length - (currentLessonIndex + 1)} more lesson(s) in "${topic}".`;
    } else if (hasMoreTopics) {
      nextButtonText = 'Next Topic →';
      nextButtonAction = handleNextContent;
      infoMessage = ` Topic "${topic}" completed! Next: ${allTopics[currentTopicIndex + 1]?.topic}.`;
    } else {
      infoMessage = ` Subject "${subject}" completed! All topics finished.`;
    }
if (hasMoreLessons) {
      nextButtonText = 'Next Lesson →';
      nextButtonAction = handleNextContent;
      infoMessage = ` You have ${allLessons.length - (currentLessonIndex + 1)} more lesson(s) in "${topic}".`;
    } else if (hasMoreTopics) {
      nextButtonText = 'Next Topic →';
      nextButtonAction = handleNextContent;
      infoMessage = ` Topic "${topic}" completed! Next: ${allTopics[currentTopicIndex + 1]?.topic}.`;
    } else {
      infoMessage = ` Subject "${subject}" completed! All topics finished.`;
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        <header className="bg-white shadow-md px-5 py-3 flex justify-between items-center sticky top-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#1a365d] hover:bg-gray-100 px-3 py-2 rounded-lg transition-all"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium"></span>
          </button>
          <h1 className="text-lg font-black text-[#1a365d] uppercase">Quiz Results</h1>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all text-sm font-medium"
          >
            Logout
          </button>
        </header>

       

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 bg-[#1a365d] text-white px-6 py-3 rounded-xl font-semibold text-base shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-offset-2 active:scale-[0.98] transition-all"
              >
                <RotateCcw size={18} />
                Retake Quiz
              </button>
              <button
                onClick={nextButtonAction}
                className="flex items-center gap-2 bg-white text-[#1a365d] px-6 py-3 rounded-xl font-semibold text-base border-2 border-[#1a365d] shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-offset-2 active:scale-[0.98] transition-all"
              >
                <ChevronRight size={18} />
                {nextButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================
  // ACTIVE QUIZ VIEW (compact)
  // ========================
  const q = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center flex-shrink-0">
        <button onClick={() => navigate(-1)} className="text-[#1a365d] hover:bg-gray-100 p-2 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-black text-[#1a365d] uppercase">Quiz: {topic}</h1>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 p-2 rounded-lg">Logout</button>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-5 sm:p-6">
          <div className="mb-5">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span className="font-semibold text-[#1a365d]">Score: {score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-[#1a365d] h-1.5 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 leading-relaxed">{q.question}</h2>
          </div>

          <div className="space-y-2 mb-6">
            {q.options.map((opt, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                  selected === opt
                    ? 'border-[#1a365d] bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="quiz"
                  value={opt}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                  className="w-4 h-4 text-[#1a365d]"
                />
                <span className="text-sm sm:text-base text-gray-700 flex-1">{opt}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selected}
            className={`w-full py-2.5 rounded-lg font-semibold text-sm transition ${!selected ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#1a365d] text-white hover:bg-blue-800 active:scale-98'}`}
          >
            Submit Answer
          </button>

          {feedback && (
            <div className="mt-3 p-3 rounded-lg text-center text-sm bg-gray-100 text-gray-800 border">
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}