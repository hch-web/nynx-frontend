import React, { useMemo } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';

// Services
import { useFindServicesHeroSectionQuery } from 'services/public/find-services/findServices';

// styles
import heroStyles from 'styles/common/hero-section.module.scss';
import { heroImageStyles } from 'styles/mui/public-pages/find-services/findServicesStyles';

function HeroSection() {
  const { palette } = useTheme();
  const darkPurple = palette.darkPurple.main;
  const paleOrange = palette.paleOrange.main;

  const { data: findServicesHeroSectionData } = useFindServicesHeroSectionQuery();

  // Constants
  const mainHeading = useMemo(() => findServicesHeroSectionData?.main_heading, [findServicesHeroSectionData]);
  const description = useMemo(() => findServicesHeroSectionData?.description, [findServicesHeroSectionData]);
  const image = useMemo(() => findServicesHeroSectionData?.image, [findServicesHeroSectionData]);

  return (
    <Box sx={{ background: darkPurple }} className={heroStyles.mainHeroContainer}>
      <Grid container className="justify-content-center align-items-center w-100 container-max-width">
        <Grid item md={5} className="px-2 px-sm-5 px-md-3 px-lg-5 text-center text-sm-center text-md-start">
          <Typography variant="h1" color={paleOrange}>
            {mainHeading}
          </Typography>

          <Typography variant="h6" color={paleOrange} className="my-4 mb-5">
            {description}
          </Typography>
        </Grid>

        <Grid item md={7} className={heroStyles.gridImageWrapper}>
          <Box className={heroStyles.mainHeroImg}>
            <Box
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

export default HeroSection;
