import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CheckoutRoute() {
  const { pathname, state: URLState } = useLocation();
  const { isAuthenticated, userInfo } = useSelector(state => state.auth);

  return isAuthenticated && userInfo?.is_buyer && URLState?.checkoutState ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: pathname }} replace />
  );
}

export default CheckoutRoute;
