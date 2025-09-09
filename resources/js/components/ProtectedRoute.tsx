import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingPage } from '../components/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Check if we have a token in localStorage (even if not validated yet)
  const hasStoredToken = !!localStorage.getItem('auth_token');

  if (isLoading) {
    return <LoadingPage message="Loading..." />;
  }

  // Only redirect if definitely not authenticated AND no token in storage
  if (!isAuthenticated && !hasStoredToken) {
    // Go to home page instead of login
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
