import React, { useEffect, useState } from 'react';
import { Grid, useTheme, Box, Typography, Button } from '@mui/material';
import propTypes from 'prop-types';

// services
import { useLazyGetAllReviewsQuery } from 'services/public/profile';

// styles
import styles from 'styles/public-pages/freelancer-profile/freelancer-profile.module.scss';
import { title } from 'styles/mui/components/freelancer-profile-styles';

// utilities
import { formatName } from 'utilities/helpers';
import { DEFAULT_REVIEW_LIMIT } from 'utilities/constants';
import Reviews from '../../common/components/Reviews';

function ReviewComponent({ profileId }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // state
  const [reviews, setReviews] = useState();
  const [reviewCount, setReviewCount] = useState(null);

  const [getReviews] = useLazyGetAllReviewsQuery();

  useEffect(() => {
    if (profileId) {
      getReviews({ id: profileId, limit: DEFAULT_REVIEW_LIMIT }).then(({ data }) => {
        setReviews(data?.results);
        setReviewCount(data?.count);
      });
    }
  }, [profileId]);

  const handleLoadMoreReviews = () => {
    if (reviewCount > reviews?.length) {
      getReviews({ id: profileId, offset: reviews?.length, limit: DEFAULT_REVIEW_LIMIT }).then(({ data }) => {
        const nextReviews = data?.results || [];
        setReviews([...reviews, ...nextReviews]);
        setReviewCount(data?.count);
      });
    }
  };

  // constants
  const isShowLoadMore = reviewCount > reviews?.length;

  return (
    <Grid container spacing={2} className={`${styles.freelancerReview} mt-3 mt-lg-5`}>
      <Grid item xs={12} md={12} lg={9}>
        <Box className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <Typography variant="title" color={darkPurple} className="weight-500" sx={title}>
            Work History
          </Typography>
        </Box>
        <Box>
          {reviews?.length > 0 ? (
            reviews?.map(item => (
              <Reviews
                image={item?.user_image}
                name={formatName(item?.user_first_name, item?.user_last_name, item?.user_name)}
                country={item?.user_country}
                rating={item?.rating}
                createdAt={item?.created_at}
                description={item?.description}
                gigImage={item?.gig_image_url}
                key={item?.id}
              />
            ))
          ) : (
            <Typography variant="caption" color={darkPurple}>
              No Reviews Yet
            </Typography>
          )}
        </Box>
        <Box className={`${styles.loadMoreBtn} mt-4`}>
          {isShowLoadMore && (
            <Button variant="outlined" className="px-5" onClick={handleLoadMoreReviews}>
              <Typography variant="caption" color={darkPurple}>
                Load More
              </Typography>
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

ReviewComponent.propTypes = {
  profileId: propTypes.number.isRequired
};

export default ReviewComponent;
