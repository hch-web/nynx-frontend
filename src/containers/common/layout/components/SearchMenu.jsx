import React from 'react';
import { List, ListItemButton, Typography, Menu } from '@mui/material';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';

// STYLES
import { searchMenuLinkStyles, searchBarMenuStyles } from 'styles/mui/public-pages/layout/navbar-styles';

function SearchMenu({ anchorEl, handleClose, setSearchSelectedType }) {
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleSelectOptions = selectedType => {
    setSearchSelectedType(selectedType);
  };

  // constants
  const isShowMenuList = !!anchorEl && !isAuthenticated;

  return (
    <Menu anchorEl={anchorEl} open={isShowMenuList} onClose={handleClose} sx={searchBarMenuStyles}>
      <List onClick={handleClose} className="p-0">
        <ListItemButton divider sx={searchMenuLinkStyles} onClick={() => handleSelectOptions('gigs')}>
          <Typography variant="body1" className="w-100 d-flex justify-content-center">
            For Gigs
          </Typography>
        </ListItemButton>

        <ListItemButton divider sx={searchMenuLinkStyles} onClick={() => handleSelectOptions('jobs')}>
          <Typography variant="body1" className="w-100 d-flex justify-content-center">
            For Jobs
          </Typography>
        </ListItemButton>
      </List>
    </Menu>
  );
}

SearchMenu.propTypes = {
  anchorEl: propTypes.object,
  handleClose: propTypes.func.isRequired,
  setSearchSelectedType: propTypes.func.isRequired,
};

SearchMenu.defaultProps = {
  anchorEl: null,
};

export default SearchMenu;
