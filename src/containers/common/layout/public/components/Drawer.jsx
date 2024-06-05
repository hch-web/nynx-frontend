import React from 'react';
import { Box, useTheme, List, Typography, Divider } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { Close, Search } from '@mui/icons-material';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// UTILITIES & CUSTOM HOOKS
import { useSwitchUserMutation } from 'services/private/user';
import useAuth from 'custom-hooks/useAuth';
import {
  closeIconButtonStyles,
  drawerContainerBoxStyles,
  muiDrawerStyles,
} from 'styles/mui/components/navbar-drawer-styles';
import styles from 'styles/public-pages/layout/navbar.module.scss';
import {
  contactUsRoute,
  findServiceRoute,
  userProfileRoute,
  homeRoute,
  howItWorksFreelancerRoute,
  loginRoute,
  portalRouteClient,
  portalRouteFreelancer,
  profileSettingRoute,
  signupRoute,
  whyRoute,
} from 'utilities/routing-links';
import { updateUserInfo } from 'store/slices/authSlice';
import DrawerListItem from './DrawerListItem';

function Drawer({ showNavbar, handleShowNavbar }) {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { handleLogout } = useAuth();

  const darkPurpleContrast = palette.darkPurple.textContrast;
  const yellow = palette.yellow.main;

  const { isAuthenticated, userInfo } = useSelector(state => state.auth);
  const isBuyer = userInfo?.is_buyer;
  const [switchUser] = useSwitchUserMutation();

  const handleSwitchUser = async () => {
    const switchUserResp = await switchUser(!isBuyer);

    dispatch(updateUserInfo(switchUserResp.data));
  };

  return (
    <MuiDrawer anchor="left" open={showNavbar} onClose={handleShowNavbar} sx={muiDrawerStyles}>
      <Box
        sx={{ ...drawerContainerBoxStyles, color: darkPurpleContrast }}
        className="p-3 position-relative"
        role="presentation"
      >
        <Box className="d-flex align-items-center justify-content-between justify-content-md-end w-100">
          <div className={`${styles.drawerSearchFieldBox} d-block d-lg-none`}>
            <Search className={`${styles.searchIconLight}`} />

            <input
              placeholder="Search"
              type="text"
              className={`${styles.drawerSearchFieldLight} ${styles.drawerSearchField}`}
            />
          </div>

          <Close sx={closeIconButtonStyles} className="ms-2" onClick={handleShowNavbar} />
        </Box>

        <List onClick={handleShowNavbar}>
          {!isAuthenticated && (
            <>
              <DrawerListItem path={signupRoute} label="Join NYNX" />

              <DrawerListItem path={loginRoute} label="Login" />
            </>
          )}

          <DrawerListItem path={homeRoute} label="Home" />

          <DrawerListItem path={findServiceRoute} label="Find Service" />

          <DrawerListItem path={howItWorksFreelancerRoute} label="Become an Expert" />

          <DrawerListItem path={whyRoute} label="Why" />

          <DrawerListItem path="/freelancer/buyer-request" label="Client Request" />
        </List>

        <Typography variant="overline" color={yellow}>
          General
        </Typography>

        <Divider />

        {/* PRIVATE ROUTE LISTING */}
        {isAuthenticated && (
          <List onClick={handleShowNavbar}>
            <DrawerListItem path={`${userProfileRoute}/${userInfo?.id}`} label="Profile" />

            <DrawerListItem
              path={isBuyer ? `${portalRouteClient}/dashboard` : `${portalRouteFreelancer}/dashboard`}
              label="Dashboard"
            />

            {isBuyer && <DrawerListItem path="/portal/client/workspace/create" label="Post A Job" />}

            <DrawerListItem
              path="/"
              label={isBuyer ? 'Switch to Selling' : 'Switch to Buying'}
              handleClick={handleSwitchUser}
            />

            <DrawerListItem path={contactUsRoute} label="Help & Support" />

            <DrawerListItem
              path={
                isBuyer
                  ? `${portalRouteClient}${profileSettingRoute}`
                  : `${portalRouteFreelancer}${profileSettingRoute}`
              }
              label="Settings"
            />

            <DrawerListItem label="Logout" handleClick={handleLogout} />
          </List>
        )}
      </Box>
    </MuiDrawer>
  );
}

Drawer.propTypes = {
  showNavbar: propTypes.bool.isRequired,
  handleShowNavbar: propTypes.func.isRequired,
};

export default Drawer;
