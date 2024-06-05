import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import propTypes from 'prop-types';

function Chip({ title, close, onClose, item }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const grey = colors.grey.main;
  const lightGrey = colors.lightGrey.main;

  return (
    <Box
      className="d-flex alin-items-center px-2 py-1 rounded-pill me-2 mb-1 mb-md-0"
      sx={{ background: grey, border: `1px solid ${lightGrey}` }}
    >
      <Typography variant="body2" className="me-2 text-capitalize" color={darkPurple}>
        {title}
      </Typography>
      {close && (
        <Box className="p-1 d-flex rounded-circle" sx={{ background: darkPurple }}>
          <Close
            sx={{ fontSize: 14, color: grey, cursor: 'pointer' }}
            className="text-white"
            onClick={() => onClose(item)}
          />
        </Box>
      )}
    </Box>
  );
}

Chip.propTypes = {
  item: propTypes.oneOfType([propTypes.object, propTypes.string]),
  title: propTypes.string,
  close: propTypes.bool,
  onClose: propTypes.func,
};

Chip.defaultProps = {
  title: '',
  item: {},
  close: false,
  onClose: () => {},
};

export default Chip;
