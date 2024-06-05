import React, { useEffect } from 'react';
import { Box, Paper, List } from '@mui/material';
import propTypes from 'prop-types';
import { compareRef } from 'utilities/helpers';

function Menu({ children, targetRef, setMenuState }) {
  useEffect(() => {
    const handleClickOutside = e => {
      if (!compareRef(targetRef.current, e.target)) {
        setMenuState(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [targetRef]);

  return (
    <Box>
      <Paper sx={{ position: 'absolute', zIndex: '4', right: '0' }} id="paper-element-check">
        <List>{children}</List>
      </Paper>
    </Box>
  );
}

Menu.propTypes = {
  children: propTypes.node.isRequired,
  targetRef: propTypes.object.isRequired,
  setMenuState: propTypes.func.isRequired,
};

export default Menu;
