import React from 'react';
import MuiRating from '@mui/material/Rating';
import propTypes from 'prop-types';

function Rating({ name, value, readOnly, handleChange, className, size }) {
  return (
    <MuiRating
      name={name}
      value={value}
      onChange={handleChange}
      readOnly={readOnly}
      className={className}
      size={size}
    />
  );
}

Rating.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.number.isRequired,
  readOnly: propTypes.bool,
  handleChange: propTypes.func,
  className: propTypes.string,
  size: propTypes.string,
};

Rating.defaultProps = {
  readOnly: true,
  handleChange: () => {},
  className: '',
  size: '',
};

export default Rating;
