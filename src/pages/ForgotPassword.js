import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0a1f44] mb-2">Smart Mphunzitsi</h2>
        <p className="text-center text-gray-500 mb-8">Reset your password</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-[#0a1f44] font-medium mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0a1f44] text-white py-3 rounded-lg font-medium hover:bg-[#1a2f5a] disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="text-center text-gray-500 mt-6">
          Remember your password?{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-[#0a1f44] cursor-pointer hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;