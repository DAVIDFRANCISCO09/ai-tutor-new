// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronRight } from 'lucide-react';
// import { SUBJECTS, TOPICS_DATA } from './learningData';
// export const SubjectMastery = ({
//   selectionStep, selectedSubject, form, onSubjectClick, onBack, onStartLearning
// }) => (
//   <div className="max-w-5xl mx-auto space-y-10">
//     <AnimatePresence mode="wait">
//       {selectionStep === 'subject' ? (
//         <motion.div
//           key="subject-list"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="space-y-10"
//         >
//           {/* Enhanced Learning Journey Card */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="mesh-gradient rounded-[2.5rem] p-10 text-white space-y-10 shadow-2xl relative overflow-hidden group"
//           >
//             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
            
//             <div className="relative z-10 space-y-3">
//               <h2 className="text-4xl font-display font-bold tracking-tight">Your Learning Journey</h2>
//               <p className="text-blue-100/80 text-lg font-medium max-w-md">Keep up the great work!!1 You're making excellent progress this week.</p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
//               {[
//                 { label: 'Total Questions', value: '73', sub: '+12 today' },
//                 { label: 'Topics Mastered', value: '26', sub: 'Top 5%' },
//                 { label: 'Study Time', value: '12h', sub: 'Active now' }
//               ].map((stat, i) => (
//                 <div key={i} className="glass-dark rounded-3xl p-6 border border-white/10 hover:bg-white/20 transition-colors cursor-default">
//                   <p className="text-3xl font-display font-bold mb-1">{stat.value}</p>
//                   <p className="text-[11px] uppercase font-bold tracking-widest text-blue-200/70">{stat.label}</p>
//                   <p className="text-[10px] font-medium text-blue-300/50 mt-2">{stat.sub}</p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Subject Mastery List */}
//           <div className="space-y-8">
//             <div className="flex items-center justify-between px-2">
//               <h3 className="text-2xl font-display font-bold text-[#1a365d]">Subject Mastery</h3>
//               <div className="h-px flex-1 bg-gray-100 mx-6 hidden sm:block"></div>
//               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">6 Subjects</span>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {SUBJECTS.map((subject, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.05 }}
//                   onClick={() => onSubjectClick(subject.name)}
//                   className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
//                 >
//                   <div className="space-y-6">
//                     <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1a365d] group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
//                       {subject.icon}
//                     </div>
//                     <h4 className="text-2xl font-display font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{subject.name}</h4>
//                   </div>

//                   <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-50">
//                     <div className="flex flex-col">
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Curriculum</p>
//                       <p className="text-sm font-bold text-[#1a365d]">
//                         {form ? `${TOPICS_DATA[subject.name]?.[form]?.length || 0} Topics` : 'Topics'}
//                       </p>
//                     </div>
//                     <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
//                       <ChevronRight size={20} />
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       ) : (
//         <motion.div
//           key="topic-list"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="space-y-8"
//         >
//           <div className="flex items-center gap-6 mb-10">
//             <div>
//               <h2 className="text-3xl font-display font-bold text-[#1a365d]">{selectedSubject} Topics</h2>
//               <p className="text-gray-500 font-medium">Select a topic to start your session</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {selectedSubject && form && TOPICS_DATA[selectedSubject]?.[form]?.map((topic, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.03 }}
//                 className="w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex items-center justify-between group"
//               >
//                 <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => onStartLearning(topic)}>
//                   <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                   <span className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">{topic}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <button onClick={() => onStartLearning(topic)} className="w-10 h-10 flex items-center justify-center text-gray-300 group-hover:text-blue-600 transition-colors">
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </div>
// );


import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { SUBJECTS, TOPICS_DATA } from './learningData';
export const SubjectMastery = ({
  selectionStep, selectedSubject, form, onSubjectClick, onBack, onStartLearning
}) => (
  <div className="max-w-5xl mx-auto space-y-10">
    <AnimatePresence mode="wait">
      {selectionStep === 'subject' ? (
        <motion.div
          key="subject-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-10"
        >
          {/* Subject Mastery List */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUBJECTS.map((subject, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-start gap-6"
                >
                  <h4 className="text-3xl font-bold text-black">{subject.name}</h4>
                  <button
                    onClick={() => onSubjectClick(subject.name)}
                    className="bg-[#1a365d] text-white px-8 py-2 rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors"
                  >
                    Start
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="topic-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-[#1a365d]">{selectedSubject} Topics</h2>
              <p className="text-gray-500 font-medium">Select a topic to start your session</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {selectedSubject && form && TOPICS_DATA[selectedSubject]?.[form]?.map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="w-full bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => onStartLearning(topic)}>
                  <div className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">{topic}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => onStartLearning(topic)} className="w-10 h-10 flex items-center justify-center text-gray-300 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
