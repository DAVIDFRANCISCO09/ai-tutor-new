import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userForm', userData.form);
        localStorage.setItem('learningStyle', userData.learningStyle);
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
          <img src="https://www.austinmadinga.com/storage/2022/08/Kamuzu-Academy-Sports-Day-2022-05.jpg" alt="Malawian Secondary Students" className="w-full h-32 object-cover" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0a1f44] mb-2">Smart Mphunzitsi</h2>
        <p className="text-center text-gray-500 mb-8">Login to your account</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#0a1f44] font-medium mb-2">Email</label>
    <input
  type="email"
  placeholder="Chifundo@gmail.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  autoComplete="off"          // ← add this
  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
  required
/>
          </div>
          <div className="mb-2">
            <label className="block text-[#0a1f44] font-medium mb-2">Password</label>
            <div className="relative">
              
             <input
  type={showPassword ? 'text' : 'password'}
  placeholder="********"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  autoComplete="new-password"   // ← add this
  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
  required/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-[#0a1f44]">{showPassword ? '🙈' : '👁️'}</button>
            </div>
          </div>
          <div className="flex justify-end mb-6">
            <span onClick={() => navigate('/forgot-password')} className="text-[#0a1f44] text-sm cursor-pointer hover:underline">Forgot Password?</span>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#0a1f44] text-white py-3 rounded-lg font-medium hover:bg-[#1a2f5a] disabled:opacity-50">{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="text-center text-gray-500 mt-6">Don't have an account? <span onClick={() => navigate('/register')} className="text-[#0a1f44] cursor-pointer hover:underline">Register</span></p>
      </div>
    </div>
  );
}

export default Login;