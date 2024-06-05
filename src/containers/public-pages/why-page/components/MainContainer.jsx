import React from 'react';
import { Grid, Typography, useTheme, Box } from '@mui/material';

// Styles
import { aboutMainContainersStyles } from 'styles/mui/public-pages/homepage/home-styles';
import heroStyles from 'styles/common/hero-section.module.scss';
import {
  mainContainerTextStyles,
  mainHomePageStyles,
} from 'styles/mui/public-pages/why-page/why-page-styles';

// Services
import { useWhyPageHeroSectionQuery } from 'services/public/why-page/whyPage';

// Components
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function MainContainer() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { data: whyPageHeroSectionData, isLoading: whyPageHeroSectionDataLoading } = useWhyPageHeroSectionQuery();

  // Constants
  const mainHeading = whyPageHeroSectionData?.main_heading;
  const description = whyPageHeroSectionData?.description;
  const image = whyPageHeroSectionData?.image;

  return whyPageHeroSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Box sx={{ background: colors.lightOrange.main }} className={heroStyles.mainHeroContainer}>
      <Grid
        container
        sx={aboutMainContainersStyles}
        className="py-4 align-items-center justify-content-center p-2 p-sm-2 p-md-2 p-lg-2 p-xl-2 w-100 container-max-width"
      >
        <Grid
          item
          sm={12}
          md={5}
          lg={5}
          xl={5}
          className="px-2 px-sm-2 px-md-3 px-lg-5 text-center text-sm-center text-md-start"
          sx={mainContainerTextStyles}
        >
          <Typography variant="h1" color={darkPurple} className="mb-3 mb-sm-2 mb-md-1">
            {mainHeading}
          </Typography>

          <Typography variant="h6" color={darkPurple} className="px-3 px-sm-5 px-md-0">
            {description}
          </Typography>
        </Grid>

        <Grid item md={7} lg={7} xl={7} className={heroStyles.gridImageWrapper}>
          <Box className={heroStyles.mainHeroImg}>
            <Box
              sx={{
                background: `url(${image}) center no-repeat`,
                ...mainHomePageStyles,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainContainer;
