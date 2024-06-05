import React from 'react';
import { Button } from '@mui/material';
import propTypes from 'prop-types';

function SaveButton({ children }, props) {
  return (
    <Button type="submit" color="secondary" variant="contained" className="px-4 py-2" {...props}>
      {children}
    </Button>
  );
}

SaveButton.propTypes = {
  children: propTypes.string.isRequired,
};

export default SaveButton;
