import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">AI Tutor</h2>
        <p className="text-center text-gray-500 mb-8">Login to your account</p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <span
            onClick={() => navigate('/forgot-password')}
            className="text-blue-600 text-sm cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="text-blue-600 cursor-pointer hover:underline">Register</span>
        </p>

      </div>
    </div>
  );
}

export default Login;