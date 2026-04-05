

import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardHeader } from './DashboardHeader';
import { SubjectMastery } from './SubjectMastery';

export const Dash = () => {
  const userName  = localStorage.getItem('userName')  || 'Student';
  const userLevel = localStorage.getItem('userLevel') || '';
  const userForm  = localStorage.getItem('userForm')  || '';

  const navigate = useNavigate();

  const [activeTab, setActiveTab]             = useState('subjects');
  const [selectionStep, setSelectionStep]     = useState('subject');
  const [selectedSubject, setSelectedSubject] = useState(null);

  if (!userForm) return <Navigate to="/setup" replace />;

  const handleStartLearning = (topic) => {
    navigate(`/lesson/${encodeURIComponent(selectedSubject)}/${encodeURIComponent(topic)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userForm');
    localStorage.removeItem('userLevel');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <DashboardHeader
        userName={userName}
        userLevel={userLevel}
        userForm={userForm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectionStep={selectionStep}
        setSelectionStep={setSelectionStep}
        setSelectedSubject={setSelectedSubject}
        onBack={() => { setSelectionStep('subject'); setSelectedSubject(null); }}
        onLogout={handleLogout}
      />

      <main className="p-6 pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'subjects' ? (
              <motion.div
                key="subjects-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <SubjectMastery
                  selectionStep={selectionStep}
                  selectedSubject={selectedSubject}
                  form={userForm}
                  onSubjectClick={(subject) => { setSelectedSubject(subject); setSelectionStep('topic'); }}
                  onBack={() => { setSelectionStep('subject'); setSelectedSubject(null); }}
                  onStartLearning={handleStartLearning}
                />
              </motion.div>
            ) : (
              <motion.div
                key="progress-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Progress tab will come soon */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dash;