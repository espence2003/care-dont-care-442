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

// // eslint-disable-next-line
// import React, { useState } from 'react';
// // eslint-disable-next-line
// import { Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     <div>
//       <header>
//         442 APP
//       </header>
//     </div>
//   );
// }

export default App;
