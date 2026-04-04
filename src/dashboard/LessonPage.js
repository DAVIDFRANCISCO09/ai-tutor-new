

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, MessageSquare, CheckCircle, Clock, FileText, Lightbulb, Target } from 'lucide-react';
import { MOCK_LESSONS } from './LearningData';

export const LessonPage = () => {
  const { subject, topic } = useParams();
  const navigate           = useNavigate();

  const decodedTopic   = decodeURIComponent(topic   || '');
  const decodedSubject = decodeURIComponent(subject || '');

  const lesson = MOCK_LESSONS[decodedTopic] || {
    title: decodedTopic,
    introduction: `Welcome to your lesson on ${decodedTopic}.`,
    keyPoints: ['Core definitions', 'Key principles', 'Practical applications', 'Essential takeaways'],
    detailedContent: `In this section we explore ${decodedTopic} in depth, examining how concepts apply in real-world scenarios.`,
    summary: `Mastering ${decodedTopic} builds a stronger foundation in ${decodedSubject}.`,
    estimatedTime: '15 mins',
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Header — its own back-button nav, no hamburger needed here */}
      <div className="bg-white px-5 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <button
          onClick={() => navigate('/')}
          aria-label="Back to dashboard"
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-[#1a365d]"
        >
          <ArrowLeft size={22} />
        </button>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{decodedSubject}</p>
          <h1 className="text-base font-bold text-[#1a365d] leading-tight">{lesson.title}</h1>
          <div className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
            <Clock size={11} />
            <span>{lesson.estimatedTime} read</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8 space-y-8">

        {/* Introduction */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="flex items-center gap-2 text-[#1a365d]">
            <Lightbulb size={18} />
            <h2 className="text-sm font-bold uppercase tracking-wider">Introduction</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-base italic">"{lesson.introduction}"</p>
        </motion.section>

        {/* Learning Objectives */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 text-[#1a365d]">
            <Target size={18} />
            <h2 className="text-sm font-bold uppercase tracking-wider">Learning Objectives</h2>
          </div>
          <ul className="space-y-3">
            {lesson.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 group">
                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CheckCircle size={12} />
                </div>
                <span className="text-gray-700 text-sm font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Lesson Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-[#1a365d]">
            <FileText size={18} />
            <h2 className="text-sm font-bold uppercase tracking-wider">Lesson Content</h2>
          </div>
          {lesson.detailedContent.split('\n').map((para, idx) =>
            para.trim()
              ? <p key={idx} className="text-gray-700 leading-relaxed text-base">{para.trim()}</p>
              : null
          )}
        </motion.section>

        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-2"
        >
          <h2 className="text-sm font-bold text-[#1a365d] uppercase tracking-wider">Summary</h2>
          <p className="text-blue-900 leading-relaxed text-sm font-medium">{lesson.summary}</p>
        </motion.section>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
        >
          <button className="flex items-center justify-center gap-3 bg-[#1a365d] text-white py-4 rounded-2xl font-bold text-sm shadow-lg hover:bg-[#15304f] transition-all active:scale-95">
            <MessageSquare size={18} />
            Discuss with AI Tutor
          </button>
          <button className="flex items-center justify-center gap-3 bg-white text-[#1a365d] py-4 rounded-2xl font-bold text-sm border-2 border-[#1a365d]/10 hover:border-[#1a365d]/30 transition-all active:scale-95">
            <Play size={18} />
            Take Lesson Quiz
          </button>
        </motion.div>
      </div>
    </div>
  );
};