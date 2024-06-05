import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PropTypes } from 'prop-types';

function PriceSection({ fixedPrice, monthlyPrice }) {
  const theme = useTheme();
  const colors = theme.palette;

  return (
    <Box className="d-flex justify-content-between" sx={{ borderTop: `1px solid ${colors.lightGrey.main}` }}>
      {fixedPrice && (
        <Box className="p-2">
          <Typography variant="body2">Fixed From</Typography>

          <Typography variant="body1" className="fw-bold">
            $ {fixedPrice || 1}
          </Typography>
        </Box>
      )}

      {monthlyPrice && (
        <Box className={`p-2 ${!fixedPrice ? 'flex-grow-1 text-end' : ''}`}>
          <Typography variant="body2">Monthly From</Typography>

          <Typography variant="body1" className="fw-bold">
            $ {monthlyPrice || 0}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

PriceSection.propTypes = {
  fixedPrice: PropTypes.string,
  monthlyPrice: PropTypes.string,
};
PriceSection.defaultProps = {
  fixedPrice: '',
  monthlyPrice: '',
};

export default PriceSection;
