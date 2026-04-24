import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Chat from './pages/Chat';
import ProgressPage from './components/myprogress/progresstracking';

import { Dash } from './dashboard/Dash';
import { SetupPage } from './dashboard/SetupPage';
import { LessonPage } from './dashboard/LessonPage';
import QuizPage from './Quiz/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* App Routes */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/setup" element={<SetupPage userName="Student" />} />

        <Route path="/lesson/:subject/:topic" element={<LessonPage />} />

        {/* ✅ IMPORTANT: Quiz route */}
        <Route path="/quiz/:subject/:topic" element={<QuizPage />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
