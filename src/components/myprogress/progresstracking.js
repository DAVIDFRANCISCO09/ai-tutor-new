import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, LayoutDashboard, BarChart3, Sparkles, AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import api from '../../services/api';
import { getCachedProgressOverview, cacheProgressOverview } from '../../services/cache';
import toast from 'react-hot-toast';

const ScoreBar = ({ score }) => {
  if (score === null || score === undefined) return <span className="text-xs text-gray-400 italic">Not attempted</span>;
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#1a365d] rounded-full" style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-bold">{score}%</span>
    </div>
  );
};

// Subject Detail Component
const SubjectDetail = ({ subject, progress, onBack }) => {
  const navigate = useNavigate();
  const [loadingLesson, setLoadingLesson] = useState(null);
  const completed = progress?.completedLessons || [];
  const total = progress?.totalLessons || 0;
  const avgScore = completed.length
    ? completed.reduce((a, t) => a + (t.score || 0), 0) / completed.length
    : null;
  const needRevision = completed.filter(lesson => (lesson.score || 0) < 60);

  const handleReview = useCallback(async (lesson) => {
    const { subject: lessonSubject, topic: lessonTopic, lessonId } = lesson;
    if (lessonSubject && lessonTopic && lessonId) {
      navigate(`/lesson/${encodeURIComponent(lessonSubject)}/${encodeURIComponent(lessonTopic)}?lessonId=${lessonId}`);
      return;
    }
    if (!lessonId) {
      toast.error('Lesson ID missing – cannot open review.');
      return;
    }
    setLoadingLesson(lessonId);
    try {
      const res = await api.get(`/lessons/${encodeURIComponent(subject)}/${encodeURIComponent(lessonId)}`);
      const lessonData = res.data;
      if (!lessonData || !lessonData.topic) throw new Error('Lesson topic not found');
      navigate(`/lesson/${encodeURIComponent(subject)}/${encodeURIComponent(lessonData.topic)}?lessonId=${lessonId}`);
    } catch (err) {
      toast.error('Could not load lesson details for review.');
    } finally {
      setLoadingLesson(null);
    }
  }, [navigate, subject]);

  return (
    <div>
      <div className="bg-[#1a365d] rounded-xl p-5 mb-5 text-white">
        <h2 className="text-2xl font-bold">{subject}</h2>
        <p className="text-sm opacity-80">{completed.length} of {total} lessons completed</p>
        {avgScore !== null && <div className="mt-2 text-2xl font-bold">{avgScore.toFixed(1)}% avg score</div>}
      </div>

      <div className="bg-white border rounded-xl overflow-hidden mb-6">
        <div className="flex justify-between px-4 py-2 bg-gray-50 border-b font-bold text-gray-500 text-xs">
          <span>Lesson</span><span>Score</span>
        </div>
        {completed.map((lesson, i) => (
          <div key={lesson.lessonId || i} className="flex justify-between px-4 py-2 border-b last:border-0 bg-white even:bg-gray-50">
            <span>{lesson.lessonTitle}</span>
            <ScoreBar score={lesson.score} />
          </div>
        ))}
      </div>

      {needRevision.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-yellow-800 mb-3">
            <AlertCircle size={18} />
            <h3 className="font-bold">Focus on these topics (need revision)</h3>
          </div>
          <ul className="space-y-2">
            {needRevision.map(lesson => (
              <li key={lesson.lessonId} className="flex justify-between items-center bg-white rounded-lg p-2 border border-yellow-100">
                <div>
                  <p className="text-sm font-medium">{lesson.lessonTitle}</p>
                  <p className="text-xs text-gray-500">Score: {lesson.score}% – below 60%</p>
                </div>
                <button
                  onClick={() => handleReview(lesson)}
                  disabled={loadingLesson === lesson.lessonId}
                  className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                >
                  <RotateCcw size={12} />
                  {loadingLesson === lesson.lessonId ? 'Loading...' : 'Review'}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-yellow-700 mt-3">Re‑study these lessons and retake the quizzes to improve your understanding.</p>
        </div>
      )}
    </div>
  );
};

// Topics Overview Component
const TopicsOverview = ({ allProgress }) => {
  const allLessons = allProgress.flatMap(p => p.completedLessons || []);
  if (!allLessons.length) return <p className="text-center text-gray-500">No lessons completed yet. Take a quiz to track progress!</p>;
  return (
    <div>
      <div className="bg-[#1a365d] rounded-xl p-5 mb-5 text-white">
        <h2 className="text-2xl font-bold">All Completed Lessons</h2>
      </div>
      {allProgress.map(subj => subj.completedLessons?.length > 0 && (
        <div key={subj.subject} className="bg-white border rounded-xl overflow-hidden mb-4">
          <div className="bg-[#1a365d] px-4 py-2 text-white font-bold">{subj.subject}</div>
          {subj.completedLessons.map((lesson, i) => (
            <div key={lesson.lessonId || i} className="flex justify-between px-4 py-2 border-b last:border-0">
              <span>{lesson.lessonTitle}</span>
              <ScoreBar score={lesson.score} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// MAIN ProgressPage Component
export default function ProgressPage() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ completed: 0, total: 0, avgScore: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const userName = localStorage.getItem('userName') || 'Student';
  const userForm = localStorage.getItem('userForm') || 'Form 1';

  // Load cached progress immediately, then fetch fresh
  useEffect(() => {
    let isMounted = true;

    const loadProgress = async () => {
      // Try cached data first
      const cached = await getCachedProgressOverview();
      if (cached && isMounted) {
        setProgress(cached);
        const totalCompleted = cached.reduce((s, p) => s + (p.completedLessons?.length || 0), 0);
        const totalLessons = cached.reduce((s, p) => s + (p.totalLessons || 0), 0);
        const allScores = cached.flatMap(p => p.completedLessons?.map(l => l.score) || []);
        const avg = allScores.length ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
        setStats({ completed: totalCompleted, total: totalLessons, avgScore: avg });
        setLoading(false);
      }

      // If online, fetch fresh data and update cache
      if (navigator.onLine) {
        try {
          const res = await api.get('/progress/overview/all');
          const freshData = res.data;
          if (isMounted) {
            setProgress(freshData);
            const totalCompleted = freshData.reduce((s, p) => s + (p.completedLessons?.length || 0), 0);
            const totalLessons = freshData.reduce((s, p) => s + (p.totalLessons || 0), 0);
            const allScores = freshData.flatMap(p => p.completedLessons?.map(l => l.score) || []);
            const avg = allScores.length ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
            setStats({ completed: totalCompleted, total: totalLessons, avgScore: avg });
            setLoading(false);
            await cacheProgressOverview(freshData);
          }
        } catch (err) {
          console.error('Failed to fetch fresh progress', err);
          if (!cached && isMounted) {
            setLoading(false);
            toast.error('Failed to load progress data');
          }
        }
      } else if (!cached && isMounted) {
        // Offline and no cache
        setLoading(false);
      }
    };

    loadProgress();
    return () => { isMounted = false; };
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  const handleBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
    } else if (showAll) {
      setShowAll(false);
    } else {
      navigate('/dashboard');
    }
  };

  const showBackButton = selectedSubject !== null || showAll !== false;

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header – always rendered immediately */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton ? (
              <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-xl text-[#1a365d]">
                <ArrowLeft size={22} />
              </button>
            ) : (
              <div className="w-9 h-9 bg-[#1a365d] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-sm">SM</span>
              </div>
            )}
            <h1 className="text-base font-black text-[#1a365d] tracking-tight uppercase">Smart Mphunzitsi</h1>
          </div>

          {!showBackButton && (
            <nav className="hidden md:flex items-center gap-1">
              <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 hover:bg-gray-50">
                <LayoutDashboard size={18} /><span>Home</span>
              </button>
              <button onClick={() => navigate('/progress')} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#1a365d]">
                <BarChart3 size={18} /><span>Progress</span>
              </button>
              <button onClick={() => navigate('/chat')} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 hover:bg-gray-50">
                <Sparkles size={18} /><span>Smart Mphunzitsi</span>
              </button>
            </nav>
          )}

          <div className="flex items-center gap-3">
            <div className="hidden xl:flex flex-col items-end">
              <p className="text-xs font-semibold text-gray-700">{userName}</p>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{userForm}</span>
            </div>
            <button onClick={handleLogout} className="hidden md:flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
              <LogOut size={16} /><span>Logout</span>
            </button>
            <button onClick={() => setMenuOpen(o => !o)} className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-100">
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block w-5 h-0.5 bg-gray-700 rounded-full origin-center" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-5 h-0.5 bg-gray-700 rounded-full" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block w-5 h-0.5 bg-gray-700 rounded-full origin-center" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden border-t border-gray-100 bg-white">
              <div className="px-5 py-3 bg-[#1a365d]/5 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1a365d] rounded-lg flex items-center justify-center"><span className="text-white font-black text-xs">{userName[0]}</span></div>
                <div><p className="text-xs font-bold text-[#1a365d]">{userName}</p><div className="flex gap-1.5 mt-0.5"><span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">{userForm}</span></div></div>
              </div>
              <nav className="px-3 py-2">
                <button onClick={() => { navigate('/dashboard'); setMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left text-gray-600 hover:bg-gray-50">
                  <LayoutDashboard size={18} /><span>Home</span>
                </button>
                <button onClick={() => { navigate('/progress'); setMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left bg-blue-50 text-[#1a365d]">
                  <BarChart3 size={18} /><span>Progress</span>
                </button>
                <button onClick={() => { navigate('/chat'); setMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left text-gray-600 hover:bg-gray-50">
                  <Sparkles size={18} /><span>Smart Mphunzitsi</span>
                </button>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left"
                >
                  <LogOut size={16} /><span>Logout</span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Content area – loading skeleton only here, not the header */}
      <div className="max-w-3xl mx-auto p-4">
        {loading && !progress.length ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : showAll ? (
          <TopicsOverview allProgress={progress} />
        ) : selectedSubject ? (
          <SubjectDetail
            subject={selectedSubject}
            progress={progress.find(p => p.subject === selectedSubject)}
            onBack={() => setSelectedSubject(null)}
          />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[#1a365d] mb-2">My Progress</h1>
            <div className="grid grid-cols-3 gap-3 my-6">
              <div className="bg-[#1a365d] text-white p-4 rounded-xl">
                <p className="text-xs">Subjects</p>
                <p className="text-2xl font-bold">{progress.length}</p>
              </div>
              <div onClick={() => setShowAll(true)} className="bg-[#1a365d] text-white p-4 rounded-xl cursor-pointer hover:opacity-90 transition">
                <p className="text-xs">Lessons Done</p>
                <p className="text-2xl font-bold">{stats.completed}/{stats.total}</p>
              </div>
              <div className="bg-[#1a365d] text-white p-4 rounded-xl">
                <p className="text-xs">Avg Score</p>
                <p className="text-2xl font-bold">{stats.avgScore.toFixed(1)}%</p>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-3">Subjects</h2>
            <div className="space-y-2">
              {progress.map(p => (
                <button key={p.subject} onClick={() => setSelectedSubject(p.subject)} className="w-full bg-white border rounded-xl p-3 flex justify-between items-center hover:shadow transition text-left">
                  <span className="font-bold">{p.subject}</span>
                  <span>{p.completedLessons?.length || 0}/{p.totalLessons} lessons</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}