import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    if (user.role === 'farmer') return <Navigate to="/dashboard/farmer" replace />;
    if (user.role === 'buyer') return <Navigate to="/dashboard/buyer" replace />;
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
