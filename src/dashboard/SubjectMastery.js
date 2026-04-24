import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBJECTS, TOPICS_DATA } from './LearningData';

export const SubjectMastery = ({
  selectionStep,
  selectedSubject,
  form,
  onSubjectClick,
  onBack,
  onStartLearning,
}) => (
  <div className="max-w-5xl mx-auto space-y-10">
    <AnimatePresence mode="wait">
      {selectionStep === 'subject' ? (
        <motion.div
          key="subject-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUBJECTS.map((subject, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-start gap-4 h-full justify-between"
              >
                <h4 className="text-lg font-bold text-black">{subject.name}</h4>

                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[#1a365d] h-2 rounded-full"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 font-bold cursor-help"
                title="Mastery % shows how many topics you have completed in this subject"
                >{subject.progress}% mastery</span>

                <button
                  onClick={() => onSubjectClick(subject.name)}
                  className="bg-[#1a365d] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-900 transition-colors"
                >
                  Start
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="topic-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#1a365d] font-bold"
          >
            <ArrowLeft size={20} />
            Back to Subjects
          </button>

          <div>
            <h2 className="text-3xl font-bold text-[#1a365d]">{selectedSubject} Topics</h2>
            <p className="text-gray-500 font-medium">Select a topic to start your session</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedSubject && form && TOPICS_DATA[selectedSubject]?.[form]?.map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="w-full bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all flex items-center justify-between group cursor-pointer"
                onClick={() => onStartLearning(topic)}
                aria-label={`Start lesson on ${topic}`}
              >
                <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{topic}</span>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
