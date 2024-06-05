import React from 'react';
import { Grid, Typography, useTheme, Box } from '@mui/material';

// assets
import mainImg from 'assets/contact-us.png';

// styles
import styles from 'styles/public-pages/contactUs/contact-us.module.scss';
import { mainImageStyles } from 'styles/mui/public-pages/contact-us/contact-us-styles';

function HeroSection() {
  const theme = useTheme();
  const colors = theme.palette;
  const paleOrange = colors.paleOrange.main;

  return (
    <Box sx={{ background: colors.darkPurple.main }} className="d-flex justify-content-center">
      <Grid
        container
        className={`py-4 align-items-center justify-content-center ${styles.mainContainer} p-2 p-sm-2 p-md-2 p-lg-2 p-xl-2 w-100 container-max-width`}
        bgcolor={colors.darkPurple.main}
      >
        <Grid
          item
          sm={12}
          md={5}
          lg={5}
          xl={5}
          className={`${styles.responsiveText} px-2 px-sm-2 px-md-3 px-lg-5 text-center text-sm-center text-md-start`}
        >
          <Typography variant="h1" color={paleOrange} className="mb-3 mb-sm-2 mb-md-1">
            Contact Us
          </Typography>
          <Typography variant="h6" color={paleOrange} className="px-3 px-sm-5 px-md-0">
            We&apos;re always here to help with any questions you have as soon as possible.
          </Typography>
        </Grid>

        <Grid
          item
          md={7}
          lg={7}
          xl={7}
          className={`position-relative ${styles.imgWrapper} h-100 d-none d-sm-none d-md-flex d-lg-flex`}
        >
          <Box className={`img-fluid ${styles.heroImg} h-100 w-100 d-flex flex-column justify-content-end`}>
            <Box
              sx={{
                background: `url(${mainImg}) center no-repeat`,
                ...mainImageStyles,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeroSection;
