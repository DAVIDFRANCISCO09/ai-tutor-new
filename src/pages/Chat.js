import React, { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your AI Tutor. What would you like to learn today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
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
          messages: updatedMessages,
          max_tokens: 1024
        })
      });

      const data = await response.json();

      if (data && data.choices && data.choices[0]) {
        const aiMessage = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        setMessages([...updatedMessages, aiMessage]);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AI Tutor</h1>
        <button className="text-gray-600 hover:text-red-500 font-medium">Logout</button>
      </nav>
      <div className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col">
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6 mb-4 overflow-y-auto" style={{ maxHeight: '65vh' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-3 rounded-2xl max-w-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
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
        <div className="bg-white rounded-2xl shadow-md p-4 flex gap-3">
          <input
            type="text"
            placeholder="Ask your AI Tutor anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;