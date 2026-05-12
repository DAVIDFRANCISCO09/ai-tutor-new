import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Check, BookOpen, Eye, Headphones, PenTool, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FORMS = [
  { label: 'Form 1', sub: 'Just starting secondary' },
  { label: 'Form 2', sub: 'Building foundations'     },
  { label: 'Form 3', sub: 'JCE year'                 },
  { label: 'Form 4', sub: 'MSCE year'                },
];

const LEARNING_STYLES = [
  { id: 'visual',      label: 'Visual Learner',          sub: 'I learn best by seeing diagrams, charts, and videos',    icon: Eye,        description: 'You remember information better when you see it - pictures, diagrams, mind maps, and videos work best for you.' },
  { id: 'auditory',    label: 'Auditory Learner',         sub: 'I learn best by listening and discussing',               icon: Headphones,  description: 'You learn well through listening - lectures, discussions, audio recordings, and reading aloud help you remember.' },
  { id: 'reading',     label: 'Reading/Writing Learner',  sub: 'I learn best by reading and taking notes',               icon: BookOpen,    description: 'You prefer words - reading textbooks, writing notes, making lists, and studying from handouts works best for you.' },
  { id: 'kinesthetic', label: 'Hands-On Learner',         sub: 'I learn best by doing and practicing',                   icon: PenTool,     description: 'You learn by doing - practical activities, experiments, writing examples, and solving problems help you understand.' },
];

export const SetupPage = ({ onComplete, userName = 'there' }) => {
  const [step, setStep]               = useState(1);
  const [selectedForm, setSelectedForm]   = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const navigate = useNavigate();

  const firstName = userName.split(' ')[0];

  const handleStart = () => {
    if (!selectedStyle) return;
    localStorage.setItem('userForm',       selectedForm);
    localStorage.setItem('userLevel',      'Secondary');
    localStorage.setItem('learningStyle',  selectedStyle);
    localStorage.setItem('userName',       userName);
    if (typeof onComplete === 'function') onComplete('Secondary', selectedForm);
    navigate('/dashboard'); // ← fixed: was '/' which is LandingPage
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Brand */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-[#1a365d] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-sm">SM</span>
          </div>
          <div>
            <p className="text-[#1a365d] font-black text-sm uppercase tracking-widest leading-none">Smart Mphunzitsi</p>
            <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest leading-none mt-0.5">Malawi</p>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          {step === 1 ? (
            <>
              <h1 className="text-3xl font-black text-[#1a365d] leading-tight tracking-tight">
                Hey {firstName},<br /><span className="text-gray-400">which form are you in?</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2">This helps me give you the right content for your level.</p>
            </>
          ) : (
            <>
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-[#1a365d] font-bold mb-3 hover:opacity-70 transition">
                <ChevronLeft size={18} /><span className="text-xs">Back</span>
              </button>
              <h1 className="text-3xl font-black text-[#1a365d] leading-tight tracking-tight">
                How do you<br /><span className="text-gray-400">learn best?</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2">I will personalise your lessons based on your learning style.</p>
            </>
          )}
        </motion.div>

        {/* Step bar */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`h-1 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-[#1a365d]' : 'bg-gray-200'}`} />
          <div className={`h-1 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-[#1a365d]' : 'bg-gray-200'}`} />
        </div>

        {/* Step 1 — Form */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="px-6 pt-6 pb-5 grid grid-cols-2 gap-2.5">
              {FORMS.map(f => {
                const active = selectedForm === f.label;
                return (
                  <button key={f.label} onClick={() => setSelectedForm(f.label)} aria-pressed={active}
                    className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 focus:outline-none ${active ? 'border-[#1a365d] bg-[#1a365d]' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                  >
                    <p className={`font-black text-sm uppercase ${active ? 'text-white' : 'text-gray-900'}`}>{f.label}</p>
                    <p className={`text-xs mt-0.5 ${active ? 'text-white/55' : 'text-gray-400'}`}>{f.sub}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2 — Learning style */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            {LEARNING_STYLES.map(style => {
              const Icon   = style.icon;
              const active = selectedStyle === style.id;
              return (
                <button key={style.id} onClick={() => setSelectedStyle(style.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all focus:outline-none ${active ? 'border-[#1a365d] bg-[#1a365d]' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? 'bg-white/15' : 'bg-gray-100'}`}>
                      <Icon size={18} className={active ? 'text-white' : 'text-gray-500'} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${active ? 'text-white' : 'text-gray-900'}`}>{style.label}</p>
                      <p className={`text-xs mt-0.5 ${active ? 'text-white/55' : 'text-gray-500'}`}>{style.sub}</p>
                      {active && <p className="text-xs mt-2 text-white/70 leading-relaxed">{style.description}</p>}
                    </div>
                    {active && (
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <Check size={10} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* CTA button */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mt-6">
          {step === 1 ? (
            <button onClick={() => selectedForm && setStep(2)} disabled={!selectedForm}
              className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${selectedForm ? 'bg-[#1a365d] text-white shadow-xl hover:bg-[#15304f] active:scale-[0.98]' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
            >
              Continue <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <button onClick={handleStart} disabled={!selectedStyle}
              className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${selectedStyle ? 'bg-[#1a365d] text-white shadow-xl hover:bg-[#15304f] active:scale-[0.98]' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
            >
              Start Learning <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          )}
        </motion.div>

        <p className="text-center text-xs text-gray-400 mt-5">Aligned to the Malawi secondary curriculum · Form 1 – 4</p>
      </div>
    </div>
  );
};