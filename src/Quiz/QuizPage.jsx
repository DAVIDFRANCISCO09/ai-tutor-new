import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateQuiz } from '../services/quizService';
import api from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, RotateCcw, BookOpen, ChevronRight } from 'lucide-react';

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


  
}