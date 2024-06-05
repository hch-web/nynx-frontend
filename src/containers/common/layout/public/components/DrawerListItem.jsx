import React, { memo } from 'react';
import { ListItem, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';

import styles from 'styles/public-pages/layout/navbar.module.scss';

function DrawerListItem({ className, path, label, handleClick }) {
  return (
    <ListItem className="px-0" onClick={handleClick}>
      <Typography className="mx-2 flex-grow-1" variant="p">
        <NavLink to={path} className={`${className}`}>
          {label}
        </NavLink>
      </Typography>
    </ListItem>
  );
}

DrawerListItem.propTypes = {
  label: propTypes.string.isRequired,
  className: propTypes.string,
  path: propTypes.string,
  handleClick: propTypes.func,
};

DrawerListItem.defaultProps = {
  className: `text-decoration-none ${styles.drawerLink}`,
  path: '/',
  handleClick: () => {},
};

export default memo(DrawerListItem);
