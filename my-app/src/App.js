import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import NavBar from './components/NavBar'; // Adjust the path as necessary
import ProfilePage from './components/ProfilePage'; // Create this component
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;