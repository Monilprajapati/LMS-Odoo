import React from 'react'
import { useUserContext } from '../contexts/userContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const { isAuth, userRole } = useUserContext();

  if (!isAuth)
    return <Navigate to="/login" />;

  if (userRole !== role)
    return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute
