import React from 'react';
import propTypes from 'prop-types';
import { Typography, useTheme, Box, Divider, ListItem, List } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { Link, NavLink } from 'react-router-dom';
import { Close, Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

// HOOKS
import { useSwitchUserMutation } from 'services/private/user';

// REDUX SLICES
import { updateUserInfo } from 'store/slices/authSlice';

// styles
import styles from 'styles/portal/layout/navbar.module.scss';
import {
  closeIconButtonStyles,
  drawerContainerBoxStyles,
  muiDrawerStyles,
} from 'styles/mui/components/navbar-drawer-styles';

function Drawer({ showNavbar, handleShowNavbar, isClientDashboard }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.auth);
  const [switchUser] = useSwitchUserMutation();

  // COLORS
  const colors = theme.palette;
  const darkPurpleContrast = colors.darkPurple.textContrast;

  // HANDLER FUNCTIONS
  const handleSwitchUser = async () => {
    const switchUserResp = await switchUser(!userInfo?.is_buyer);

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
          {isClientDashboard ? (
            <>
              <Link to="/how-it-works-for-clients" className={`${styles.drawerLink} text-decoration-none`}>
                <ListItem className="px-0">
                  <Typography className="mx-2" variant="p">
                    How It Works
                  </Typography>
                </ListItem>
              </Link>

              <ListItem className="px-0">
                <Typography className="mx-2" variant="p">
                  <NavLink to="" className={`${styles.drawerLink} text-decoration-none`}>
                    Create Workspace
                  </NavLink>
                </Typography>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem className="px-0">
                <Typography className="mx-2" variant="p">
                  <Link to="/" className={`${styles.drawerLink} text-decoration-none`}>
                    Community
                  </Link>
                </Typography>
              </ListItem>

              <Link to="/how-it-works-for-freelancer" className={`${styles.drawerLink} text-decoration-none`}>
                <ListItem className="px-0">
                  <Typography className="mx-2" variant="p">
                    How It Works
                  </Typography>
                </ListItem>
              </Link>

              <Link to="/freelancer/buyer-request" className={`${styles.drawerLink} text-decoration-none`}>
                <ListItem className="px-0">
                  <Typography className="mx-2" variant="p">
                    Buyer Requests
                  </Typography>
                </ListItem>
              </Link>
            </>
          )}

          <ListItem className={`${styles.drawerLink} px-0`} onClick={handleSwitchUser}>
            <Typography className="mx-2 pointer" variant="body1">
              {userInfo?.is_buyer ? 'Switch to Buying' : 'Switch to Selling'}
            </Typography>
          </ListItem>
        </List>

        <Typography variant="overline" color={colors.yellow.main}>
          General
        </Typography>

        <Divider />

        <List>
          <ListItem className="px-0">
            <Typography className="mx-2" variant="p">
              <Link to="/" className={`${styles.drawerLink} text-decoration-none`}>
                Home
              </Link>
            </Typography>
          </ListItem>
        </List>
      </Box>
    </MuiDrawer>
  );
}

Drawer.propTypes = {
  showNavbar: propTypes.bool,
  isClientDashboard: propTypes.bool.isRequired,
  handleShowNavbar: propTypes.func,
};

Drawer.defaultProps = {
  showNavbar: false,
  handleShowNavbar: () => {},
};

export default Drawer;
