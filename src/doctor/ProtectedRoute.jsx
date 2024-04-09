// ProtectedRoute.jsx

import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    console.log(`${children}`)

    return isAuthenticated ? (
        // <>{children}</>
        <Navigate to="/" replace />


    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
