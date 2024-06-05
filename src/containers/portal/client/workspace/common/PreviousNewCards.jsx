import React from 'react';
import { Box, Card, Typography, useTheme } from '@mui/material';
import propTypes from 'prop-types';

// STYLES
import {
  newBoxDangerCardLabelStyles,
  newBoxSuccessCardLabelStyles,
  taskDetailsCardStyles,
} from 'styles/mui/portal/workspace-styles';

function PreviousNewCards({
  headingLabel,
  subHeadingLabel,
  prevHeadValue,
  prevSubHeadValue,
  newHeadValue,
  newSubHeadValue,
}) {
  const theme = useTheme();

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const success = colors.success.main;

  return (
    <Box className="d-flex align-items-center gap-4 py-4">
      {/* PREVIOUS CARD */}
      <Box className="position-relative flex-grow-1">
        <Box className="py-2 px-3" sx={newBoxDangerCardLabelStyles}>
          <Typography variant="body2" color="#fff">
            Previous
          </Typography>
        </Box>

        <Card sx={taskDetailsCardStyles}>
          <Box className="d-flex align-items-center justify-content-center">
            <Typography className="fw-600 me-1" variant="body1" color="#9F8F99">
              {headingLabel}
            </Typography>

            <Typography className="fw-600" variant="body1" color={darkPurple}>
              {prevHeadValue}
            </Typography>
          </Box>

          {subHeadingLabel && prevSubHeadValue && (
            <Box className="d-flex align-items-center justify-content-center">
              <Typography className="fw-600 me-1" variant="body2" color="#9F8F99">
                {subHeadingLabel}
              </Typography>

              <Typography className="fw-600" variant="body2" color={darkPurple}>
                {prevSubHeadValue}
              </Typography>
            </Box>
          )}
        </Card>
      </Box>

      {/* NEW CARD */}
      <Box className="position-relative flex-grow-1">
        <Box className="py-2 px-3" sx={newBoxSuccessCardLabelStyles}>
          <Typography variant="body2" color="#fff">
            New
          </Typography>
        </Box>

        <Card sx={taskDetailsCardStyles}>
          <Box className="d-flex align-items-center justify-content-center">
            <Typography className="fw-600 me-1" variant="body1" color={success}>
              {headingLabel}
            </Typography>

            <Typography className="fw-600" variant="body1" color={darkPurple}>
              {newHeadValue}
            </Typography>
          </Box>

          {subHeadingLabel && newSubHeadValue && (
            <Box className="d-flex align-items-center justify-content-center">
              <Typography className="fw-600 me-1" variant="body2" color={success}>
                {subHeadingLabel}
              </Typography>

              <Typography className="fw-600" variant="body2" color={darkPurple}>
                {newSubHeadValue}
              </Typography>
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  );
}

PreviousNewCards.propTypes = {
  headingLabel: propTypes.string.isRequired,
  subHeadingLabel: propTypes.string,
  prevHeadValue: propTypes.string.isRequired,
  newHeadValue: propTypes.string.isRequired,
  newSubHeadValue: propTypes.string,
  prevSubHeadValue: propTypes.string,
};

PreviousNewCards.defaultProps = {
  subHeadingLabel: '',
  newSubHeadValue: '',
  prevSubHeadValue: '',
};

export default PreviousNewCards;
