import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Background image – fixed, covers whole area */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://www.austinmadinga.com/storage/2022/08/Kamuzu-Academy-Sports-Day-2022-05.jpg"
          alt="Malawian students"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10">
        {/* Hero section – takes full viewport height */}
        <div className="h-screen flex flex-col">
          {/* Navbar */}
          <nav className="bg-[#0a1f44]/80 backdrop-blur-sm shadow-md px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Smart Mphunzitsi</h1>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/login')}
                className="text-white hover:text-blue-300 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-[#0a1f44] px-4 py-2 rounded-lg hover:bg-blue-100 transition"
              >
                Get Started
              </button>
            </div>
          </nav>

          {/* Centered hero content */}
          <div className="flex-1 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl mx-auto p-8 rounded-2xl backdrop-blur-md bg-white/20 shadow-xl">
              <h2 className="text-xl md:text-2xl text-white max-w-xl mx-auto mb-8 drop-shadow">
                Smart Mphunzitsi
              </h2>
              <p className="text-xl md:text-2xl text-white max-w-xl mx-auto mb-8 drop-shadow">
                Built for <span className="text-blue-200 font-semibold">Malawi Secondary Education</span>
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    const howItWorks = document.getElementById('how-it-works');
                    if (howItWorks) howItWorks.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-[#0a1f44] transition"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Learn More Section - Platform Essence */}
        <div className="bg-white py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">Your Personal AI Smart Teacher</h3>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                <strong className="text-[#0a1f44]">Smart Mphunzitsi</strong> is an AI-powered learning platform designed specifically for 
                Malawi's secondary school curriculum (Forms 1-4). Our mission is to make quality education accessible to every student, 
                anytime, anywhere.
              </p>
              <p>
                Unlike traditional learning methods, Smart Mphunzitsi adapts to each student's unique learning style like visual, auditory, 
                reading/writing, or kinesthetic. Whether you're preparing for MSCE exams, need help with homework, or want to explore 
                new topics, our AI teacher provides personalized explanations and instant feedback.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-bold text-[#0a1f44] mb-2">🎯 Personalized Learning</h4>
                  <p className="text-sm">Lessons adapt to your preferred learning style and academic level.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-bold text-[#0a1f44] mb-2">📊 Track Progress</h4>
                  <p className="text-sm">Monitor your performance across all subjects and topics.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-bold text-[#0a1f44] mb-2">💬 24/7 AI Support</h4>
                  <p className="text-sm">Ask questions anytime, get instant detailed explanations.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-bold text-[#0a1f44] mb-2">📝 Interactive Quizzes</h4>
                  <p className="text-sm">Test your knowledge and receive instant feedback.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works – Detailed Steps */}
        <div id="how-it-works" className="bg-gray-50 py-16 px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-[#0a1f44] mb-12">
            How It Works
          </h3>
          
          {/* For First-Time Users */}
          <div className="max-w-5xl mx-auto mb-12">
            <h4 className="text-2xl font-bold text-[#0a1f44] mb-6 text-center">🌟 For New Students</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-3">📝</div>
                <h4 className="text-lg font-bold text-[#0a1f44] mb-2">Step 1: Create Account</h4>
                <p className="text-gray-600 text-sm">Sign up with your email, choose your form (Form 1-4), and select your preferred learning style.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-3">📚</div>
                <h4 className="text-lg font-bold text-[#0a1f44] mb-2">Step 2: Choose Subject</h4>
                <p className="text-gray-600 text-sm">Browse subjects (Mathematics, Physics, Biology, Chemistry, English, Agriculture) and select a topic.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-3">🎓</div>
                <h4 className="text-lg font-bold text-[#0a1f44] mb-2">Step 3: Start Learning</h4>
                <p className="text-gray-600 text-sm">Study interactive lessons with video, visual aids, or reading materials based on your style.</p>
              </div>
            </div>
          </div>

          {/* For Returning Users */}
          <div className="max-w-5xl mx-auto mb-12">
            <h4 className="text-2xl font-bold text-[#0a1f44] mb-6 text-center">🔄 For Returning Students</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-3">💬</div>
                <h4 className="text-lg font-bold text-[#0a1f44] mb-2">AI Chat Assistant</h4>
                <p className="text-gray-600 text-sm">Ask the AI teacher any question about your current lesson – get instant, detailed answers.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-3">📊</div>
                <h4 className="text-lg font-bold text-[#0a1f44] mb-2">Track Progress</h4>
                <p className="text-gray-600 text-sm">View completed lessons, quiz scores, and overall mastery percentage for each subject.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-3">📝</div>
                <h4 className="text-lg font-bold text-[#0a1f44] mb-2">Take Quizzes</h4>
                <p className="text-gray-600 text-sm">After each lesson, test your knowledge with AI-generated quizzes and track your scores.</p>
              </div>
            </div>
          </div>

          {/* Quiz Explanation Section 
          <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">📝✨</div>
              <h4 className="text-2xl font-bold text-[#0a1f44] mb-3">Smart Quizzes That Adapt to You</h4>
              <div className="w-20 h-0.5 bg-blue-500 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                After completing any lesson, <strong>Smart Mphunzitsi</strong> generates a <strong>custom 5-question quiz</strong> 
                based on the exact content you just studied. Questions include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Multiple-choice questions with <span className="font-semibold">real-time feedback</span></li>
                <li><span className="font-semibold">Instant explanations</span> for both correct and incorrect answers</li>
                <li><span className="font-semibold">Progress tracking</span> – each quiz score saves to your profile</li>
                <li><span className="font-semibold">Retake option</span> – practice until you master the topic</li>
              </ul>
              <p className="mt-4">
                Your quiz performance contributes to your overall subject mastery score, helping you identify areas that need more attention.
              </p>
              <div className="bg-white/70 rounded-lg p-4 mt-3 text-center">
                <p className="font-semibold text-[#0a1f44]">💡 Example Quiz Question:</p>
                <p className="text-sm italic mt-1">"What is the capital city of Malawi?"</p>
                <p className="text-xs text-gray-500 mt-1">You'll get options, instant feedback, and an explanation of the correct answer!</p>
              </div>
            </div>
          </div>*/}
        </div>

        {/* Call to Action */}
        <div className="bg-[#0a1f44] text-white py-16 px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-lg mb-8 opacity-90">Join thousands of Malawian students using Smart Mphunzitsi to excel in their studies.</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-[#0a1f44] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition"
            >
              Login
            </button>
          </div>
        </div>

        {/* Modern Footer */}
        <footer className="bg-[#0a1f44] text-white py-6 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Smart Mphunzitsi</h3>
              <p className="text-sm text-gray-300">AI-powered learning for Malawi's future.</p>
            </div>
            {/* <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><button onClick={() => navigate('/')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => navigate('/login')} className="hover:text-white">Login</button></li>
                <li><button onClick={() => navigate('/register')} className="hover:text-white">Register</button></li>
              </ul>
            </div> */}
            {/* <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Malawi Curriculum</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div> */}
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-sm text-gray-300">support@smartmphunzitsi.mw</p>
            </div>
          </div>
          <div className="text-center text-gray-400 text-xs mt-6 border-t border-gray-700 pt-3">
            © 2026 Smart Mphunzitsi. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;