import React from 'react'
import { useAuth } from '../hooks/useAuth.js';
import { Navigate } from 'react-router';
import { PageLoader } from './LoadingPage.jsx';

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if(loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/dashboard"/>;
  }

  return children;
}

export default Protected
