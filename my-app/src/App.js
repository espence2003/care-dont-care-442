import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="home" element={<HomePage />} />
    </Routes>
  );
}

export default App;