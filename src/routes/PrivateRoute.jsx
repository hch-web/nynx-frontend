import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute() {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default PrivateRoute;
