import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
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
          Login to your account
        </p>

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

        <div className="mb-2">
          <label className="block text-[#0a1f44] font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-[#0a1f44]"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <span
            onClick={() => navigate('/forgot-password')}
            className="text-[#0a1f44] text-sm cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#0a1f44] text-white py-3 rounded-lg font-medium hover:bg-[#1a2f5a]"
        >
          Login
        </button>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-[#0a1f44] cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;