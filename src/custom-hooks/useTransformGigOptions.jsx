import { Box, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { buyerRequestGigSelectFieldStyles } from 'styles/mui/public-pages/buyer-request/buyer-request-styles';

function useTransformGigOptions(data) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const transformedGigOption = useMemo(
    () => data?.map(item => ({
      label: (
        <Box className="d-flex align-items-center justify-content-start">
          <Box
            className="me-2"
            sx={{
              background: `url(${item?.main_image || item?.image}) top left no-repeat`,
              ...buyerRequestGigSelectFieldStyles,
            }}
          />

          <Typography variant="body1" color={darkPurple} sx={{ height: '50px' }}>
            {item?.title}
          </Typography>
        </Box>
      ),
      value: item?.id,
    })),
    [data]
  );

  return transformedGigOption;
}

export default useTransformGigOptions;
