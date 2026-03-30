import React from 'react';
import { ArrowLeft, LogOut, LayoutDashboard, BookOpen, BarChart3, Sparkles } from 'lucide-react';

export const DashboardHeader = ({ 
  userName,
  selectionStep,
  onBack,
  activeTab,
  setActiveTab,
  setSelectionStep,
  setSelectedSubject,
  onLogout,
  level,
  form
}) => {
  const navItems = [
    { 
      id: 'home', 
      icon: <LayoutDashboard size={18} />, 
      label: 'Home', 
      isActive: activeTab === 'subjects' && selectionStep === 'subject',
      action: () => {
        setActiveTab('subjects');
        setSelectionStep('subject');
        setSelectedSubject(null);
      }
    },
    { 
      id: 'topics', 
      icon: <BookOpen size={18} />, 
      label: 'Topics', 
      isActive: activeTab === 'subjects' && selectionStep === 'topic',
      action: () => setActiveTab('subjects')
    },
    { 
      id: 'progress', 
      icon: <BarChart3 size={18} />, 
      label: 'Progress', 
      isActive: activeTab === 'progress',
      action: () => setActiveTab('progress')
    },
    { 
      id: 'ai-tutor', 
      icon: <Sparkles size={18} />, 
      label: 'AI Tutor', 
      isActive: false,
      action: () => {} 
    },
  ];

  return (
    <header className="glass px-6 py-4 flex items-center justify-between border-b border-gray-100/50 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          {activeTab === 'subjects' && selectionStep === 'topic' ? (
            <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center text-gray-900 hover:bg-white/50 rounded-xl transition-all border border-transparent hover:border-gray-200 shadow-sm mr-2"
            >
              <ArrowLeft size={20} />
            </button>
            
          ) : (
            <div className="w-10 h-10 bg-[#1a365d] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <span className="text-white font-display font-black text-base">AT</span>
            </div>
          )}
          <h1 className="text-xl font-display font-black text-[#1a365d] tracking-tight hidden lg:block uppercase">AI Tutor</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all uppercase tracking-wider ${
                item.isActive 
                  ? "bg-blue-50 text-blue-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              } ${item.id === 'ai-tutor' ? 'opacity-60' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden xl:flex flex-col items-end">
          <p className="text-sm font-medium text-gray-500">
            Welcome back, <span className="text-[#1a365d] font-bold">{userName}</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{level}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{form}</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline uppercase tracking-wider">logout</span>
        </button>
      </div>
    </header>
  );
};
