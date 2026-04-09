import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        {/* Banner Image */}
        <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
          <img
            src="/images/students.jpg"
            alt="Malawian Secondary Students"
            className="w-full h-32 object-cover"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-[#0a1f44] mb-2">
          Smart Mphunzitsi
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Create your account
        </p>

        <div className="mb-4">
          <label className="block text-[#0a1f44] font-medium mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#0a1f44] font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#0a1f44] font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#0a1f44] font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-[#0a1f44] text-white py-3 rounded-lg font-medium hover:bg-[#1a2f5a]"
        >
          Create Account
        </button>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#0a1f44] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;