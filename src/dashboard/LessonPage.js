import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, FileText, Lightbulb, Target, ChevronLeft, ChevronRight, Video, BookOpen, MoreHorizontal, HelpCircle, Award, ExternalLink } from 'lucide-react';
import api from '../services/api';

export const LessonPage = () => {
  const { subject, topic } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userForm = localStorage.getItem('userForm') || 'Form 1';
  const learningStyle = localStorage.getItem('learningStyle') || 'visual';

  const [allLessons, setAllLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allTopics, setAllTopics] = useState([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedTopic = decodeURIComponent(topic);
        const decodedSubject = decodeURIComponent(subject);

        const lessonsRes = await api.get(`/lessons/subject/${encodeURIComponent(decodedSubject)}?form=${encodeURIComponent(userForm)}`);
        const lessons = lessonsRes.data.data;
        const topicLessons = lessons.filter(l => l.topic === decodedTopic).sort((a,b) => a.lessonNumber - b.lessonNumber);
        
        if (!topicLessons.length) {
          setError('No lessons found for this topic');
          setLoading(false);
          return;
        }
        setAllLessons(topicLessons);
        
        const topicsRes = await api.get(`/lessons/topics/${encodeURIComponent(decodedSubject)}/${encodeURIComponent(userForm)}`);
        const topics = topicsRes.data;
        setAllTopics(topics);
        
        const topicIndex = topics.findIndex(t => t.topic === decodedTopic);
        setCurrentTopicIndex(topicIndex >= 0 ? topicIndex : 0);

        const searchParams = new URLSearchParams(location.search);
        const lessonId = searchParams.get('lessonId');
        let index = lessonId ? topicLessons.findIndex(l => l.lessonId === lessonId) : 0;
        if (index === -1) index = 0;
        setCurrentIndex(index);
        setCurrentLesson(topicLessons[index]);
      } catch (err) {
        console.error(err);
        setError('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subject, topic, userForm, location.search]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
     
      navigate(`/lesson/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}?lessonId=${prevLesson.lessonId}`, {
        replace: true,
        state: location.state
      });
      setCurrentIndex(currentIndex - 1);
      setCurrentLesson(prevLesson);
      window.scrollTo(0,0);
    }
  };

  const goToNext = () => {
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      
      navigate(`/lesson/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}?lessonId=${nextLesson.lessonId}`, {
        replace: true,
        state: location.state
      });
      setCurrentIndex(currentIndex + 1);
      setCurrentLesson(nextLesson);
      window.scrollTo(0,0);
    }
  };

  const handleDiscuss = () => {
    navigate('/chat', {
      state: {
        subject: currentLesson.subject,
        topic: currentLesson.topic,
        lesson: {
          lessonId: currentLesson.lessonId,
          title: currentLesson.lessonTitle,
          objectives: currentLesson.learningObjectives,
          keyPoints: currentLesson.keyPoints,
          summary: currentLesson.summary,
          content: currentLesson.detailedContent?.substring(0, 1500)
        }
      }
    });
  };

  const handleQuiz = () => {
    navigate(`/quiz/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}`, {
      state: {
        subject: currentLesson.subject,
        topic: currentLesson.topic,
        lesson: currentLesson,
        allLessons: allLessons,
        currentLessonIndex: currentIndex,
        allTopics: allTopics,
        currentTopicIndex: currentTopicIndex,
        userForm: userForm
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
        <div className="bg-white px-5 py-4 border-b sticky top-0 z-30 shadow-sm">
          <div className="flex justify-between"><div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div><div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div></div>
        </div>
        <div className="max-w-4xl mx-auto px-5 py-8 space-y-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-2xl shadow-sm animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  if (error || !currentLesson) return <div className="p-10 text-center text-red-600">Lesson not found</div>;

  const formatContent = (content) => {
    if (!content) return null;
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.trim().endsWith(':') && line.trim().length < 50) {
        return <h3 key={idx} className="text-lg md:text-xl font-bold text-[#1a365d] mt-6 mb-3 border-l-4 border-[#1a365d] pl-3">{line.trim()}</h3>;
      }
      if (line.toLowerCase().includes('example') && line.length < 80) {
        return <div key={idx} className="bg-green-50 border-l-4 border-green-600 p-4 my-4 rounded-r-lg"><span className="font-bold text-green-800">📘 {line.trim()}</span></div>;
      }
      if (line.toLowerCase().includes('practice') || line.toLowerCase().includes('exercise')) {
        return <div key={idx} className="bg-purple-50 border-l-4 border-purple-600 p-4 my-4 rounded-r-lg"><span className="font-bold text-purple-800">✏️ {line.trim()}</span></div>;
      }
      if (line.toLowerCase().includes('note') || line.toLowerCase().includes('remember')) {
        return <div key={idx} className="bg-yellow-50 border-l-4 border-yellow-600 p-4 my-4 rounded-r-lg"><span className="font-bold text-yellow-800">📌 {line.trim()}</span></div>;
      }
      if (line.trim()) {
        return <p key={idx} className="text-gray-700 leading-relaxed mb-3">{line.trim()}</p>;
      }
      return <br key={idx} />;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      <div className="bg-white shadow-md sticky top-0 z-30">
        <div className="px-5 py-4 flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Back button - now correctly goes to topics list */}
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl text-[#1a365d] transition-colors">
              <ArrowLeft size={22} />
            </button>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{currentLesson.subject}</p>
              <h1 className="text-base md:text-lg font-black text-[#1a365d]">{currentLesson.lessonTitle}</h1>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <Clock size={11} />
                <span>{currentLesson.estimatedTime || '15 mins'} read</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={goToPrevious} disabled={currentIndex === 0} className={`p-2 rounded-lg transition-colors ${currentIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#1a365d] hover:bg-gray-100'}`}>
              <ChevronLeft size={20} />
            </button>
            <span className="text-xs text-gray-500 self-center">{currentIndex+1}/{allLessons.length}</span>
            <button onClick={goToNext} disabled={currentIndex === allLessons.length-1} className={`p-2 rounded-lg transition-colors ${currentIndex === allLessons.length-1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#1a365d] hover:bg-gray-100'}`}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Rest of the content unchanged */}
      <div className="max-w-4xl mx-auto px-5 py-8 space-y-8">
        {/* Introduction */}
        <motion.section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-2 text-[#1a365d] mb-3">
            <Lightbulb size={20} />
            <h2 className="text-sm font-bold uppercase tracking-wide">Introduction</h2>
          </div>
          <p className="text-gray-700 italic text-base md:text-lg leading-relaxed">"{currentLesson.introduction}"</p>
        </motion.section>

        {/* Learning Objectives */}
        <motion.section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-2 text-[#1a365d] mb-4">
            <Target size={20} />
            <h2 className="text-sm font-bold uppercase tracking-wide">Learning Objectives</h2>
          </div>
          <ul className="space-y-3">
            {currentLesson.learningObjectives?.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                  <CheckCircle size={12} />
                </div>
                <span className="text-gray-700 text-sm md:text-base">{point}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Learning Style Specific Blocks (unchanged) */}
        {learningStyle === 'visual' && currentLesson.videoUrl && (
          <motion.section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 text-[#1a365d] mb-4">
              <Video size={20} />
              <h2 className="text-sm font-bold uppercase tracking-wide">Video Explanation</h2>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden shadow-md">
              <iframe className="w-full h-full" src={currentLesson.videoUrl} frameBorder="0" allowFullScreen title="Lesson video"></iframe>
            </div>
          </motion.section>
        )}

        {learningStyle === 'reading' && currentLesson.referenceLinks?.length > 0 && (
          <motion.section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 text-[#1a365d] mb-4">
              <BookOpen size={20} />
              <h2 className="text-sm font-bold uppercase tracking-wide">Further Reading</h2>
            </div>
            <ul className="space-y-2">
              {currentLesson.referenceLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1">
                    {link} <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {learningStyle === 'reading' && currentLesson.extraExamples?.length > 0 && (
          <motion.section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 text-[#1a365d] mb-4">
              <MoreHorizontal size={20} />
              <h2 className="text-sm font-bold uppercase tracking-wide">Extra Examples</h2>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {currentLesson.extraExamples.map((ex, idx) => (
                <li key={idx}>{ex}</li>
              ))}
            </ul>
          </motion.section>
        )}

        {learningStyle === 'kinesthetic' && currentLesson.practiceQuestions?.length > 0 && (
          <motion.section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 text-[#1a365d] mb-4">
              <HelpCircle size={20} />
              <h2 className="text-sm font-bold uppercase tracking-wide">Practice Questions</h2>
            </div>
            <div className="space-y-6">
              {currentLesson.practiceQuestions.map((q, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                  <p className="font-semibold text-gray-800">{idx+1}. {q.question}</p>
                  <details className="mt-2">
                    <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">Hint</summary>
                    <p className="text-gray-600 mt-1 pl-4 border-l-2 border-blue-200">{q.hint}</p>
                  </details>
                  <details className="mt-2">
                    <summary className="text-sm text-green-600 cursor-pointer hover:text-green-800">Answer</summary>
                    <p className="text-gray-700 mt-1 pl-4 border-l-2 border-green-200">{q.answer}</p>
                  </details>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Main Lesson Content */}
        <motion.section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-2 text-[#1a365d] mb-4">
            <FileText size={20} />
            <h2 className="text-sm font-bold uppercase tracking-wide">Lesson Content</h2>
          </div>
          <div className="prose prose-blue max-w-none">
            {formatContent(currentLesson.detailedContent)}
          </div>
        </motion.section>

        {/* Key Points */}
        {currentLesson.keyPoints?.length > 0 && (
          <motion.section className="bg-blue-50 rounded-2xl shadow-sm p-6 border border-blue-100">
            <div className="flex items-center gap-2 text-[#1a365d] mb-4">
              <Award size={20} />
              <h2 className="text-sm font-bold uppercase tracking-wide">Key Points</h2>
            </div>
            <ul className="space-y-2">
              {currentLesson.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-[#1a365d] font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Malawi Examples */}
        {currentLesson.malawiExamples?.length > 0 && (
          <motion.section className="bg-green-50 rounded-2xl shadow-sm p-6 border border-green-100">
            <div className="flex items-center gap-2 text-green-800 mb-4">
              <Lightbulb size={20} />
              <h2 className="text-sm font-bold uppercase tracking-wide">Malawi Examples</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.malawiExamples.map((ex, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-bold text-green-800">{ex.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{ex.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Summary */}
        <motion.section className="bg-gradient-to-r from-[#1a365d] to-[#15304f] rounded-2xl shadow-lg p-6 text-white">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3 opacity-90">Summary</h2>
          <p className="text-base md:text-lg font-medium leading-relaxed">{currentLesson.summary}</p>
        </motion.section>

        {/* Action Buttons */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <button
            onClick={handleDiscuss}
            className="flex items-center justify-center gap-3 bg-[#1a365d] text-white py-4 rounded-xl font-bold text-base shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-offset-2 active:scale-[0.98] transition-all duration-200"
          >
            💬 Discuss with Smart Mphunzitsi
          </button>
          <button
            onClick={handleQuiz}
            className="flex items-center justify-center gap-3 bg-white text-[#1a365d] py-4 rounded-xl font-bold text-base border-2 border-[#1a365d]/20 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-offset-2 active:scale-[0.98] transition-all duration-200"
          >
            📝 Take Lesson Quiz
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonPage;