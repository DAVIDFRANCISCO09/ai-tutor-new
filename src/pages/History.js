import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function History() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/chat/history');
        setSessions(res.data.data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchHistory();
  }, []);

  const deleteSession = async (sessionId) => {
    if (window.confirm('Delete this chat session?')) {
      try {
        await api.delete(`/chat/history/${sessionId}`);
        setSessions(sessions.filter(s => s.sessionId !== sessionId));
      } catch (err) { alert('Failed to delete'); }
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <header className="bg-white shadow-md px-5 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#1a365d] hover:bg-gray-100 p-2 rounded-lg">← Back</button>
          <button onClick={() => navigate('/dashboard')} className="text-[#1a365d] font-semibold hover:bg-gray-100 px-2 py-1 rounded">Dashboard</button>
          <button onClick={() => navigate('/chat')} className="text-[#1a365d] font-semibold hover:bg-gray-100 px-2 py-1 rounded">New Chat</button>
        </div>
        <h1 className="text-lg font-black text-[#1a365d] uppercase">Smart Mphunzitsi</h1>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition">Logout</button>
      </header>

      <div className="max-w-3xl w-full mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Chat History</h2>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {!loading && sessions.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-gray-500 text-lg">No chat history yet!</p>
            <button onClick={() => navigate('/chat')} className="mt-6 bg-[#1a365d] text-white px-6 py-3 rounded-lg">Start Chatting</button>
          </div>
        )}
        {!loading && sessions.length > 0 && (
          <div className="flex flex-col gap-4">
            {sessions.map((session, idx) => (
              <div key={session.sessionId} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <h3 className="font-bold text-gray-800">Session {idx + 1}</h3>
                  <p className="text-gray-400 text-sm">{new Date(session.createdAt).toLocaleString()}</p>
                  <button onClick={() => deleteSession(session.sessionId)} className="text-red-500 text-sm hover:underline">Delete</button>
                </div>
                {session.messages.slice(-3).map((msg, msgIdx) => (
                  <div key={msgIdx} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-2xl max-w-lg text-sm break-words ${msg.role === 'user' ? 'bg-[#1a365d] text-white' : 'bg-gray-100 text-gray-800'}`}>
                      {msg.content.substring(0, 100)}{msg.content.length > 100 ? '…' : ''}
                    </div>
                  </div>
                ))}
                {session.messages.length > 3 && <p className="text-xs text-gray-400 mt-2">+ {session.messages.length - 3} more messages</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;