import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Backdrop, Box, CircularProgress } from '@mui/material';

// styles
import styles from 'styles/portal/layout/sideBar.module.scss';

// COMPONENTS & UTILITIES & ASSETS
import analyticIcon from 'assets/analyticsIcon.svg';
import Tooltip from 'containers/common/components/Tooltip';
import { freelancerRoutes, clientRoutes } from 'utilities/data';
import useHandleHelpAndSupport from 'custom-hooks/useHandleHelpAndSupport';
import useGetSidebarUtils from './custom-hooks/useGetSidebarUtilFunc';

function SideBarMenu({ isClientDashboard, bgColor }) {
  const { getActiveNavlinkStyles, getClassNameStyles } = useGetSidebarUtils();
  const { handler, isLoading } = useHandleHelpAndSupport();

  return (
    <Box className={styles.sidebarMenu} sx={{ background: bgColor }}>
      <Box
        className={`${styles.listContainer} d-flex flex-column justify-content-between align-items-center`}
      >
        <Box />

        <Box className="d-flex flex-column">
          {isClientDashboard
            && clientRoutes.map(item => (
              <Tooltip title={item.info} placement="right" key={item.name}>
                <div className="mt-2">
                  <NavLink
                    to={item.route}
                    className={({ isActive }) => getClassNameStyles(isActive, item, true)}
                  >
                    {({ isActive }) => <div style={getActiveNavlinkStyles(isActive, item)} />}
                  </NavLink>
                </div>
              </Tooltip>
            ))}

          {!isClientDashboard
            && freelancerRoutes.map(item => (
              <Tooltip key={item.name} title={item.info} placement="right">
                <div className="mt-2">
                  <NavLink
                    to={item.route}
                    className={({ isActive }) => getClassNameStyles(isActive, item, false)}
                  >
                    {({ isActive }) => <div style={getActiveNavlinkStyles(isActive, item)} />}
                  </NavLink>
                </div>
              </Tooltip>
            ))}
        </Box>

        <Tooltip placement="right" title="Help & Support">
          <Box className="mb-4 pointer" onClick={handler}>
            <img src={analyticIcon} alt="help-and-support" />
          </Box>
        </Tooltip>

        <Backdrop open={isLoading}>
          <CircularProgress size={80} color="yellow" />
        </Backdrop>
      </Box>
    </Box>
  );
}

SideBarMenu.propTypes = {
  isClientDashboard: PropTypes.bool,
  bgColor: PropTypes.string,
};

SideBarMenu.defaultProps = {
  isClientDashboard: false,
  bgColor: '',
};

export default SideBarMenu;
