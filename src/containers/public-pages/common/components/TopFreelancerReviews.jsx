import React, { memo } from 'react';
import { Grid, useTheme, Typography, Card, Box, Container } from '@mui/material';
import PropTypes from 'prop-types';

// STYLES
import styles from 'styles/public-pages/homepage/homepage.module.scss';
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function TopFreelancerReviews({ mainHeading, description, reviews, isLoading }) {
  const theme = useTheme();
  const colors = theme.palette;

  return isLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public" className={`text-center pt-2 ${styles.topFreelancersReviewBox}`}>
      <Typography variant="h2" color={colors.darkPurple.main}>
        {mainHeading}
      </Typography>

      <Typography variant="h6" color={colors.darkPurple.main} className="mt-3 mb-3 mb-sm-5">
        {description}
      </Typography>

      <Grid container alignItems="start" spacing={2}>
        {reviews?.map(item => (
          <Grid item xs={12} sm={6} md={4} className="mx-auto" key={item?.id}>
            <Card
              sx={{
                bgcolor: colors.yellow.main,
              }}
              className="d-flex justify-content-center flex-column align-items-center mx-auto text-center border-0"
            >
              <Box className={`${styles.reviewCardContentBox} p-4 mt-0 mt-md-2`}>
                <Typography variant="h6" color={colors.red.main}>
                  {item?.name}
                </Typography>
                <Typography variant="body1" color={colors.darkPurple.main} className="mb-2">
                  {item?.designation}
                </Typography>

                <Typography variant="h6" fontWeight={500}>
                  {`"${item?.description}"`}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

TopFreelancerReviews.propTypes = {
  mainHeading: PropTypes.string,
  description: PropTypes.string,
  isLoading: PropTypes.bool,
  reviews: PropTypes.array,
};

TopFreelancerReviews.defaultProps = {
  mainHeading: '',
  description: '',
  isLoading: false,
  reviews: [],
};

export default memo(TopFreelancerReviews);
