import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import propTypes from 'prop-types';

// STYLES
import { linearProgressBarStyles } from 'styles/mui/components/linear-progress-styles';

function ProgressBar({ min, max, value, isFixed }) {
  return (
    <Box className="d-flex align-items-center gap-2" sx={{ flexGrow: '0.7' }}>
      <Box className="col-auto">
        <Typography variant="body2">{min}</Typography>
      </Box>

      <Box className="col">
        <LinearProgress sx={linearProgressBarStyles} variant="determinate" value={+value} />
      </Box>

      <Box className={isFixed ? 'col-3' : 'col-auto'}>
        <Typography variant="body2">{max}</Typography>
      </Box>
    </Box>
  );
}

ProgressBar.propTypes = {
  min: propTypes.string,
  max: propTypes.string,
  value: propTypes.number,
  isFixed: propTypes.bool,
};

ProgressBar.defaultProps = {
  min: '0',
  max: '0',
  value: 0,
  isFixed: false,
};

export default ProgressBar;
