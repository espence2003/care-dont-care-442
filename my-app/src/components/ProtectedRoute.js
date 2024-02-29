// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;



// // src/ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuthState } from './useAuthState'; // You need to implement this based on your app's auth state management

// const ProtectedRoute = ({ children }) => {
//     const { isAuthenticated } = useAuthState(); // Implement this based on your authentication logic

//     if (!isAuthenticated) {
//         return <Navigate to="/login" />;
//     }

//     return children;
// };

// export default ProtectedRoute;

