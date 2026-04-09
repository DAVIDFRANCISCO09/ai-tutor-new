import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#eef3fb]">

      {/* NAVBAR */}
      <nav className="bg-[#0a1f44] shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Smart Mphunzitsi</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-white hover:text-blue-300 font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-[#0a1f44] px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        style={{ minHeight: '100vh' }}
        className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 bg-[#eef3fb] gap-10"
      >

        {/* LEFT TEXT */}
        <div className="flex-1">
          <h2 className="text-5xl font-bold text-[#0a1f44] mb-6 leading-tight">
            Built for <span className="text-[#1a2f5a]">Malawi Secondary Education</span>
          </h2>

          <p className="text-xl text-[#1a2f5a] max-w-xl mb-8">
            Learn anytime, anywhere. Get instant answers, explanations,
            and personalized help from your AI-powered teacher.
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <button
              onClick={() =>
                document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })
              }
              className="border border-[#0a1f44] text-[#0a1f44] px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#dbe6f7]"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/students.jpg"
            alt="Malawian secondary school students learning"
            className="rounded-2xl shadow-lg max-w-md w-full"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-8 bg-white">
        <h3 className="text-3xl font-bold text-center text-[#0a1f44] mb-12">
          How It Works?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-[#eef3fb] p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">1️⃣</div>
            <h4 className="text-xl font-bold text-[#0a1f44] mb-2">Create Account</h4>
            <p className="text-[#1a2f5a]">
              Sign up for free and set up your personal profile.
            </p>
          </div>

          <div className="bg-[#eef3fb] p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">2️⃣</div>
            <h4 className="text-xl font-bold text-[#0a1f44] mb-2">Ask Questions</h4>
            <p className="text-[#1a2f5a]">
              Type any question and get instant AI powered answers.
            </p>
          </div>

          <div className="bg-[#eef3fb] p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">3️⃣</div>
            <h4 className="text-xl font-bold text-[#0a1f44] mb-2">Learn and Grow</h4>
            <p className="text-[#1a2f5a]">
              Track your progress and improve your knowledge every day.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a1f44] text-white text-center py-6">
        <p>© 2026 Smart Mphunzitsi. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default LandingPage;