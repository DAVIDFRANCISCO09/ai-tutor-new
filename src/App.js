


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

import { Dash }       from './dashboard/Dash';
import { SetupPage }  from './dashboard/SetupPage';
import { LessonPage } from './dashboard/LessonPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                       element={<Home />} />
        <Route path="/login"                  element={<Login />} />
        <Route path="/register"               element={<Register />} />
        <Route path="/forgot-password"        element={<ForgotPassword />} />
       
        <Route path="/dash"              element={<Dash />} />
        <Route path="/setup"                  element={<SetupPage />} />
        <Route path="/lesson/:subject/:topic" element={<LessonPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

