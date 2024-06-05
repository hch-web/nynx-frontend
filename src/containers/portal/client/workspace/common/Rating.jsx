import React from 'react';
import { useTheme } from '@mui/material';
import MuiRating from '@mui/material/Rating';
import { StarRounded } from '@mui/icons-material';
import propTypes from 'prop-types';

function Rating({ value, readOnly, onChange }) {
  const theme = useTheme();

  // COLORS
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;

  // CONSTANTS
  const iconStyles = { fontSize: '40px', color: lightOrange };

  return (
    <MuiRating
      onChange={onChange}
      emptyIcon={<StarRounded className="opacity-50" sx={iconStyles} />}
      icon={<StarRounded sx={iconStyles} />}
      readOnly={readOnly}
      sx={iconStyles}
      value={value}
    />
  );
}

Rating.propTypes = {
  value: propTypes.number,
  readOnly: propTypes.bool,
  onChange: propTypes.func,
};

Rating.defaultProps = {
  value: null,
  readOnly: false,
  onChange: () => {},
};

export default Rating;
