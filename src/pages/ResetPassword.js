import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Updated: any password with at least 8 characters
  const isStrongPassword = (pwd) => pwd.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    // ✅ Updated error message
    if (!isStrongPassword(password)) {
      return setError('Password must be at least 8 characters long');
    }
    if (password !== confirmPassword) return setError('Passwords do not match');
    
    setLoading(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setMessage('Password reset successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0a1f44] mb-2">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#0a1f44] font-medium mb-2">New Password</label>
            <input 
              type="password" 
              placeholder="New password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg" 
              required 
            />
            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters (any letters, numbers, or symbols allowed)</p>
          </div>
          <div className="mb-6">
            <label className="block text-[#0a1f44] font-medium mb-2">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="Confirm new password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg" 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#0a1f44] text-white py-3 rounded-lg font-medium hover:bg-[#1a2f5a] disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;