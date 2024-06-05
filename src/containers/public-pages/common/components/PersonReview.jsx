import React, { useMemo } from 'react';
import { Grid, useTheme, Typography, Container, Box } from '@mui/material';

// COMPONENTS & STYLES & SERVICES
import { useTestimonialSectionQuery } from 'services/public/home/home';
import quotes from 'assets/quote.png';
import styles from 'styles/public-pages/homepage/homepage.module.scss';
import { personReviewContainerStyles } from 'styles/mui/public-pages/homepage/home-styles';
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function PersonReview() {
  const { palette } = useTheme();
  const red = palette.red.main;
  const paleOrange = palette.paleOrange.main;
  const yellow = palette.yellow.main;

  const { data: testimonialData, isLoading: testimonialDataLoading } = useTestimonialSectionQuery();

  // constants
  const description = useMemo(() => testimonialData?.text, [testimonialData]);
  const authorName = useMemo(() => testimonialData?.author_name, [testimonialData]);
  const authorDesignation = useMemo(() => testimonialData?.author_designation, [testimonialData]);

  return testimonialDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="500px" />
    </Box>
  ) : (
    <Container variant="public" className={`${styles.personReviewBox}`} sx={personReviewContainerStyles}>
      <Grid
        container
        className={`${styles.personReviewContainer} mb-1 mb-md-5 py-0 py-lg-3`}
        sx={{ background: red }}
      >
        <Grid
          item
          xs={12}
          className="d-flex align-items-center justify-content-center flex-column px-5 py-5 py-sm-5 py-md-5"
        >
          <div className="text-center">
            <img src={quotes} alt="main" />

            <Typography variant="h3" color={paleOrange} className="text-center my-5">
              {description}
            </Typography>
          </div>

          <div className="text-center">
            <Typography variant="h6" color={yellow}>
              {authorName}
            </Typography>

            <Typography variant="body1" color={paleOrange}>
              {authorDesignation}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PersonReview;
