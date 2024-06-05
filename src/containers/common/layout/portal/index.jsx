import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Box, useTheme, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// styles
import styles from 'styles/portal/layout/dashboard.module.scss';

// assets
import navLogoImg from 'assets/nav-logo.svg';
import notificationImg from 'assets/notificationImg.svg';

// shared
import Navbar from './Navbar';
import SideBarMenu from './SideBarMenu';

function PortalLayout() {
  const { isAuthenticated, userInfo } = useSelector(state => state.auth);

  const { pathname } = useLocation();

  const isProfileSetting = pathname.includes('/profile-setting');

  const theme = useTheme();
  const themeColors = theme.palette;
  const darkPurple = themeColors.darkPurple.main;
  const darkBlue = themeColors.darkBlue.main;
  const isClientDashboard = userInfo?.is_buyer;

  const profileCompleted = userInfo?.is_profile_completed;
  const bgColor = isClientDashboard ? darkPurple : darkBlue;

  return (
    <>
      <Navbar
        logoImg={navLogoImg}
        bgColor={bgColor}
        notificationImg={notificationImg}
        isClientDashboard={isClientDashboard}
      />

      <Box className="d-flex">

        <Box className={styles.sidebarContainer}>
          <SideBarMenu bgColor={bgColor} isClientDashboard={isClientDashboard} />
        </Box>

        <Box className={styles.dashboardContainer}>
          {!isProfileSetting && isAuthenticated && !profileCompleted && (
            <Box className={`${styles.profileCompleteAlert} text-center py-2 px-3`}>
              <Typography variant="body2">
                Your account has been verified!{' '}
                <Link
                  to={
                    isClientDashboard
                      ? '/portal/client/profile-setting'
                      : '/portal/freelancer/profile-setting'
                  }
                >
                  Please complete your profile.
                </Link>
              </Typography>
            </Box>
          )}
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default PortalLayout;
