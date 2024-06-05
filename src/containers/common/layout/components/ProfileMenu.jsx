import React from 'react';
import { useTheme, Box, Typography, Menu, MenuItem, CircularProgress, Backdrop } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import propTypes from 'prop-types';

// CUSTOM HOOKS
import useAuth from 'custom-hooks/useAuth';

// STYLES
import { listItemButtonStyles } from 'styles/mui/public-pages/layout/navbar-styles';

// UTILITIES
import {
  portalRouteClient,
  portalRouteFreelancer,
  profileSettingRoute,
  userProfileRoute,
} from 'utilities/routing-links';
import useHandleHelpAndSupport from 'custom-hooks/useHandleHelpAndSupport';

function ProfileMenu({ anchorEl, handleClose }) {
  const theme = useTheme();
  const { handleLogout } = useAuth();
  const { handler, isLoading } = useHandleHelpAndSupport();

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { userInfo } = useSelector(item => item.auth);

  // CONSTANTS
  const settingsRoute = `${
    userInfo?.is_buyer ? portalRouteClient : portalRouteFreelancer
  }${profileSettingRoute}`;

  return (
    <Box>
      <Menu
        key={anchorEl}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NavLink to={`${userProfileRoute}/${userInfo?.id}`} className="resetLink">
          {({ isActive }) => (
            <MenuItem sx={listItemButtonStyles} onClick={handleClose}>
              <Typography sx={{ color: isActive ? '#F1416C' : darkPurple }} variant="body1">
                Profile
              </Typography>
            </MenuItem>
          )}
        </NavLink>

        <NavLink
          to={userInfo?.is_buyer ? `${portalRouteClient}/dashboard` : `${portalRouteFreelancer}/dashboard`}
          className="resetLink"
        >
          {({ isActive }) => (
            <MenuItem sx={listItemButtonStyles} onClick={handleClose}>
              <Typography sx={{ color: isActive ? '#F1416C' : darkPurple }} variant="body1">
                Dashboard
              </Typography>
            </MenuItem>
          )}
        </NavLink>

        {!userInfo?.is_buyer && (
          <NavLink to="/freelancer/submitted-proposals" className="resetLink">
            {({ isActive }) => (
              <MenuItem sx={listItemButtonStyles} onClick={handleClose}>
                <Typography sx={{ color: isActive ? '#F1416C' : darkPurple }} variant="body1">
                  All Proposals
                </Typography>
              </MenuItem>
            )}
          </NavLink>
        )}

        <NavLink to={settingsRoute} className="resetLink">
          {({ isActive }) => (
            <MenuItem sx={listItemButtonStyles} onClick={handleClose}>
              <Typography sx={{ color: isActive ? '#F1416C' : darkPurple }} variant="body1">
                Settings
              </Typography>
            </MenuItem>
          )}
        </NavLink>

        {/* <NavLink to="/contact-us" className="resetLink">
          {({ isActive }) => ( */}
        <MenuItem
          sx={listItemButtonStyles}
          onClick={() => {
            handleClose();
            handler();
          }}
        >
          <Typography sx={{ color: darkPurple }} variant="body1">
            Help & Support
          </Typography>
        </MenuItem>
        {/* )} */}
        {/* </NavLink> */}

        <MenuItem
          component={Link}
          to="/"
          onClick={() => {
            handleLogout();
            handleClose();
          }}
          sx={listItemButtonStyles}
        >
          <Typography color={darkPurple} variant="body1">
            Logout
          </Typography>
        </MenuItem>
      </Menu>

      <Backdrop open={isLoading} sx={{ zIndex: 99999 }}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
    </Box>
  );
}

ProfileMenu.propTypes = {
  anchorEl: propTypes.object,
  handleClose: propTypes.func.isRequired,
};

ProfileMenu.defaultProps = {
  anchorEl: null,
};

export default ProfileMenu;
