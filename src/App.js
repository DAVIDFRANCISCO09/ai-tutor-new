
// import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ForgotPassword from './pages/ForgotPassword';
// import {Dash} from './dashboard/Dash';
// import { LessonPage} from './dashboard/LessonPage';
// import { useState } from 'react';



// // Wrapper to handle Dashboard state and navigation
// function DashboardWrapper() {
//   const navigate = useNavigate();
//   const [selectionStep, setSelectionStep] = useState('subject');
//   const [selectedSubject, setSelectedSubject] = useState(null);

//   return (
//     <Dash
//       onStartLearning={(topic) => navigate('/lesson-page', { state: { topic}})}
//        onStartAILearning={() => console.log('start AI learning')}
//       onNavigate={(path) => navigate(path)}
//       onLogout={() => navigate('/login')}
//       level="JCE"         // replace with real user data later
//       form="Form 3"       // replace with real user data later
//       selectionStep={selectionStep}
//       setSelectionStep={setSelectionStep}
//       selectedSubject={selectedSubject}
//       setSelectedSubject={setSelectedSubject}
//     />
//   );
// }

// function LessonWrapper() {
//   const navigate = useNavigate();
//   const {state}= useLocation(); // gets the topic passed from dashboard

//   return (
//     <LessonPage
//       topic={state?.topic || 'Numbers'} // fallback to 'Numbers' if no topic
//       onBack={() => navigate('/dash')}
//       onStartChat={() => console.log('start chat')}
//       onStartQuiz={() => console.log('start quiz')}
//     />
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/dash" element={<DashboardWrapper/>}/>
//         <Route path="/lesson/ :topic" element={<LessonWrapper />} />
        

        
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dash } from './dashboard/Dash';
import { LessonPage } from './dashboard/LessonPage';
import { SetupPage } from './dashboard/SetupPage';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [level, setLevel] = useState(() => localStorage.getItem('userLevel'));
  const [form, setForm] = useState(() => localStorage.getItem('userForm'));
  const [selectionStep, setSelectionStep] = useState('subject');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentTopic, setCurrentTopic] = useState('');

  const handleSetupComplete = (l, f) => {
    setLevel(l);
    setForm(f);
    localStorage.setItem('userLevel', l);
    localStorage.setItem('userForm', f);
  };

  const handleStartLearning = (topic) => {
    setCurrentTopic(topic);
    setView('lesson');
  };

  const handleNavigate = (page) => {
    // Navigation logic for other pages if needed
  };

  const handleLogout = () => {
    localStorage.removeItem('userLevel');
    localStorage.removeItem('userForm');
    setLevel(null);
    setForm(null);
    setView('dashboard');
    setSelectionStep('subject');
    setSelectedSubject(null);
  };

  if (!level || !form) {
    return <SetupPage onComplete={handleSetupComplete} />;
  }

  return (
    <AnimatePresence mode="wait">
      {view === 'lesson' ? (
        <motion.div
          key="lesson-view"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          <LessonPage
            topic={currentTopic}
            level={level}
            form={form}
            subject={selectedSubject}
            onBack={() => setView('dashboard')}
          />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard-view"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          <Dash
            level={level}
            form={form}
            selectionStep={selectionStep}
            setSelectionStep={setSelectionStep}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            onStartLearning={handleStartLearning}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
