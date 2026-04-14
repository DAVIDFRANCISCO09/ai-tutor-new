import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();

  const { subject, topic } = location.state || { subject: 'General', topic: 'General Knowledge' };

  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I am Smart Mphunzitsi. Today we are studying ${topic} in ${subject}. Feel free to ask me anything about this topic!` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const sessionKey = React.useRef('session_' + Date.now());

  const saveToHistory = (msgs) => {
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const existingIndex = history.findIndex(s => s.id === sessionKey.current);
    const session = {
      id: sessionKey.current,
      subject: subject,
      topic: topic,
      date: new Date().toLocaleString(),
      messages: msgs
    };
    if (existingIndex >= 0) {
      history[existingIndex] = session;
    } else {
      history.push(session);
    }
    localStorage.setItem('chatHistory', JSON.stringify(history));
  };

  const sendMessage = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.REACT_APP_GROQ_API_KEY
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are Smart Mphunzitsi, an intelligent and friendly AI tutor for students in Malawi.

              The student has selected the subject: ${subject}
              The specific topic is: ${topic}

              Your strict rules are:
              - ONLY answer questions related to ${topic} in ${subject}
              - If the student asks about ANY other subject or topic, politely refuse and redirect them back to ${topic} in ${subject}
              - For example if subject is Chemistry and topic is Organic Chemistry, do NOT answer questions about Physics, Math, Biology or any other subject
              - Explain concepts clearly using simple language and examples relevant to Malawian students
              - Break down difficult concepts into small easy steps
              - Ask follow-up questions to check understanding
              - Be patient, encouraging and supportive
              - Celebrate the student's progress
              - Always respond in English only, do not use any Chichewa phrases`
            },
            ...updatedMessages
          ],
          max_tokens: 1024
        })
      });

      const data = await response.json();

      if (data && data.choices && data.choices[0]) {
        const aiMessage = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        const finalMessages = [...updatedMessages, aiMessage];
        setMessages(finalMessages);
        saveToHistory(finalMessages);
      } else if (data.error) {
        setMessages([...updatedMessages, { role: 'assistant', content: 'API Error: ' + data.error.message }]);
      } else {
        setMessages([...updatedMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again!' }]);
      }
    } catch (error) {
      console.log('Error:', error);
      setMessages([...updatedMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again!' }]);
    }

    setLoading(false);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support voice input. Please use Chrome!');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      sendMessage(transcript);
    };

    recognition.onerror = (event) => {
      setListening(false);
      if (event.error === 'no-speech') {
        alert('No speech detected. Please try again!');
      } else if (event.error === 'not-allowed') {
        alert('Microphone permission denied. Please allow microphone access!');
      } else {
        alert('Voice error: ' + event.error);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#001f5b' }}>Smart Mphunzitsi</h1>
          <p className="text-sm text-gray-500">{subject} — {topic}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/history')}
            className="font-medium hover:opacity-75"
            style={{ color: '#001f5b' }}
          >
            History
          </button>
          <button
            onClick={() => navigate(-1)}
            className="font-medium hover:opacity-75"
            style={{ color: '#001f5b' }}
          >
            ← Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-red-500 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col">

        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 mb-4 overflow-y-auto" style={{ maxHeight: '65vh' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`px-4 py-3 rounded-2xl max-w-lg text-sm ${msg.role === 'user' ? 'text-white' : 'bg-gray-100 text-gray-800'}`}
                style={msg.role === 'user' ? { backgroundColor: '#001f5b' } : {}}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 text-sm">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 flex gap-3 items-center">
          <button
            onClick={startListening}
            className={`p-3 rounded-full transition-all ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-7 8a1 1 0 0 1 1 1 6 6 0 0 0 12 0 1 1 0 0 1 2 0 8 8 0 0 1-7 7.94V21h2a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2h2v-1.06A8 8 0 0 1 4 12a1 1 0 0 1 1-1z"/>
            </svg>
          </button>
          <input
            type="text"
            placeholder={`Ask anything about ${topic}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
            style={{ backgroundColor: '#001f5b' }}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chat;