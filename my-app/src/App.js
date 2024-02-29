import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        {/* Redirect users to login if they try to access the root URL */}
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;


// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Login from './components/LoginPage';
// import NavBar from './components/NavBar'; // Adjust the path as necessary
// import ProfilePage from './components/ProfilePage'; // Create this component
// import HomePage from './components/HomePage';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div>
//       <NavBar />
//       <Routes>
//         <Route path="" element={<Login />} />
//         <Route path="home" element={<HomePage />} />
//         <Route path="profile" element={<ProfilePage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;