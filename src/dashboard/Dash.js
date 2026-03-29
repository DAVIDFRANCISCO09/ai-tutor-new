import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardHeader } from './DashboardHeader';

import { SubjectMastery } from './SubjectMastery';




export const Dash = ({ 
  onStartLearning, 
  onStartAILearning,
  onNavigate, 
  onLogout,
  level,
  form,
  selectionStep,
  setSelectionStep,
  selectedSubject,
  setSelectedSubject
}) => {
  const [activeTab, setActiveTab] = useState('subjects');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userName = "Jessie Munthali";

  return (
    <div className="min-h-screen bg-[#f8f9fa] relative overflow-x-hidden flex flex-col md:flex-row">
      {/* Sidebar Menu (Drawer on mobile, persistent on desktop) */}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          userName={userName} 
        />

        <main className="flex-1 p-6 pb-24 md:pb-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Toggle Tabs */}
            <div className="flex max-w-md mx-auto bg-white rounded-xl overflow-hidden border border-gray-100 mb-8 shadow-sm">
              <button 
                onClick={() => setActiveTab('subjects')}
                className={`flex-1 py-3 text-sm font-bold transition-all ${
                  activeTab === 'subjects' ? "bg-[#1a365d] text-white" : "bg-gray-50 text-gray-400"
                }`}
              >
                choose a subject
              </button>
              <button 
                onClick={() => setActiveTab('progress')}
                className={`flex-1 py-3 text-sm font-bold transition-all ${
                  activeTab === 'progress' ? "bg-[#1a365d] text-white" : "bg-gray-50 text-gray-400"
                }`}
              >
                My progress
              </button>
            </div>

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
                    form={form}
                    onSubjectClick={(subject) => {
                      setSelectedSubject(subject);
                      setSelectionStep('topic');
                    }}
                    onBack={() => {
                      setSelectionStep('subject');
                      setSelectedSubject(null);
                    }}
                    onStartLearning={onStartLearning}
                    onStartAILearning={onStartAILearning}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="progress-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                 
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Bottom Navigation Tabs (Mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-around items-center z-30 md:hidden">
        <button 
          onClick={() => setActiveTab('subjects')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'subjects' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <div className={`w-12 h-1 bg-blue-600 rounded-full mb-2 transition-opacity ${activeTab === 'subjects' ? 'opacity-100' : 'opacity-0'}`} />
          <span className="text-xs font-bold uppercase tracking-wider">Subjects</span>
        </button>
        <button 
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'progress' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <div className={`w-12 h-1 bg-blue-600 rounded-full mb-2 transition-opacity ${activeTab === 'progress' ? 'opacity-100' : 'opacity-0'}`} />
          <span className="text-xs font-bold uppercase tracking-wider">Progress</span>
        </button>
      </div>
    </div>
  );
};

export default Dash;
