/* eslint-disable no-nested-ternary */
import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import PublicLayout from './public';
import PortalLayout from './portal';

function GeneralLayout() {
  const { pathname } = useLocation();

  const auth = pathname.includes('/auth');
  const portalLayout = pathname.includes('/portal');

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{auth ? <Outlet /> : portalLayout ? <PortalLayout /> : <PublicLayout />}</>;
}

export default GeneralLayout;
