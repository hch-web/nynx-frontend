import React from 'react';
import { Grid, Typography, useTheme, Container, Box } from '@mui/material';

// Services
import { useWhyPageAboutNynxSectionQuery } from 'services/public/why-page/whyPage';

// Styles
import { aboutNynxContainerImageStyles } from 'styles/mui/public-pages/why-page/why-page-styles';

// Components
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function WhatIsNynxContainer() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { data: whyPageWhatIsNynxSectionData, isLoading: whyPageWhatIsNynxSectionDataLoading } = useWhyPageAboutNynxSectionQuery();

  // Constants
  const mainHeading = whyPageWhatIsNynxSectionData?.main_heading;
  const description = whyPageWhatIsNynxSectionData?.description;
  const subDescription = whyPageWhatIsNynxSectionData?.sub_description;
  const image = whyPageWhatIsNynxSectionData?.image;

  return whyPageWhatIsNynxSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public" className="text-center">
      <Grid container spacing={12} className="text-start">
        <Grid item xs={12} sm={6} md={6} lg={6} className="mx-auto d-none d-lg-block">
          <Box className="w-100 h-100">
            <Box
              sx={{
                background: `url(${image}) center no-repeat`,
                ...aboutNynxContainerImageStyles,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} className="mx-auto">
          <Typography variant="h2" color={darkPurple}>
            {mainHeading}
          </Typography>
          <Typography variant="h6" color={darkPurple} className="mt-3 mb-3 mb-sm-5">
            {description}
          </Typography>
          <Typography variant="h6" color={darkPurple} className="mt-3 mb-3 mb-sm-5">
            {subDescription}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default WhatIsNynxContainer;
