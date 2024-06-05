import React from 'react';
import { useTheme, Box, Typography } from '@mui/material';
import MuiRating from '@mui/material/Rating';
import { StarBorderRounded, StarRounded } from '@mui/icons-material';
import propTypes from 'prop-types';

function Rating({ value, defaultValue, readOnly }) {
  const theme = useTheme();
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;

  return (
    <Box className="d-flex align-items-center gap-2">
      <MuiRating
        icon={<StarRounded sx={{ color: lightOrange, fontSize: '40px' }} />}
        emptyIcon={<StarBorderRounded sx={{ fontSize: '40px' }} />}
        value={value}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />

      <Typography className="d-none d-sm-block" variant="h4">{parseFloat(value).toFixed(1)}</Typography>
    </Box>
  );
}

Rating.propTypes = {
  value: propTypes.number,
  defaultValue: propTypes.number,
  readOnly: propTypes.bool,
};

Rating.defaultProps = {
  value: null,
  defaultValue: null,
  readOnly: false,
};

export default Rating;
