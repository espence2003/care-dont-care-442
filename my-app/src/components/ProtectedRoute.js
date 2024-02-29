// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from './useAuthState'; // You need to implement this based on your app's auth state management

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthState(); // Implement this based on your authentication logic

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;

