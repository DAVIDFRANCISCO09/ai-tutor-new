import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';

export const SetupPage = ({ onComplete }) => {
  const [selectedForm, setSelectedForm] = useState(null);

  const forms = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];

  const handleComplete = () => {
    if (selectedForm) {
      onComplete('Secondary', selectedForm);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* Top Branding/Info */}
        <div className="bg-[#1a365d] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
              <span className="text-white font-black text-xl">AT</span>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tight uppercase">Welcome</h1>
              <p className="text-blue-100/60 font-medium leading-relaxed">
                Select your current Form to personalize your learning journey.
              </p>
            </div>
          </div>
        </div>

        {/* Selection Form */}
        <div className="p-10 md:p-12 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Select your Form</h3>
              {selectedForm && <Check size={16} className="text-green-500" />}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {forms.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedForm(f)}
                  className={`py-6 px-4 rounded-3xl border-2 text-center transition-all group ${
                    selectedForm === f 
                      ? "border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-900/5" 
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <p className={`text-xl font-black uppercase tracking-wider ${selectedForm === f ? "text-blue-700" : "text-gray-900"}`}>
                    {f}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Secondary Level</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              disabled={!selectedForm}
              onClick={handleComplete}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-3 ${
                selectedForm
                  ? "bg-[#1a365d] text-white shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              Start Learning
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
