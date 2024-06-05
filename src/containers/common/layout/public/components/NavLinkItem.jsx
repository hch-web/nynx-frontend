import React, { memo, useCallback } from 'react';
import { Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';

// STYLES
import styles from 'styles/public-pages/layout/navbar.module.scss';

function NavLinkItem({ path, navClassName, label, className, urlState }) {
  const { pathname } = useLocation();

  const isHowItWorksPage = pathname === '/how-it-works-for-freelancer';
  const isWhyPage = pathname === '/about';

  const getNavLinkClassName = useCallback(
    ({ isActive }) => {
      if (isActive) {
        if (isHowItWorksPage || isWhyPage) {
          return `${styles.activeNavLinkDark}`;
        }
        return `${styles.activeNavLinkLight}`;
      }

      if (isHowItWorksPage || isWhyPage) {
        return `${styles.navbarNavItemDark}`;
      }
      return `${styles.navbarNavItemLight}`;
    },
    [pathname]
  );

  return (
    <Typography className={`mx-2 ${className}`} variant="p">
      <NavLink to={path} className={navClassName || getNavLinkClassName} state={urlState}>
        {label}
      </NavLink>
    </Typography>
  );
}

NavLinkItem.propTypes = {
  path: propTypes.string,
  label: propTypes.string.isRequired,
  navClassName: propTypes.string,
  className: propTypes.string,
  urlState: propTypes.string,
};

NavLinkItem.defaultProps = {
  path: '/',
  navClassName: '',
  className: '',
  urlState: '',
};

export default memo(NavLinkItem);
