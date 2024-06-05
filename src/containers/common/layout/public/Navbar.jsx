import React, { useState, useRef } from 'react';
import { Button, Grid, Typography, useTheme, Box, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

// COMPONENTS & STYLES & UTILITIES
import {
  linksFontStyles,
  profileIconStyles,
  completedProfileIconStyles,
} from 'styles/mui/public-pages/layout/navbar-styles';
import CircleIcon from '@mui/icons-material/Circle';
import useSwitchUser from 'custom-hooks/useSwitchUser';
import styles from 'styles/public-pages/layout/navbar.module.scss';
import Drawer from './components/Drawer';
import ProfileMenu from '../components/ProfileMenu';
import HowItWorksMenu from './components/HowItWorksMenu';
import SearchInput from '../components/SearchInput';
import Notifications from '../components/Notifications';
import NavLinkItem from './components/NavLinkItem';

function Navbar({ bgColor, logoImg, howItWorks, whyPage }) {
  const { pathname } = useLocation();
  const theme = useTheme();
  const { handleSwitchUser } = useSwitchUser();

  // REF HOOKS
  const profileMenuRef = useRef(null);
  const howItWorksRef = useRef(null);

  // STATE HOOKS
  const [showNavbar, setShowNavbar] = useState(false);
  const [navDropdown, setNavDropdown] = useState(null);
  const [profileMenu, setProfileMenu] = useState(null);

  const colors = theme.palette;
  const darkPurpleContrast = colors.darkPurple.textContrast;

  const { isAuthenticated, userInfo } = useSelector(state => state.auth);

  const profileCompleted = userInfo?.is_profile_completed;
  const isBuyer = userInfo?.is_buyer;

  const handleShowNavbar = () => setShowNavbar(!showNavbar);

  // MUI MENU HANDLERS START
  const handleClickNavbar = e => {
    setNavDropdown(e.currentTarget);
  };

  const handleCloseNavbar = () => {
    setNavDropdown(null);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenu(null);
  };

  const handleOpenProfileMenu = e => {
    setProfileMenu(e.currentTarget);
  };

  return (
    <Box id="navbar-container">
      {isAuthenticated && !profileCompleted && (
        <Box className={`${styles?.navAlertColor} text-center py-2 px-3`}>
          <Typography variant="body2">
            Your account has been verified!{' '}
            <Link to={isBuyer ? '/portal/client/profile-setting' : '/portal/freelancer/profile-setting'}>
              Please complete your profile.
            </Link>
          </Typography>
        </Box>
      )}

      <Box sx={{ background: bgColor }}>
        <Grid container className="justify-content-between align-items-center px-4 py-3 ">
          <Grid item className="d-flex ">
            <Link to="/">
              <img src={logoImg} alt="main" className="me-3" />
            </Link>

            <SearchInput howItWorks={howItWorks} whyPage={whyPage} />
          </Grid>

          <Grid item className={styles.navLink}>
            <nav className="d-none d-xl-flex flex-grow-1 justify-content-end align-items-center">
              {(isBuyer || !isAuthenticated) && <NavLinkItem label="Find Service" path="/find-service" />}

              {!isBuyer && <NavLinkItem label="Client Request" path="/freelancer/buyer-request" />}

              {isBuyer && <NavLinkItem label="Post Job" path="/portal/client/workspace/create" />}

              <NavLinkItem label="About Nynx" path="/about" />

              {/* CONDITIONAL RENDERING OF HOW IT WORKS MENU */}
              {isAuthenticated
                && (isBuyer ? (
                  <NavLinkItem label="How It Works" path="/how-it-works-for-clients" />
                ) : (
                  <NavLinkItem label="How It Works" path="/how-it-works-for-freelancer" />
                ))}

              {!isAuthenticated && (
                <Box sx={{ position: 'relative' }} component="span" ref={howItWorksRef}>
                  <Typography
                    className={`${
                      howItWorks || whyPage ? styles.navbarNavItemDark : styles.navbarNavItemLight
                    } mx-2 pointer`}
                    onClick={handleClickNavbar}
                    variant="p"
                    sx={linksFontStyles}
                  >
                    How It Works <KeyboardArrowDown />
                  </Typography>

                  <HowItWorksMenu
                    isMenuOpen={navDropdown}
                    handleClose={handleCloseNavbar}
                    anchorRef={howItWorksRef}
                  />
                </Box>
              )}

              {/* CONDITIONAL RENDERING OF SWITCH BUTTONS */}
              {isAuthenticated && (
                <Button
                  className="mx-2 py-2 px-2"
                  variant="contained"
                  color="primary"
                  onClick={handleSwitchUser}
                >
                  <Typography className="mx-2" variant="body1">
                    {isBuyer ? 'View as Expert' : 'View as Client'}
                  </Typography>
                </Button>
              )}
            </nav>

            {/* CONDITIONAL RENDERING OF LOGIN BUTTONS */}
            {!isAuthenticated ? (
              <>
                <NavLinkItem
                  label="Login"
                  path="/auth/login"
                  navClassName={`text-decoration-none navbar-nav-item ${
                    howItWorks || whyPage ? `${styles.navbarNavItemDark}` : `${styles.navbarNavItemLight}`
                  }`}
                  state={pathname}
                />

                <Link to="/auth/signup" className="text-decoration-none d-none d-sm-block " state={pathname}>
                  <Button color="primary" variant="contained" className="ms-3">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <Box className="me-2">
                <Box className="d-flex align-items-center gap-4">
                  {/* Notification container */}
                  <Notifications />

                  <Box sx={{ cursor: 'pointer' }}>
                    <Avatar
                      ref={profileMenuRef}
                      src={userInfo?.image}
                      alt={userInfo?.username}
                      onClick={handleOpenProfileMenu}
                    />
                    <Box className="d-flex justify-content-end ">
                      <CircleIcon
                        className="d-none d-sm-none d-md-block"
                        sx={profileCompleted ? profileIconStyles : completedProfileIconStyles}
                      />
                    </Box>
                  </Box>
                </Box>

                <ProfileMenu anchorEl={profileMenu} handleClose={handleCloseProfileMenu} />
              </Box>
            )}

            <MenuIcon
              className={`d-block d-xl-none ${styles.navToggleButton} ms-3`}
              sx={{ color: darkPurpleContrast }}
              onClick={handleShowNavbar}
            />

            <Drawer key={showNavbar} showNavbar={showNavbar} handleShowNavbar={handleShowNavbar} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  bgColor: PropTypes.string,
  logoImg: PropTypes.string,
  howItWorks: PropTypes.bool,
  whyPage: PropTypes.bool,
};

Navbar.defaultProps = {
  bgColor: '',
  logoImg: '',
  howItWorks: false,
  whyPage: false,
};

export default Navbar;
