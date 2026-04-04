import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Trophy, GraduationCap, Target, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const FORMS = [
  { label: 'Form 1', sub: 'Just starting secondary' },
  { label: 'Form 2', sub: 'Building foundations'     },
  { label: 'Form 3', sub: 'JCE year'                 },
  { label: 'Form 4', sub: 'MSCE year'                },
];

const GOALS = [
  { id: 'msce',   label: 'Pass MSCE',         sub: 'Malawi School Certificate',      icon: Trophy        },
  { id: 'jce',    label: 'Pass JCE',          sub: 'Junior Certificate Exam',        icon: GraduationCap },
  { id: 'grades', label: 'Better grades',     sub: 'Improve marks this term',        icon: Target        },
  { id: 'curious', label: 'Learn & explore',  sub: 'Grow knowledge at my own pace',  icon: BookOpen      },
];


export const SetupPage = ({ onComplete, userName = 'there' }) => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();

  // firstName from whatever auth passes in — fallback to 'there'
  const firstName = userName.split(' ')[0];

  const canProceed = selectedForm && selectedGoal;

  const handleStart = () => {
    if (!canProceed) return;
    localStorage.setItem('userForm',  selectedForm);
    localStorage.setItem('userLevel', 'Secondary');
    localStorage.setItem('userGoal',  selectedGoal);
    if (typeof onComplete === 'function') onComplete('Secondary', selectedForm);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* ── Brand mark ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2.5 mb-8"
        >
          <div className="w-9 h-9 bg-[#1a365d] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span className="text-white font-black text-sm tracking-tight">AT</span>
          </div>
          <div>
            <p className="text-[#1a365d] font-black text-sm uppercase tracking-widest leading-none">AI Tutor</p>
            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest leading-none mt-0.5">Malawi</p>
          </div>
        </motion.div>

        {/* ── Greeting ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-[#1a365d] leading-tight tracking-tight">
            Hey {firstName}, let's set up you <br />
            {/* <span className="text-gray-400 font-black">let's set you up.</span> */}
          </h1>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Two quick questions and your personal AI tutor is ready.
          </p>
        </motion.div>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="bg-white rounded-3xl shadow-xl shadow-blue-900/8 border border-gray-100 overflow-hidden"
        >

          {/* Question 1 — Form */}
          <div className="px-6 pt-6 pb-5 border-b border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                Which form are you in?
              </p>
              {selectedForm && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Check size={10} className="text-white" strokeWidth={3} />
                </motion.span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {FORMS.map((f) => {
                const active = selectedForm === f.label;
                return (
                  <button
                    key={f.label}
                    onClick={() => setSelectedForm(f.label)}
                    aria-pressed={active}
                    aria-label={`${f.label} — ${f.sub}`}
                    className={`
                      relative p-4 rounded-2xl border-2 text-left transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                      ${active
                        ? 'border-[#1a365d] bg-[#1a365d]'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      }
                    `}
                  >
                    <p className={`font-black text-sm uppercase tracking-wide ${active ? 'text-white' : 'text-gray-900'}`}>
                      {f.label}
                    </p>
                    <p className={`text-xs mt-0.5 font-medium ${active ? 'text-white/55' : 'text-gray-400'}`}>
                      {f.sub}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2 — Goal */}
          <div className="px-6 pt-5 pb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                What's your main goal?
              </p>
              {selectedGoal && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Check size={10} className="text-white" strokeWidth={3} />
                </motion.span>
              )}
            </div>
            <div className="space-y-2">
              {GOALS.map((g) => {
                const Icon   = g.icon;
                const active = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    aria-pressed={active}
                    aria-label={`${g.label}: ${g.sub}`}
                    className={`
                      w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left
                      transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                      ${active
                        ? 'border-[#1a365d] bg-[#1a365d]'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? 'bg-white/15' : 'bg-gray-100'}`}>
                      <Icon size={16} className={active ? 'text-white' : 'text-gray-500'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${active ? 'text-white' : 'text-gray-900'}`}>{g.label}</p>
                      <p className={`text-xs mt-0.5 ${active ? 'text-white/55' : 'text-gray-400'}`}>{g.sub}</p>
                    </div>
                    <AnimatePresence>
                      {active && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <Check size={10} className="text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── CTA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="mt-4"
        >
          <button
            onClick={handleStart}
            disabled={!canProceed}
            aria-label="Start learning"
            className={`
              w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest
              flex items-center justify-center gap-2 transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
              ${canProceed
                ? 'bg-[#1a365d] text-white shadow-xl shadow-blue-900/25 hover:bg-[#15304f] hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }
            `}
          >
            {canProceed ? (
              <>
                Start Learning
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                >
                  <ChevronRight size={18} strokeWidth={2.5} />
                </motion.span>
              </>
            ) : (
              'Answer both questions to continue'
            )}
          </button>
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-400 mt-5 leading-relaxed"
        >
          Aligned to the Malawi secondary curriculum · Form 1 – 4
        </motion.p>

      </div>
    </div>
  );
};