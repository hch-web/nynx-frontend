import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';

function SubmitButton({ className, title, isLoading, variant, color, disabled }) {
  return (
    <Button
      type="submit"
      variant={variant}
      color={color}
      className={className}
      startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
      disabled={isLoading || disabled}
    >
      {isLoading ? 'Loading' : title}
    </Button>
  );
}

SubmitButton.propTypes = {
  className: propTypes.string,
  title: propTypes.string,
  disabled: propTypes.bool,
  isLoading: propTypes.bool.isRequired,
  variant: propTypes.string,
  color: propTypes.string,
};

SubmitButton.defaultProps = {
  disabled: false,
  className: '',
  title: '',
  variant: 'contained',
  color: 'secondary',
};

export default SubmitButton;
