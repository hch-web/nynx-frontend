import React, { useEffect } from 'react';
import { Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';

// API HOOKS
import { useLazyGetUserRatingAnalyticsQuery } from 'services/private/analytics';

// COMPONENTS & UTILITIES
import ProgressBar from './ProgressBar';
import Rating from './Rating';
import { getPercentageValue } from '../utilities/helper';

function RatingCard() {
  const [getUserRatingAnalytic, { data: ratingAnalytics }] = useLazyGetUserRatingAnalyticsQuery();

  useEffect(() => {
    getUserRatingAnalytic();
  }, []);

  // Constants
  const totalOrders = ratingAnalytics?.completed_orders;

  const oneStarCount = ratingAnalytics?.one_star;
  const oneStarPercentage = +getPercentageValue(oneStarCount, totalOrders);
  const oneStarValue = oneStarPercentage >= 100 ? 100 : oneStarPercentage;

  const twoStarCount = ratingAnalytics?.two_star;
  const twoStarPercentage = +getPercentageValue(twoStarCount, totalOrders);
  const twoStarValue = twoStarPercentage >= 100 ? 100 : twoStarPercentage;

  const threeStarCount = ratingAnalytics?.three_star;
  const threeStarPercentage = +getPercentageValue(threeStarCount, totalOrders);
  const threeStarValue = threeStarPercentage >= 100 ? 100 : threeStarPercentage;

  const fourStarCount = ratingAnalytics?.four_star;
  const fourStarPercentage = +getPercentageValue(fourStarCount, totalOrders);
  const fourStarValue = fourStarPercentage >= 100 ? 100 : fourStarPercentage;

  const fiveStarCount = ratingAnalytics?.five_star;
  const fiveStarPercentage = +getPercentageValue(fiveStarCount, totalOrders);
  const fiveStarValue = fiveStarPercentage >= 100 ? 100 : fiveStarPercentage;

  const totalRatedOrder = ratingAnalytics?.total_rated_order;
  const averageRating = ratingAnalytics?.avarage_rating;

  return (
    <Card className="bg-white overflow-visible mt-3">
      {/* ROW-4 HEADER */}
      <Box className="d-flex align-items-center justify-content-between flex-wrap py-3 px-4">
        <Box className="col-12 col-sm-6">
          <Typography className="fw-500" variant="h6">
            Ratings
          </Typography>
        </Box>

        <Box className="col-12 col-sm-6 d-flex align-items-center justify-content-center justify-content-sm-end gap-3">
          <Typography className="fw-500 d-none d-md-block" variant="body2">
            All Time Rating
          </Typography>

          <Rating readOnly value={averageRating} />
        </Box>
      </Box>

      <Divider />

      {/* ROW-4 BODY */}
      <Box className="py-3 px-4">
        <Grid container className="justify-content-between">
          <Grid item xs={12} sm={5.3}>
            <Stack spacing={2}>
              <ProgressBar min="5 Stars" max={fiveStarCount?.toString()} value={+fiveStarValue.toFixed(0) || 0} />
              <ProgressBar min="4 Stars" max={fourStarCount?.toString()} value={+fourStarValue.toFixed(0) || 0} />
              <ProgressBar min="3 Stars" max={threeStarCount?.toString()} value={+threeStarValue.toFixed(0) || 0} />
              <ProgressBar min="2 Stars" max={twoStarCount?.toString()} value={+twoStarValue.toFixed(0) || 0} />
              <ProgressBar min="1 Stars" max={oneStarCount?.toString()} value={+oneStarValue.toFixed(0) || 0} />
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            sm={5.5}
            md={5.8}
            lg={5.5}
            className="flex-wrap align-items-center justify-content-between"
          >
            <ProgressBar
              min="Rated Orders"
              max={`${getPercentageValue(totalRatedOrder, totalOrders).toFixed(0)}%`}
              value={+getPercentageValue(totalRatedOrder, totalOrders).toFixed(0) || 0}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default RatingCard;
