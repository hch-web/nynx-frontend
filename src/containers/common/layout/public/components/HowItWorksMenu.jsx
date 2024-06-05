import React from 'react';
import { List, ListItemButton, Typography, Paper, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

// CUSTOM HOOKS
import useOutsideClickChecker from 'custom-hooks/useOutsideClickChecker';

// STYLES
import { howItWorksNavbarMenuStyles, howItWorksLinkStyles } from 'styles/mui/public-pages/layout/navbar-styles';

function HowItWorksMenu({ isMenuOpen, handleClose, anchorRef }) {
  useOutsideClickChecker(anchorRef, handleClose);

  return (
    <Paper sx={howItWorksNavbarMenuStyles}>
      {isMenuOpen && (
        <List onClick={handleClose} className="p-0">
          <ListItemButton component={Link} to="/how-it-works-for-clients" sx={howItWorksLinkStyles}>
            <Typography variant="body1" className="w-100 d-flex justify-content-center">
              For Clients
            </Typography>
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/how-it-works-for-freelancer" sx={howItWorksLinkStyles}>
            <Typography variant="body1" className="w-100 d-flex justify-content-center">
              For Expert
            </Typography>
          </ListItemButton>
        </List>
      )}
    </Paper>
  );
}

HowItWorksMenu.propTypes = {
  isMenuOpen: propTypes.object,
  handleClose: propTypes.func.isRequired,
  anchorRef: propTypes.object,
};

HowItWorksMenu.defaultProps = {
  isMenuOpen: null,
  anchorRef: null,
};

export default HowItWorksMenu;
