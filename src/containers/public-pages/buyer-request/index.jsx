import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

// components
import BuyerRequests from './components/BuyerRequests';
import ProfileInfo from './components/ProfileInfo';

function BuyerRequest() {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Box className="container">
      <Box className="row py-3 d-flex justify-content-center">
        <Box className="col-lg-9 col-md-12">
          <BuyerRequests />
        </Box>
        {isAuthenticated && (
          <Box className="col-lg-3 d-none d-lg-block d-md-none d-sm-none ">
            <ProfileInfo />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BuyerRequest;
