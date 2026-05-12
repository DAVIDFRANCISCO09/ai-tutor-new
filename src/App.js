import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Chat from './pages/Chat';
//import History from './pages/History';
import ProgressPage from './components/myprogress/progresstracking';
import Dash from './dashboard/Dash';               
//import SetupPage from './dashboard/SetupPage';      
import LessonPage from './dashboard/LessonPage';    
import { Toaster } from 'react-hot-toast';
import QuizPage from './Quiz/QuizPage';

function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <BrowserRouter>
      {isOffline && (
        <div className="bg-amber-500 text-white text-center py-2 text-sm font-medium sticky top-0 z-50">
          📡 You are offline. You can view your cached lessons, past chats, and previous quiz results.
          New quizzes and AI chat require internet. Login/Register also need internet.
        </div>
      )}
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* <Route path="/setup" element={<SetupPage userName="Student" />} /> */}
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/lesson/:subject/:topic" element={<LessonPage />} />
        <Route path="/quiz/:subject/:topic" element={<QuizPage />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="/history" element={<Navigate to="/chat" replace />} /> */}
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;