:
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, GraduationCap, BookOpen, Eye, Headphones, PenTool, Users, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FORMS = [
  { label: 'Form 1', sub: 'Just starting secondary' },
  { label: 'Form 2', sub: 'Building foundations'     },
  { label: 'Form 3', sub: 'JCE year'                 },
  { label: 'Form 4', sub: 'MSCE year'                },
];

const LEARNING_STYLES = [
  { 
    id: 'visual', 
    label: 'Visual Learner', 
    sub: 'I learn best by seeing diagrams, charts, and videos',
    icon: Eye,
    description: 'You remember information better when you see it - pictures, diagrams, mind maps, and videos work best for you.'
  },
  { 
    id: 'auditory', 
    label: 'Auditory Learner', 
    sub: 'I learn best by listening and discussing',
    icon: Headphones,
    description: 'You learn well through listening - lectures, discussions, audio recordings, and reading aloud help you remember.'
  },
  { 
    id: 'reading', 
    label: 'Reading/Writing Learner', 
    sub: 'I learn best by reading and taking notes',
    icon: BookOpen,
    description: 'You prefer words - reading textbooks, writing notes, making lists, and studying from handouts works best for you.'
  },
  { 
    id: 'kinesthetic', 
    label: 'Hands-On Learner', 
    sub: 'I learn best by doing and practicing',
    icon: PenTool,
    description: 'You learn by doing - practical activities, experiments, writing examples, and solving problems help you understand.'
  },
  // { 
  //   id: 'social', 
  //   label: 'Social Learner', 
  //   sub: 'I learn best in groups and with others',
  //   icon: Users,
  //   description: 'You learn well with others - group discussions, peer teaching, study groups, and explaining concepts to friends.'
  // },
];

export const SetupPage = ({ onComplete, userName = 'there' }) => {
  const [step, setStep] = useState(1);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const navigate = useNavigate();

  const firstName = userName.split(' ')[0];

  const canProceedStep1 = selectedForm !== null;
  const canProceedStep2 = selectedStyle !== null;

  const handleNext = () => {
    if (step === 1 && canProceedStep1) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleStart = () => {
    if (!canProceedStep2) return;
    
    localStorage.setItem('userForm', selectedForm);
    localStorage.setItem('userLevel', 'Secondary');
    localStorage.setItem('learningStyle', selectedStyle);
    localStorage.setItem('userName', userName);
    
    if (typeof onComplete === 'function') onComplete('Secondary', selectedForm);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2.5 mb-8"
        >
          <div className="w-9 h-9 bg-[#1a365d] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <span className="text-white font-black text-sm tracking-tight">SM</span>
          </div>
          <div>
            <p className="text-[#1a365d] font-black text-sm uppercase tracking-widest leading-none">Smart Mphunzitsi</p>
            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest leading-none mt-0.5">Malawi</p>
          </div>
        </motion.div>

        {/* Header text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          {step === 1 ? (
            <>
              <h1 className="text-3xl font-black text-[#1a365d] leading-tight tracking-tight">
                Hey {firstName},<br />
                <span className="text-gray-400 font-black">which form are you in?</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                This helps me give you the right content for your level.
              </p>
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-[#1a365d] font-bold mb-3 hover:opacity-70 transition"
              >
                <ChevronLeft size={18} />
                <span className="text-xs">Back</span>
              </button>
              <h1 className="text-3xl font-black text-[#1a365d] leading-tight tracking-tight">
                How do you<br />
                <span className="text-gray-400 font-black">learn best?</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                I will personalize your lessons based on your learning style.
              </p>
            </>
          )}
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`h-1 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-[#1a365d]' : 'bg-gray-200'}`} />
          <div className={`h-1 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-[#1a365d]' : 'bg-gray-200'}`} />
        </div>

        {/* Step 1: Form Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl shadow-xl shadow-blue-900/8 border border-gray-100 overflow-hidden"
          >
            <div className="px-6 pt-6 pb-5">
              <div className="grid grid-cols-2 gap-2.5">
                {FORMS.map((f) => {
                  const active = selectedForm === f.label;
                  return (
                    <button
                      key={f.label}
                      onClick={() => setSelectedForm(f.label)}
                      aria-pressed={active}
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
          </motion.div>
        )}

        {/* Step 2: Learning Style Selection */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            {LEARNING_STYLES.map((style) => {
              const Icon = style.icon;
              const active = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`
                    w-full text-left p-4 rounded-2xl border-2 transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                    ${active
                      ? 'border-[#1a365d] bg-[#1a365d]'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? 'bg-white/15' : 'bg-gray-100'}`}>
                      <Icon size={18} className={active ? 'text-white' : 'text-gray-500'} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${active ? 'text-white' : 'text-gray-900'}`}>{style.label}</p>
                      <p className={`text-xs mt-0.5 ${active ? 'text-white/55' : 'text-gray-500'}`}>{style.sub}</p>
                      {active && (
                        <p className={`text-xs mt-2 ${active ? 'text-white/70' : 'text-gray-400'} leading-relaxed`}>
                          {style.description}
                        </p>
                      )}
                    </div>
                    {active && (
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="mt-6"
        >
          {step === 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceedStep1}
              className={`
                w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest
                flex items-center justify-center gap-2 transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                ${canProceedStep1
                  ? 'bg-[#1a365d] text-white shadow-xl shadow-blue-900/25 hover:bg-[#15304f] hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }
              `}
            >
              Continue
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <button
              onClick={handleStart}
              disabled={!canProceedStep2}
              className={`
                w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest
                flex items-center justify-center gap-2 transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                ${canProceedStep2
                  ? 'bg-[#1a365d] text-white shadow-xl shadow-blue-900/25 hover:bg-[#15304f] hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }
              `}
            >
              Start Learning
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          )}
        </motion.div>

        {/* Footer note */}
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