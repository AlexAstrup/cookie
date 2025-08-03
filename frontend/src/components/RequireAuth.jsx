import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const token = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!token) {
    // not logged in → send to /signin, preserve where we were
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
