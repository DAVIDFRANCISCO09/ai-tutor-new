

import React, { useState } from 'react';
import { ArrowLeft, LogOut, LayoutDashboard, BookOpen, BarChart3, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardHeader = ({
  userName,
  userLevel,
  userForm,
  selectionStep,
  onBack,
  activeTab,
  setActiveTab,
  setSelectionStep,
  setSelectedSubject,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'home',
      icon: <LayoutDashboard size={18} />,
      label: 'Home',
      isActive: activeTab === 'subjects' && selectionStep === 'subject',
      action: () => { setActiveTab('subjects'); setSelectionStep('subject'); setSelectedSubject(null); setMenuOpen(false); },
    },
    {
      id: 'topics',
      icon: <BookOpen size={18} />,
      label: 'Topics',
      isActive: activeTab === 'subjects' && selectionStep === 'topic',
      action: () => { setActiveTab('subjects'); setMenuOpen(false); },
    },
    {
      id: 'progress',
      icon: <BarChart3 size={18} />,
      label: 'Progress',
      isActive: activeTab === 'progress',
      action: () => { setActiveTab('progress'); setMenuOpen(false); },
    },
    {
      id: 'ai-tutor',
      icon: <Sparkles size={18} />,
      label: 'AI Tutor',
      isActive: false,
      disabled: true,
      tooltip: 'Coming soon',
      action: () => {},
    },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="px-5 py-3.5 flex items-center justify-between">

          {/* logo or back button */}
          <div className="flex items-center gap-3">
            {activeTab === 'subjects' && selectionStep === 'topic' ? (
              <button
                onClick={onBack}
                aria-label="Go back to subjects"
                className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
              >
                <ArrowLeft size={20} />
              </button>
            ) : (
              <div className="w-9 h-9 bg-[#1a365d] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-sm">SM</span>
              </div>
            )}
            <h1 className="text-base font-black text-[#1a365d] tracking-tight uppercase">Smart Mphunzitsi</h1>
          </div>

          {/* desktop navigation bar */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={item.action}
                disabled={item.disabled}
                title={item.tooltip}
                aria-label={item.tooltip || item.label}
                aria-current={item.isActive ? 'page' : undefined}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider
                  ${item.isActive ? 'bg-blue-50 text-[#1a365d]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                  ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right, user info and logout (desktop) and also hamburger (mobile) */}
          <div className="flex items-center gap-3">
            {/* User info — desktop only */}
            <div className="hidden xl:flex flex-col items-end">
              <p className="text-xs font-semibold text-gray-700">{userName ?? 'Student'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                {userLevel && <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{userLevel}</span>}
                {userForm  && <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{userForm}</span>}
              </div>
            </div>

            {/* Logout — desktop only */}
            <button
              onClick={onLogout}
              aria-label="Log out"
              className="hidden md:flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={16} />
              <span className="uppercase tracking-wider">Logout</span>
            </button>

            {/* Hamburger, mobile only */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}  className="block w-5 h-0.5 bg-gray-700 rounded-full origin-center" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}                         className="block w-5 h-0.5 bg-gray-700 rounded-full" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block w-5 h-0.5 bg-gray-700 rounded-full origin-center" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
            >
              {/* User info */}
              <div className="px-5 py-3 bg-[#1a365d]/5 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1a365d] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-xs">{(userName ?? 'S')[0]}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1a365d]">{userName ?? 'Student'}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {userLevel && <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">{userLevel}</span>}
                    {userForm  && <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">{userForm}</span>}
                  </div>
                </div>
              </div>

              {/* Navigation contents */}
              <nav className="px-3 py-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    disabled={item.disabled}
                    aria-current={item.isActive ? 'page' : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left
                      ${item.isActive ? 'bg-blue-50 text-[#1a365d]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                      ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.disabled && <span className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-widest">Soon</span>}
                  </button>
                ))}
              </nav>

              {/* Logout button*/}
              <div className="px-3 pb-3 pt-1 border-t border-gray-100">
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  aria-label="Log out"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Tap outside to close */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};