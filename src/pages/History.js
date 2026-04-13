import React from 'react';
import { useNavigate } from 'react-router-dom';

function History() {
  const navigate = useNavigate();
  const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/chat')}
            className="font-medium hover:opacity-75"
            style={{ color: '#001f5b' }}
          >
            ← Back to Chat
          </button>
          <h1 className="text-2xl font-bold" style={{ color: '#001f5b' }}>Smart Mphunzitsi</h1>
        </div>
        <button onClick={() => navigate('/')} className="text-gray-600 hover:text-red-500 font-medium">Logout</button>
      </nav>

      <div className="max-w-3xl w-full mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Chat History</h2>

        {chatHistory.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-gray-500 text-lg">No chat history yet!</p>
            <p className="text-gray-400 mt-2">Start a conversation with Smart Mphunzitsi</p>
            <button
              onClick={() => navigate('/chat')}
              className="mt-6 text-white px-6 py-3 rounded-lg font-medium hover:opacity-75"
              style={{ backgroundColor: '#001f5b' }}
            >
              Start Chatting
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {chatHistory.map((session, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800">Session {index + 1}</h3>
                  <p className="text-gray-400 text-sm">{session.date}</p>
                </div>
                {session.messages.map((msg, msgIndex) => (
                  <div key={msgIndex} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-lg text-sm ${msg.role === 'user' ? 'text-white' : 'bg-gray-100 text-gray-800'}`}
                      style={msg.role === 'user' ? { backgroundColor: '#001f5b' } : {}}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;