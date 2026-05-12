import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, LayoutDashboard, BarChart3, Sparkles, Trash2, X, Mic, PanelLeftOpen, PanelLeftClose, Pin, PinOff } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { subject, topic, lesson } = location.state || { subject: 'General', topic: 'General', lesson: null };
  const userName = localStorage.getItem('userName') || 'Student';
  const userForm = localStorage.getItem('userForm') || 'Form 1';
  const learningStyle = localStorage.getItem('learningStyle') || 'visual';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const sessionIdRef = useRef('session_' + Date.now());
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesRef = useRef([]);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // Format AI response (unchanged)
  const formatAIResponse = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    const formattedLines = [];

    const parseInline = (str, key) => {
      const tokens = [];
      const regex = /\*\*(.*?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
      let last = 0;
      let m;
      while ((m = regex.exec(str)) !== null) {
        if (m.index > last) tokens.push(str.substring(last, m.index));
        if (m[1] !== undefined) {
          tokens.push(<strong key={`b-${key}-${m.index}`} className="font-bold text-gray-800">{m[1]}</strong>);
        } else {
          tokens.push(
            <a key={`a-${key}-${m.index}`} href={m[3]} target="_blank" rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 break-all">
              {m[2]}
            </a>
          );
        }
        last = m.index + m[0].length;
      }
      if (last < str.length) tokens.push(str.substring(last));
      return tokens.length ? tokens : str;
    };

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (line === '') { formattedLines.push(<br key={i} />); continue; }
      if ((line === line.toUpperCase() && line.length < 60 && !line.endsWith('?')) || line.endsWith(':')) {
        formattedLines.push(<h3 key={i} className="text-md font-bold text-[#1a365d] mt-3 mb-1">{line}</h3>);
        continue;
      }
      if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
        formattedLines.push(
          <div key={i} className="flex items-start gap-2 my-1 ml-2">
            <span className="text-[#1a365d] text-sm">•</span>
            <span className="text-gray-700 flex-1">{parseInline(line.substring(2), i)}</span>
          </div>
        );
        continue;
      }
      const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (numberedMatch) {
        formattedLines.push(
          <div key={i} className="flex items-start gap-2 my-1 ml-2">
            <span className="text-gray-600 font-semibold text-sm">{numberedMatch[1]}.</span>
            <span className="text-gray-700 flex-1">{parseInline(numberedMatch[2], i)}</span>
          </div>
        );
        continue;
      }
      formattedLines.push(<p key={i} className="text-gray-700 my-1 leading-relaxed">{parseInline(line, i)}</p>);
    }
    return formattedLines;
  };

  const sendMessage = useCallback(async (text) => {
    if (!text?.trim()) return;
    const userMsg = { role: 'user', content: text };
    const updated = [...messagesRef.current, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const res = await api.post('/chat', {
        message: text,
        subject: subject || 'General',
        topic: topic || 'General',
        lessonContext: lesson,
        conversationHistory: updated.slice(-10),
        learningStyle,
      });
      const aiMsg = { role: 'assistant', content: res.data.response };
      const final = [...updated, aiMsg];
      setMessages(final);
      await saveCurrentSession(final);
    } catch (err) {
      toast.error('Chat error');
      setMessages([...updated, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }, [subject, topic, lesson, learningStyle]);

  // Voice recognition helpers (unchanged)
  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch {
      toast.error('Microphone access denied. Please allow it in browser settings (lock icon).');
      return false;
    }
  };

  const initSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Voice input not supported in this browser');
      return null;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      if (transcript.trim()) sendMessage(transcript);
    };
    recognition.onerror = (e) => {
      setIsListening(false);
      if (e.error !== 'aborted') toast.error('Voice recognition failed. Try again.');
    };
    recognition.onend = () => setIsListening(false);
    return recognition;
  }, [sendMessage]);

  const startListening = async () => {
    if (isListening) {
      recognitionRef.current?.abort();
      setIsListening(false);
      return;
    }
    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) return;
    if (recognitionRef.current) recognitionRef.current.abort();
    const recog = initSpeechRecognition();
    if (recog) {
      recognitionRef.current = recog;
      recog.start();
      setIsListening(true);
    }
  };

  // Chat history functions (unchanged)
  const loadHistory = async () => {
    try {
      const res = await api.get('/chat/history');
      setSessions(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadSession = (sessionId, sessionMessages) => {
    sessionIdRef.current = sessionId;
    setMessages(sessionMessages);
    toast.success('Session loaded');
    setSidebarOpen(false);
  };

  const deleteSession = async (sessionId, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this chat session?')) return;
    try {
      await api.delete(`/chat/history/${sessionId}`);
      setSessions(sessions.filter(s => s.sessionId !== sessionId));
      if (sessionId === sessionIdRef.current) {
        sessionIdRef.current = 'session_' + Date.now();
        setMessages([]);
        addGreeting();
      }
    } catch {
      toast.error('Failed to delete session');
    }
  };

  const togglePin = async (sessionId, e) => {
    e.stopPropagation();
    try {
      const res = await api.patch(`/chat/pin/${sessionId}`);
      setSessions(prev =>
        prev.map(s => s.sessionId === sessionId ? { ...s, pinned: res.data.pinned } : s)
          .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || new Date(b.updatedAt) - new Date(a.updatedAt))
      );
      toast.success(res.data.pinned ? 'Pinned' : 'Unpinned');
    } catch {
      toast.error('Failed to update pin');
    }
  };

  const addGreeting = () => {
    let greeting = `Hi! I am Smart Mphunzitsi. `;
    if (lesson) greeting += `Today we are studying "${lesson.title}" in ${subject} – ${topic}. Ask me anything!`;
    else if (subject && topic) greeting += `You are in ${subject} – ${topic}. Ask me anything!`;
    else greeting += `How can I help you with your studies today?`;
    setMessages([{ role: 'assistant', content: greeting }]);
  };

  const saveCurrentSession = async (msgs) => {
    if (!msgs.length) return;
    try {
      await api.post('/chat/session', {
        sessionId: sessionIdRef.current,
        subject: subject || 'General',
        topic: topic || 'General',
        lessonId: lesson?.lessonId,
        messages: msgs,
      });
      await loadHistory();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadHistory();
      if (lesson?.lessonId) {
        const existing = sessions.find(s => s.lessonId === lesson.lessonId);
        if (existing?.messages.length) {
          sessionIdRef.current = existing.sessionId;
          setMessages(existing.messages);
          return;
        }
      }
      if (!messages.length) addGreeting();
    };
    init();
  }, [lesson, sessions, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogout = () => { localStorage.clear(); navigate('/'); };

  const navItems = [
    { id: 'home', label: 'Home', icon: <LayoutDashboard size={18} />, action: () => navigate('/dashboard') },
    { id: 'progress', label: 'Progress', icon: <BarChart3 size={18} />, action: () => navigate('/progress') },
    { id: 'ai-tutor', label: 'Smart Mphunzitsi', icon: <Sparkles size={18} />, action: () => navigate('/chat'), isActive: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header (unchanged) */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm flex-shrink-0">
        <div className="px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1a365d] rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-black text-sm">SM</span>
            </div>
            <h1 className="text-base font-black text-[#1a365d] tracking-tight uppercase">Smart Mphunzitsi</h1>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item.id} onClick={item.action} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${item.isActive ? 'bg-blue-50 text-[#1a365d]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                {item.icon}<span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex flex-col items-end">
              <p className="text-xs font-semibold text-gray-700">{userName}</p>
              <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{userForm}</span>
            </div>
            <button onClick={handleLogout} className="hidden md:flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
              <LogOut size={16} /><span>Logout</span>
            </button>
            <button onClick={() => setMenuOpen(o => !o)} className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-gray-100">
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block w-5 h-0.5 bg-gray-700 rounded-full origin-center" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-5 h-0.5 bg-gray-700 rounded-full" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block w-5 h-0.5 bg-gray-700 rounded-full origin-center" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden border-t border-gray-100 bg-white">
              <div className="px-5 py-3 bg-[#1a365d]/5 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1a365d] rounded-lg flex items-center justify-center"><span className="text-white font-black text-xs">{userName[0]}</span></div>
                <div className="flex-1"><p className="text-xs font-bold text-[#1a365d]">{userName}</p></div>
              </div>
              <nav className="px-3 py-2">
                {navItems.map(item => (
                  <button key={item.id} onClick={() => { item.action(); setMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left text-gray-600 hover:bg-gray-50">
                    {item.icon}<span>{item.label}</span>
                  </button>
                ))}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left text-red-500 hover:bg-red-50">
                  <LogOut size={16} /><span>Logout</span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (same as before) */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-30 bg-white border-r border-gray-200 h-full flex-shrink-0 overflow-y-auto overflow-x-hidden"
            >
              <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
                <h2 className="font-bold text-[#1a365d]">Chat History</h2>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700 p-1 rounded-md"><X size={18} /></button>
              </div>
              <div className="pb-20">
                {loadingHistory && <p className="text-center p-4 text-gray-500">Loading...</p>}
                {!loadingHistory && sessions.length === 0 && <p className="text-center p-4 text-gray-500">No previous chats.</p>}
                {sessions.map(session => (
                  <div key={session.sessionId} className={`p-3 border-b hover:bg-gray-50 transition relative group ${session.sessionId === sessionIdRef.current ? 'bg-blue-50' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1 cursor-pointer" onClick={() => loadSession(session.sessionId, session.messages)}>
                        <div className="flex items-center gap-1">
                          {session.pinned && <Pin size={12} className="text-yellow-500 flex-shrink-0" />}
                          <p className="text-sm font-medium truncate">{session.subject} – {session.topic}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{new Date(session.updatedAt).toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1 truncate">{session.messages[0]?.content?.substring(0, 60)}…</p>
                      </div>
                      <div className="relative">
                        <button onClick={() => setDropdownOpen(dropdownOpen === session.sessionId ? null : session.sessionId)} className="p-1 rounded-full hover:bg-gray-200">⋮</button>
                        {dropdownOpen === session.sessionId && (
                          <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-10">
                            <button onClick={(e) => togglePin(session.sessionId, e)} className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-100">
                              {session.pinned ? <PinOff size={14} /> : <Pin size={14} />}
                              {session.pinned ? 'Unpin' : 'Pin'}
                            </button>
                            <button onClick={(e) => deleteSession(session.sessionId, e)} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 px-4 py-2 border-b border-gray-100 bg-gray-50/30">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors flex-shrink-0"
                title={sidebarOpen ? 'Close history' : 'Open history'}
              >
                {sidebarOpen ? <PanelLeftClose size={24} /> : <PanelLeftOpen size={24} />}
              </button>
              <div className="text-sm text-gray-700 font-medium truncate">
                {subject && topic
                  ? <span>📚 <strong>{subject}</strong> – {topic} {lesson && <span className="ml-2 text-blue-600">📖 {lesson.title}</span>}</span>
                  : <span>💬 Smart Mphunzitsi AI Tutor</span>}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 pb-2">
            <div className="bg-white rounded-2xl shadow-md p-6 min-h-[calc(100%-20px)] flex flex-col max-w-4xl mx-auto w-full">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-3 rounded-2xl max-w-lg text-base break-words ${msg.role === 'user' ? 'bg-[#1a365d] text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {msg.role === 'assistant' ? formatAIResponse(msg.content) : msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-gray-100 flex items-center gap-2">
                    <span className="animate-pulse">●</span><span className="animate-pulse delay-100">●</span><span className="animate-pulse delay-200">●</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area with auto‑expanding textarea and send icon */}
          <div className="flex-shrink-0 p-4 bg-gray-50 pb-6" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}>
            <div className="bg-white rounded-2xl shadow-md p-2 flex gap-2 items-end w-full max-w-4xl mx-auto">
              <button
                onClick={startListening}
                className={`p-2 rounded-full transition-all flex-shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                title={isListening ? 'Tap to cancel' : 'Voice input'}
              >
                <Mic size={20} />
              </button>

              <textarea
                rows={1}
                placeholder={`Ask about ${lesson ? lesson.title : topic || 'your studies'}...`}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#1a365d] text-base resize-none overflow-y-auto"
                style={{ height: 'auto', maxHeight: '150px' }}
              />

              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="bg-[#1a365d] text-white p-3 rounded-lg disabled:opacity-50 flex-shrink-0 hover:bg-[#0a1f44] transition-colors"
                title="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            {isListening && (
              <p className="text-center text-sm text-red-500 mt-2 animate-pulse">🎙 Listening… tap mic to cancel</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;