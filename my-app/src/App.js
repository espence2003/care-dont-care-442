import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;