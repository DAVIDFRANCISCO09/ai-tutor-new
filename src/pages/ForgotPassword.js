import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    alert('Password reset link sent to your email!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-2">AI Tutor</h2>
        <p className="text-center text-gray-500 mb-8">Reset your password</p>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Send Reset Link
        </button>

        <p className="text-center text-gray-500 mt-6">
          Remember your password?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-600 cursor-pointer hover:underline">Login</span>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;