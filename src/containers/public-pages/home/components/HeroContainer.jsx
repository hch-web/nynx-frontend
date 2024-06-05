import React, { useMemo } from 'react';
import { Button, Grid, useTheme, Typography, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

// SERVICES
import { useHeroSectionDataQuery } from 'services/public/home/home';

// COMPONENTS
import { heroSectionBecomeAnExpertStyles } from 'styles/mui/public-pages/homepage/home-styles';
import styles from 'styles/public-pages/homepage/homepage.module.scss';
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import HeroContainerGridImage from './HeroContainerGridImage';

function HeroContainer() {
  const { palette } = useTheme();
  const darkPurple = palette.darkPurple.main;
  const lightYellow = palette.darkPurple.textContrast;

  const { data: heroSectionData, isLoading: heroSectionDataLoading } = useHeroSectionDataQuery();

  // Constants
  const heading = useMemo(() => heroSectionData?.heading, [heroSectionData]);
  const description = useMemo(() => heroSectionData?.description, [heroSectionData]);
  const image = useMemo(() => heroSectionData?.image, [heroSectionData]);

  return heroSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Box sx={{ background: darkPurple }} className="d-flex justify-content-center">
      <Container variant="public" className="my-0 px-0">
        <Grid
          className={`${styles.heroContainer} px-2 px-sm-2 px-md-3 px-lg-5 py-5 py-sm-0 w-100 container-max-width `}
          container
        >
          <Grid
            item
            sm={12}
            md={12}
            lg={12}
            xl={5}
            className="d-flex align-items-start justify-content-center flex-column ps-3"
          >
            <Typography className="hero-heading" variant="h1" sx={{ color: lightYellow }}>
              {heading}
            </Typography>

            <Typography variant="h6" className="my-4 hero-sub-heading" sx={{ color: lightYellow }}>
              {description}
            </Typography>

            <Box>
              <Button
                component={Link}
                to="/find-service"
                variant="contained"
                color="secondary"
                className="me-3 mt-2 mt-sm-2 mt-md-2 mt-lg-2 px-4"
              >
                <Typography variant="body1">Find Services</Typography>
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                className="mt-2 mt-sm-2 mt-md-2 mt-lg-2 px-4"
                component={Link}
                to="/how-it-works-for-freelancer"
              >
                <Typography variant="body1" sx={heroSectionBecomeAnExpertStyles}>
                  Become an Expert
                </Typography>
              </Button>
            </Box>
          </Grid>

          <Grid
            item
            sm={12}
            md={6}
            lg={5}
            xl={7}
            className="d-none d-xl-flex align-items-end justify-content-center pe-3"
          >
            <HeroContainerGridImage image={image} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroContainer;
