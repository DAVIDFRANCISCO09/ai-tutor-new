import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AI Tutor</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-blue-600 font-medium">Login</button>
          <button onClick={() => navigate('/register')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Your Personal <span className="text-blue-600">AI Tutor</span>
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mb-8">
          Learn anything, anytime. Get instant answers, explanations,
          and personalized help from your AI-powered tutor.
        </p>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700">
            Start Learning
          </button>
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50">
            Learn More
          </button>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose AI Tutor?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">AI Powered</h4>
            <p className="text-gray-500">Get instant answers powered by advanced AI technology.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">📚</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Any Subject</h4>
            <p className="text-gray-500">Math, Science, History, Languages — learn anything you need.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Instant Help</h4>
            <p className="text-gray-500">Available 24/7, get help whenever you need it.</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center py-6">
        <p>2024 AI Tutor. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;