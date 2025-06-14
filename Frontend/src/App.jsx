import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AppLayout from './components/Layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import SettingPage from './pages/SettingPage';



function App() {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("userProfile") || "{}")
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
