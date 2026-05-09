import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Chat from './pages/Chat';
import History from './pages/History';
import ProgressPage from './components/myprogress/progresstracking';
import Dash from './dashboard/Dash';               
import SetupPage from './dashboard/SetupPage';      
import LessonPage from './dashboard/LessonPage';    
import { Toaster } from 'react-hot-toast';
import QuizPage from './Quiz/QuizPage';

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/history" element={<Navigate to="/chat" replace />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;