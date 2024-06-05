import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import propTypes from 'prop-types';

function LayoutWrapper({ title, children }) {
  return (
    <Container variant="public">
      <Box sx={{ background: 'white', borderRadius: '8px' }}>
        <Box className="border-bottom py-3 px-4">
          <Typography variant="h5" sx={{ fontSize: '20px' }}>
            {title}
          </Typography>
        </Box>

        {children}
      </Box>
    </Container>
  );
}
LayoutWrapper.propTypes = {
  title: propTypes.string,
  children: propTypes.element.isRequired,
};

LayoutWrapper.defaultProps = {
  title: '',
};

export default LayoutWrapper;
