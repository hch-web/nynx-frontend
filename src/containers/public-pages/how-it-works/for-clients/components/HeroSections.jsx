import React from 'react';
import { Grid, useTheme, Typography, Button, Box } from '@mui/material';

// Services
import { useHeroSectionQuery } from 'services/public/how-it-works/forClients';

// Styles
import styles from 'styles/public-pages/howItWorks/how-it-works-clients.module.scss';
import { heroImageStyles } from 'styles/mui/public-pages/how-it-works/for-client-styles';

// Components
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function HeroSections() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const paleOrange = colors.paleOrange.main;

  const { data: heroSectionData, isLoading: heroSectionDataLoading } = useHeroSectionQuery();

  // Constants
  const heading = heroSectionData?.heading;
  const description = heroSectionData?.description;
  const image = heroSectionData?.image;

  return heroSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Box
      sx={{ background: darkPurple }}
      className={`${styles.mainHeroContainer} d-flex justify-content-center`}
    >
      <Grid container className="justify-content-center align-items-center w-100 container-max-width">
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          className="px-2 px-sm-5 px-md-3 px-lg-5 text-center text-sm-center text-md-start"
        >
          <Typography variant="h1" color={paleOrange}>
            {heading}
          </Typography>

          <Typography variant="h6" color={paleOrange} className="my-4 mb-5">
            {description}
          </Typography>

          <Button variant="contained" color="secondary">
            Find Services
          </Button>
        </Grid>

        <Grid item md={6} className="position-relative h-100 d-none d-sm-none d-md-block">
          <Box className="h-100 d-flex flex-column align-items-end justify-content-end">
            <Box
              className={styles.mainHeroImg}
              sx={{
                background: `url(${image}) center no-repeat`,
                ...heroImageStyles,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroSections;
