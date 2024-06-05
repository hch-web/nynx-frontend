/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// Styles
import { expertLevelBadgeStyles } from 'styles/mui/portal/analytics-styles';

// Utilities
import { conditionalBackgroundColor, conditionalLabelColor } from '../utilities/helper';

function ExpertStep({ index, label }) {
  return (
    <Box
      className="d-flex align-items-center justify-content-center text-center"
      sx={{
        background: conditionalBackgroundColor(index),
        ...expertLevelBadgeStyles,
      }}
    >
      <Typography className="fw-500" variant="caption3" color={conditionalLabelColor(index)}>
        {label}
      </Typography>
    </Box>
  );
}

ExpertStep.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};
export default ExpertStep;
