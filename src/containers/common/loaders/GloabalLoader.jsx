import { Box } from '@mui/material';
import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

function GloabalLoader() {
  return (
    <Box className="d-flex align-items-center justify-content-center" sx={{ height: '100vh' }}>
      <MutatingDots
        height="100"
        width="100"
        color="#422438"
        secondaryColor="#fac751"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        visible
      />
    </Box>
  );
}

export default GloabalLoader;
