import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GigRoute() {
  const { pathname } = useLocation();
  const { isAuthenticated, userInfo } = useSelector(state => state.auth);

  return isAuthenticated && !userInfo?.is_buyer ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: pathname }} replace />
  );
}

export default GigRoute;
