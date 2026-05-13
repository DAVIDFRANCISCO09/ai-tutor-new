import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { getMySubjects, getLessonsBySubjectAndForm } from '../services/lessonService';
import { cacheTopicsList } from '../services/cache';

export const Dash = () => {
  const userName = localStorage.getItem('userName') || 'Student';
  const userForm = localStorage.getItem('userForm') || '';
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('subjects');
  const [selectionStep, setSelectionStep] = useState('subject');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectsData, setSubjectsData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ========== HANDLER FUNCTIONS ==========
  const handleSubjectClick = (subject) => {
    navigate(`/dashboard?subject=${encodeURIComponent(subject)}`);
    setSelectedSubject(subject);
    setSelectionStep('topic');
  };

  const handleBackToSubjects = () => {
    navigate('/dashboard', { replace: true });
    setSelectionStep('subject');
    setSelectedSubject(null);
  };

  const handleStartLearning = (topic) => {
    navigate(`/lesson/${encodeURIComponent(selectedSubject)}/${encodeURIComponent(topic)}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Parse query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');
    if (subjectParam && subjectsData.length > 0) {
      const subjectExists = subjectsData.some(s => s.subject === subjectParam);
      if (subjectExists) {
        setSelectedSubject(subjectParam);
        setSelectionStep('topic');
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [location.search, subjectsData, navigate]);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setError('');
        const data = await getMySubjects();
        if (data && Array.isArray(data)) {
          setSubjectsData(data);
        } else {
          setError('No subjects found');
        }
      } catch (err) {
        console.error('Failed to load subjects', err);
        if (!navigator.onLine) {
          setError('You are offline and no subjects have been cached yet. Please connect to the internet and refresh to load subjects.');
        } else {
          setError('Failed to load subjects. Please check your internet connection.');
        }
      } finally {
        setLoading(false);
      }
    };
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject && selectionStep === 'topic') {
      const loadTopics = async () => {
        try {
          const lessons = await getLessonsBySubjectAndForm(selectedSubject, userForm);
          const uniqueTopics = [...new Map(lessons.map(l => [l.topic, l])).values()];
          setTopics(uniqueTopics);
          await cacheTopicsList(selectedSubject, userForm, uniqueTopics);
        } catch (err) {
          console.error('Failed to load topics', err);
          setTopics([]);
          if (!navigator.onLine) {
            setError('You are offline and no topics have been cached. Please go online to view topics.');
          }
        }
      };
      loadTopics();
    }
  }, [selectedSubject, selectionStep, userForm]);

  if (!userForm) return <Navigate to="/setup" replace />;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <DashboardHeader
          userName={userName}
          userForm={userForm}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectionStep={selectionStep}
          setSelectionStep={setSelectionStep}
          setSelectedSubject={setSelectedSubject}
          onBack={handleBackToSubjects}
          onLogout={handleLogout}
        />
        <main className="p-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border shadow-sm animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-full mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-5"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <DashboardHeader
          userName={userName}
          userForm={userForm}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectionStep={selectionStep}
          setSelectionStep={setSelectionStep}
          setSelectedSubject={setSelectedSubject}
          onBack={handleBackToSubjects}
          onLogout={handleLogout}
        />
        <main className="p-6">
          <div className="max-w-5xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#1a365d] text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <DashboardHeader
        userName={userName}
        userForm={userForm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectionStep={selectionStep}
        setSelectionStep={setSelectionStep}
        setSelectedSubject={setSelectedSubject}
        onBack={handleBackToSubjects}
        onLogout={handleLogout}
      />
      <main className="p-6 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'subjects' ? (
              <motion.div key="subjects-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {selectionStep === 'subject' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjectsData.map((item, idx) => (
                      <motion.div
                        key={item.subject}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-start gap-4 h-full justify-between"
                      >
                        <h4 className="text-lg font-bold text-black">{item.subject}</h4>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-[#1a365d] h-2 rounded-full" style={{ width: `${(item.count / (item.count || 1)) * 100}%` }} />
                        </div>
                        <span className="text-xs text-gray-400 font-bold">{item.count} lessons</span>
                        <button
                          onClick={() => handleSubjectClick(item.subject)}
                          className="bg-[#1a365d] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-900 transition-colors"
                        >
                          Start
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-[#1a365d]">{selectedSubject} Topics</h2>
                      <p className="text-gray-500 font-medium">Select a topic to start your session</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {topics.map((topic, idx) => (
                        <motion.div
                          key={topic.topic}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all flex items-center justify-between group cursor-pointer"
                          onClick={() => handleStartLearning(topic.topic)}
                        >
                          <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{topic.topic}</span>
                          <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div key="progress-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className="text-center text-gray-500">View your progress on the Progress page.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dash;