import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// API HOOKS
import { useGetPaypalAccountInfoQuery } from 'services/private/payments/paypal';

function PaypalAccountInfo({ amount }) {
  // REDUX STATE
  const { first_name: firstName, last_name: lastName } = useSelector(state => state?.auth?.userInfo);

  // API HOOKS
  const { data: paypalAccountInfo } = useGetPaypalAccountInfoQuery();

  // CONSTANTS
  const fullName = `${firstName} ${lastName}`;

  return (
    <Box className="px-4 py-4">
      <Box className="d-flex align-items-start flex-column gap-3">
        <Box className="d-flex align-items-center justify-content-center gap-2">
          <Typography variant="body1" className="fw-500">
            Name:
          </Typography>

          <Typography variant="body1">{fullName}</Typography>
        </Box>

        <Box className="d-flex align-items-center justify-content-center gap-2">
          <Typography variant="body1" className="fw-500">
            Paypal Email:
          </Typography>

          <Typography variant="body1">{paypalAccountInfo?.paypal_email || 'NA'}</Typography>
        </Box>

        <Box className="d-flex align-items-center justify-content-center gap-2">
          <Typography variant="body1" className="fw-500">
            Amount:
          </Typography>

          <Typography variant="body1">{`$${amount || 0}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

PaypalAccountInfo.propTypes = {
  amount: PropTypes.string,
};

PaypalAccountInfo.defaultProps = {
  amount: '0',
};
export default PaypalAccountInfo;
