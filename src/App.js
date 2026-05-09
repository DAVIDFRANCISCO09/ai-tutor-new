import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage    from './pages/LandingPage';
import Login          from './pages/Login';
import Register       from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Chat           from './pages/Chat';
import History        from './pages/History';
import ProgressPage   from './components/myprogress/progresstracking';

import { Dash }       from './dashboard/Dash';
import { SetupPage }  from './dashboard/SetupPage';
import { LessonPage } from './dashboard/LessonPage';
import QuizPage       from './Quiz/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/"                       element={<LandingPage />} />
        <Route path="/login"                  element={<Login />} />
        <Route path="/register"               element={<Register />} />
        <Route path="/forgot-password"        element={<ForgotPassword />} />

        {/* Setup — first time only */}
        <Route path="/setup"                  element={<SetupPage userName="Student" />} />

        {/* Dashboard */}
        <Route path="/dashboard"              element={<Dash />} />

        {/* Lesson */}
        <Route path="/lesson/:subject/:topic" element={<LessonPage />} />

        {/* Quiz */}
        <Route path="/quiz/:subject/:topic"   element={<QuizPage />} />

        {/* AI Tutor chat */}
        <Route path="/chat"                   element={<Chat />} />

        {/* Chat history */}
        <Route path="/history"                element={<History />} />

        {/* Progress tracking */}
        <Route path="/progress"               element={<ProgressPage />} />

        {/* Catch all */}
        <Route path="*"                       element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;