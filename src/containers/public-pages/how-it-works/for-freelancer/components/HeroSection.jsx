import React from 'react';
import { Button, Grid, Typography, useTheme, Box } from '@mui/material';

// styles
import { heroImageStyles } from 'styles/mui/public-pages/how-it-works/for-client-styles';
import styles from 'styles/public-pages/howItWorks/how-it-works-freelancer.module.scss';

// Services
import { useHowItWorksExpertHeroSectionQuery } from 'services/public/how-it-works/forExperts';

// Components
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import { becomeExpertBtnStyles } from 'styles/mui/public-pages/how-it-works/for-freelancer-styles';

function HeroSection() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const darkPaleOrange = colors.darkPaleOrange.main;

  const { data, isLoading } = useHowItWorksExpertHeroSectionQuery();

  // constants
  const howItWorksExpertHeroMainHeading = data?.main_heading;
  const howItWorksExpertHeroDescription = data?.description;
  const howItWorksExpertHeroImage = data?.image;

  return isLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Box
      sx={{ background: darkPaleOrange }}
      className={`${styles.mainContainer} d-flex justify-content-center`}
    >
      <Grid container className="justify-content-center align-items-center w-100 container-max-width">
        <Grid
          item
          md={5}
          className={`${styles.mainContainerText} px-2 px-sm-5 px-md-3 px-lg-5 text-center text-sm-center text-md-start`}
        >
          <Typography variant="h1" color={darkPurple}>
            {howItWorksExpertHeroMainHeading}
          </Typography>
          <Typography variant="h6" color={darkPurple} className="my-4 mb-3 mb-sm-3 mb-md-5">
            {howItWorksExpertHeroDescription}
          </Typography>

          <Button variant="contained" className="px-4" sx={becomeExpertBtnStyles}>
            Become an Expert
          </Button>
        </Grid>

        <Grid
          item
          sm={12}
          md={7}
          className={`position-relative ${styles.imgWrapper} h-100 d-none d-sm-none d-md-flex d-lg-flex`}
        >
          <Box className={`${styles.heroImg} w-100 h-100`}>
            <Box
              sx={{
                background: `url(${howItWorksExpertHeroImage}) center no-repeat`,
                ...heroImageStyles,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroSection;
