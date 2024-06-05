import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';

// styles
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F6F4F5'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.red.main,
  },
}));

function ProgressBar({ value }) {
  return (
    <Box sx={{ flex: 1 }}>
      <BorderLinearProgress variant="determinate" value={value} />
    </Box>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number
};

ProgressBar.defaultProps = {
  value: 0
};

export default ProgressBar;
