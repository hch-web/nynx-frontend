import React, { useMemo } from 'react';
import { Grid, useTheme, Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// COMPONENTS & STYLES & SERVICES
import { useFreelancerReviewSectionQuery } from 'services/public/home/home';
import styles from 'styles/public-pages/homepage/homepage.module.scss';
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import { freelancerReviewImageStyles } from 'styles/mui/public-pages/homepage/home-styles';

function FreelancerReviews() {
  const theme = useTheme();
  const colors = theme.palette;

  const { data: freelancerReviewSectionData, isLoading: freelancerReviewSectionDataLoading } = useFreelancerReviewSectionQuery();

  // Constants
  const image = useMemo(() => freelancerReviewSectionData?.image, [freelancerReviewSectionData]);
  const contentFor = useMemo(() => freelancerReviewSectionData?.content_for, [freelancerReviewSectionData]);
  const mainHeading = useMemo(() => freelancerReviewSectionData?.main_heading, [freelancerReviewSectionData]);
  const headingOne = useMemo(() => freelancerReviewSectionData?.heading_one, [freelancerReviewSectionData]);
  const headingTwo = useMemo(() => freelancerReviewSectionData?.heading_two, [freelancerReviewSectionData]);
  const headingThree = useMemo(
    () => freelancerReviewSectionData?.heading_three,
    [freelancerReviewSectionData]
  );
  const textOne = useMemo(() => freelancerReviewSectionData?.text_one, [freelancerReviewSectionData]);
  const textTwo = useMemo(() => freelancerReviewSectionData?.text_two, [freelancerReviewSectionData]);
  const textThree = useMemo(() => freelancerReviewSectionData?.text_three, [freelancerReviewSectionData]);

  return freelancerReviewSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public" className={`${styles.reviewsSectionBox}`}>
      <Grid container bgcolor={colors.lightOrange.main} className={`${styles.reviewsContainer} d-flex`}>
        <Grid item md={6} lg={6} xl={6} className="ps-3 pe-3 ps-sm-3 pe-sm-3 ps-md-5 pe-md-0 py-4">
          <Typography variant="caption" className="text-white" color={colors.paleOrange.main}>
            {contentFor}
          </Typography>

          <Typography variant="h2" color={colors.darkPurple.main} className="my-4">
            {mainHeading}
          </Typography>

          <Grid container spacing={2}>
            <Grid item sm={12} md={12} lg={11} xl={11}>
              <Typography color={colors.darkPurple.main} variant="h3" mb={1}>
                {headingOne}
              </Typography>

              <Typography color={colors.darkPurple.main} variant="body1">
                {textOne}
              </Typography>
            </Grid>

            <Grid item sm={12} md={12} lg={11} xl={11}>
              <Typography color={colors.darkPurple.main} variant="h3" mb={1}>
                {headingTwo}
              </Typography>

              <Typography color={colors.darkPurple.main} variant="body1">
                {textTwo}
              </Typography>
            </Grid>

            <Grid item sm={12} md={12} lg={11} xl={11}>
              <Typography color={colors.darkPurple.main} variant="h3" mb={1}>
                {headingThree}
              </Typography>

              <Typography color={colors.darkPurple.main} variant="body1">
                {textThree}
              </Typography>
            </Grid>

            <Grid item sm={12} md={12} lg={11} xl={11}>
              <Button variant="outlined" component={Link} to="/find-service">
                FIND SERVICES
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={6} lg={6} xl={6} className="d-none d-sm-none d-md-block py-5">
          <Box
            sx={{
              background: `url(${image}) top right no-repeat`,
              ...freelancerReviewImageStyles,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default FreelancerReviews;
