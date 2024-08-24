import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Homepage';
import AdminLogin from './components/AdminLogin';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import Enable2FA from './components/Enable2FA';
import Verify2FA from './components/Verify2FA';
import Register from './components/Register';
import UserLanding from './components/UserLanding';
import AdminLanding from './components/AdminLanding';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/setup-2fa" element={<Enable2FA />} />
        <Route path="/verify-2fa" element={<Verify2FA />}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user-landing" element={<UserLanding />} />
        <Route path="/admin-landing" element={<AdminLanding />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
