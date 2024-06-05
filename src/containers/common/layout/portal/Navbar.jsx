/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import { Button, Grid, Typography, useTheme, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import CircleIcon from '@mui/icons-material/Circle';

// API HOOKS
import { useSwitchUserMutation } from 'services/private/user';

// REDUX SLICES
import { updateUserInfo } from 'store/slices/authSlice';

// styles
import styles from 'styles/portal/layout/navbar.module.scss';

// shared
// import ProfileMenu from './components/ProfileMenu';
import Drawer from './components/Drawer';
import Notifications from '../components/Notifications';
import SearchInput from '../components/SearchInput';
import ProfileMenu from '../components/ProfileMenu';

function Navbar({ bgColor, logoImg, isClientDashboard }) {
  const dispatch = useDispatch();

  const [showNavbar, setShowNavbar] = useState(false);
  const [profileMenu, setProfileMenu] = useState(null);

  // REF HOOKS
  const profileMenuRef = useRef(null);

  const theme = useTheme();
  const colors = theme.palette;

  const { userInfo } = useSelector(state => state.auth);
  const [switchUser] = useSwitchUserMutation();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleOpenProfileMenu = e => {
    setProfileMenu(e?.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenu(null);
  };

  const handleSwitchUser = async () => {
    const switchUserResp = await switchUser(!userInfo?.is_buyer);

    dispatch(updateUserInfo(switchUserResp.data));
  };

  return (
    <Grid
      container
      className={`${styles.dashboardNavbar} justify-content-between align-items-center px-4 py-3`}
      sx={{ position: 'sticky', top: 0, background: bgColor, zIndex: '2' }}
      id="navbar-container"
    >
      <Grid item className="d-flex">
        <Link to="/">
          <img src={logoImg} alt="logo-main" className="me-3" />
        </Link>
        <SearchInput />
      </Grid>

      <Grid item className="d-flex align-items-center">
        {isClientDashboard ? (
          <Box
            className="d-flex"
            sx={{
              '@media screen and (max-width: 777px)': { display: 'none !important' },
            }}
          >
            <Button
              component={Link}
              to="/find-service"
              variant="outlined"
              className="ms-3 py-2 px-2 d-none d-sm-none d-md-block"
              sx={{ color: '#fff', border: '1px solid #FFF' }}
            >
              <Typography className="mx-2" variant="body1">
                Find Services
              </Typography>
            </Button>
            <Button
              component={Link}
              to="/portal/client/workspace/create"
              variant="outlined"
              className="ms-3 py-2 px-2 d-none d-sm-none d-md-block"
              sx={{ color: '#fff', border: '1px solid #FFF' }}
            >
              <Typography className="mx-2" variant="body1">
                Post a Job
              </Typography>
            </Button>

            <Button
              onClick={handleSwitchUser}
              color="primary"
              variant="contained"
              className="ms-3 px-3 d-none d-sm-none d-md-block"
            >
              <Typography className="mx-2" variant="body1">
                View as Expert
              </Typography>
            </Button>
          </Box>
        ) : (
          <Box className="d-flex">
            <Button
              component={Link}
              to="/freelancer/buyer-request"
              variant="outlined"
              className="ms-3 py-2 px-2 d-none d-sm-none d-md-block"
              sx={{ color: '#fff', border: '1px solid #FFF' }}
            >
              <Typography className="mx-2" variant="body1">
                Client Requests
              </Typography>
            </Button>

            <Button
              color="primary"
              variant="contained"
              className="ms-3 py-2 px-2 d-none d-sm-none d-md-block"
              onClick={handleSwitchUser}
            >
              <Typography className="mx-2" variant="body1">
                View as Client
              </Typography>
            </Button>
          </Box>
        )}

        <Notifications />

        <Box sx={{ cursor: 'pointer' }}>
          <Avatar
            ref={profileMenuRef}
            src={userInfo?.image}
            alt={userInfo?.username}
            onClick={handleOpenProfileMenu}
            className="ms-3"
          />
          <Box className="d-flex justify-content-end ">
            <CircleIcon className={`${styles.profileOnlineIcon} d-none d-sm-none d-md-block`} />
          </Box>
        </Box>

        {/* user profile menu */}
        <ProfileMenu anchorEl={profileMenu} handleClose={handleCloseProfileMenu} />

        {/* drawer component */}
        <MenuIcon
          className={`${styles.navToggleButton} d-block d-sm-block d-md-block d-lg-none ms-3`}
          sx={{ color: colors.darkPurple.textContrast }}
          onClick={handleShowNavbar}
        />

        <Drawer
          showNavbar={showNavbar}
          handleShowNavbar={handleShowNavbar}
          isClientDashboard={isClientDashboard}
        />
      </Grid>
    </Grid>
  );
}

Navbar.propTypes = {
  bgColor: PropTypes.string,
  logoImg: PropTypes.string,
  isClientDashboard: PropTypes.bool,
};

Navbar.defaultProps = {
  bgColor: '',
  logoImg: '',
  isClientDashboard: false,
};

export default Navbar;
