// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [form, setForm] = useState('Form 1');
//   const [learningStyle, setLearningStyle] = useState('visual');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validateEmail = (email) => /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
//   const isStrongPassword = (pwd) => pwd.length >= 8;

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validateEmail(email))
//       return setError('Please enter a valid email address (e.g., name@example.com)');

//     if (!isStrongPassword(password))
//       return setError('Password must be at least 8 characters long');

//     if (password !== confirmPassword)
//       return setError('Passwords do not match');

//     setLoading(true);
//     try {
//       const response = await api.post('/auth/register', { name, email, password, form, learningStyle });
//       if (response.data.success) {
//         const { token, ...userData } = response.data.data;
//         localStorage.setItem('token', token);
//         localStorage.setItem('userName', userData.name);
//         localStorage.setItem('userForm', userData.form);
//         localStorage.setItem('learningStyle', userData.learningStyle);
//         navigate('/dashboard');
//       } else {
//         setError(response.data.message || 'Registration failed');
//       }
//     } catch (err) {
//       const data = err.response?.data;
//       let errorMsg = 'Registration failed. Email might already exist.';
//       if (data?.errors && data.errors.length > 0) {
//         errorMsg = data.errors[0].msg;
//       } else if (data?.message) {
//         errorMsg = data.message;
//       }
//       setError(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center p-4">
//       <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md">
//         <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
//           <img
//             src="https://www.austinmadinga.com/storage/2022/08/Kamuzu-Academy-Sports-Day-2022-05.jpg"
//             alt="Malawian Secondary Students"
//             className="w-full h-32 object-cover"
//           />
//         </div>
//         <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0a1f44] mb-2">Smart Mphunzitsi</h2>
//         <p className="text-center text-gray-500 mb-8">Create your account</p>

//         <form onSubmit={handleRegister}>
//           {/* Full Name */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-[#0a1f44] font-medium mb-2">
//               Full Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Chifundo Banda"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               autoComplete="name"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-[#0a1f44] font-medium mb-2">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="chifundo@gmail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="email"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
//               required
//             />
//           </div>

//           {/* Form */}
//           <div className="mb-4">
//             <label htmlFor="form" className="block text-[#0a1f44] font-medium mb-2">
//               Form
//             </label>
//             <select
//               id="form"
//               name="form"
//               value={form}
//               onChange={(e) => setForm(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
//             >
//               <option>Form 1</option>
//               <option>Form 2</option>
//               <option>Form 3</option>
//               <option>Form 4</option>
//             </select>
//           </div>

//           {/* Learning Style */}
//           <div className="mb-4">
//             <label htmlFor="learningStyle" className="block text-[#0a1f44] font-medium mb-2">
//               Learning Style
//             </label>
//             <select
//               id="learningStyle"
//               name="learningStyle"
//               value={learningStyle}
//               onChange={(e) => setLearningStyle(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
//             >
//               <option value="visual">Visual (learn by seeing)</option>
//               <option value="auditory">Auditory (learn by listening)</option>
//               <option value="reading">Reading/Writing</option>
//               <option value="kinesthetic">Kinesthetic (hands-on)</option>
//             </select>
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-[#0a1f44] font-medium mb-2">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="new-password"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
//               required
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Password must be at least 8 characters (any letters, numbers, or symbols allowed)
//             </p>
//           </div>

//           {/* Confirm Password */}
//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-[#0a1f44] font-medium mb-2">
//               Confirm Password
//             </label>
//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               placeholder="********"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               autoComplete="new-password"
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#0a1f44] text-white py-3 rounded-lg font-medium hover:bg-[#1a2f5a] disabled:opacity-50"
//           >
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
//         </form>

//         {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//         <p className="text-center text-gray-500 mt-6">
//           Already have an account?{' '}
//           <button
//             type="button"
//             onClick={() => navigate('/login')}
//             className="text-[#0a1f44] cursor-pointer hover:underline ml-1"
//           >
//             Login
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [form, setForm] = useState('Form 1');
  const [learningStyle, setLearningStyle] = useState('visual');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
  const isStrongPassword = (pwd) => pwd.length >= 8;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email))
      return setError('Please enter a valid email address (e.g., name@example.com)');

    if (!isStrongPassword(password))
      return setError('Password must be at least 8 characters long');

    if (password !== confirmPassword)
      return setError('Passwords do not match');

    setLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password, form, learningStyle });
      if (response.data.success) {
        const { token, ...userData } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userForm', userData.form);
        localStorage.setItem('learningStyle', userData.learningStyle);
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      const data = err.response?.data;
      let errorMsg = 'Registration failed. Email might already exist.';
      if (data?.errors && data.errors.length > 0) {
        errorMsg = data.errors[0].msg;
      } else if (data?.message) {
        errorMsg = data.message;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
          <img
            src="https://www.austinmadinga.com/storage/2022/08/Kamuzu-Academy-Sports-Day-2022-05.jpg"
            alt="Malawian Secondary Students"
            className="w-full h-32 object-cover"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0a1f44] mb-2">Smart Mphunzitsi</h2>
        <p className="text-center text-gray-500 mb-8">Create your account</p>

        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#0a1f44] font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Chifundo Banda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#0a1f44] font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="chifundo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
              required
            />
          </div>

          {/* Form */}
          <div className="mb-4">
            <label htmlFor="form" className="block text-[#0a1f44] font-medium mb-2">
              Form
            </label>
            <select
              id="form"
              name="form"
              value={form}
              onChange={(e) => setForm(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
            >
              <option>Form 1</option>
              <option>Form 2</option>
              <option>Form 3</option>
              <option>Form 4</option>
            </select>
          </div>

          {/* Learning Style */}
          <div className="mb-4">
            <label htmlFor="learningStyle" className="block text-[#0a1f44] font-medium mb-2">
              Learning Style
            </label>
            <select
              id="learningStyle"
              name="learningStyle"
              value={learningStyle}
              onChange={(e) => setLearningStyle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
            >
              <option value="visual">Visual (learn by seeing)</option>
              <option value="auditory">Auditory (learn by listening)</option>
              <option value="reading">Reading/Writing</option>
              <option value="kinesthetic">Kinesthetic (hands-on)</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-[#0a1f44] font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters (any letters, numbers, or symbols allowed)
            </p>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-[#0a1f44] font-medium mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-[#0a1f44]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0a1f44] text-white py-3 rounded-lg font-medium hover:bg-[#1a2f5a] disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-[#0a1f44] cursor-pointer hover:underline ml-1"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;