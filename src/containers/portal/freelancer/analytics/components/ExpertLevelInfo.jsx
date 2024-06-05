import React from 'react';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import PropTypes from 'prop-types';

// Styles
import { sellerLevelCardStyles } from 'styles/mui/portal/analytics-styles';

// COMPONENTS & UTILITIES
import ExpertLevels from './ExpertLevels';
import ProgressBar from './ProgressBar';
import { checkExpertLevelSteps, getPercentageValue } from '../utilities/helper';

function ExpertLevelInfo({ sellerLevelData }) {
  const theme = useTheme();

  // COLORS
  const colors = theme.palette;
  const success = colors.success.main;
  const lightYellow = colors.lightYellow.main;

  // Constants
  const sellerLevel = sellerLevelData?.seller_level;

  // Completed Orders Progress Bar values
  const completedOrders = sellerLevelData?.completed_orders;
  const requiredCompletedOrders = sellerLevelData?.required_orders || 0;
  const completedOrdersValue = getPercentageValue(completedOrders, requiredCompletedOrders).toFixed(0) || 0;
  const isCompletedOrderCriteriaCompleted = completedOrdersValue >= 100;

  // Total Earning Progress Bar values
  const totalEarning = sellerLevelData?.total_earning;
  const requiredTotalEarning = sellerLevelData?.required_total_earning || 0;
  const requiredEarningValue = getPercentageValue(totalEarning, requiredTotalEarning).toFixed(0) || 0;
  const isRequiredEarningCriteriaIsCompleted = requiredEarningValue >= 100;

  // Rating Progress Bar Values
  const rating = sellerLevelData?.ratings;
  const overAllRatingValue = getPercentageValue(rating, 5).toFixed(0) || 0;
  const isRequiredRatingCriteriaCompleted = overAllRatingValue >= 98;

  //  Gig count Progress Bar values
  const totalGig = sellerLevelData?.gig_count;
  const requiredGig = sellerLevelData?.required_gigs || 0;
  const isReuirementGigCriteriaCompleted = totalGig >= requiredGig;
  const requiredGigValue = isReuirementGigCriteriaCompleted
    ? 100
    : getPercentageValue(totalGig, requiredGig).toFixed(0) || 0;

  return (
    <Box className="bg-white overflow-visible mt-3" sx={sellerLevelCardStyles}>
      {/* ROW-3 HEADER */}
      <Box className="d-flex align-items-center justify-content-between flex-wrap py-3 px-4">
        <Box className="col-12 col-xl">
          <Typography className="fw-500" variant="h6">
            Your Seller Level
          </Typography>
          <Typography variant="body2">
            You have to complete each criteria in order to get a seller level
          </Typography>
        </Box>

        <Box className="col-12 col-xl text-center text-xl-end">
          <ExpertLevels activeStep={checkExpertLevelSteps(sellerLevel)} />
        </Box>
      </Box>

      <Divider />

      {/* ROW-3 BODY */}
      <Box className="py-3 px-4">
        <Grid container className="flex-wrap align-items-center justify-content-between">
          {/* Completed Order */}
          <Grid item xs={12} sm={5.8} md={5.7} lg={5.7} className="d-flex flex-wrap align-items-center my-2">
            <Box className="col-12 col-lg-6 d-flex gap-2 w-100">
              <CheckCircle sx={{ color: success }} />
              <Box>
                <Typography className="fw-500" variant="body1">
                  Completed Order
                </Typography>
                <Typography variant="body1">
                  When an expert will sign in as expert there will be a level of New Expert.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Total Earning */}
          <Grid item xs={12} sm={5.8} md={5.7} lg={5.7} className="d-flex flex-wrap align-items-center my-2">
            <Box className="col-12 col-lg-6 d-flex gap-2 w-100">
              <CheckCircle sx={{ color: success }} />
              <Box>
                <Typography className="fw-500" variant="body1">
                  Achiever
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1">Complete at least 30 tasks with 98% min rating</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Earn £2500 or more</Typography>
                  </li>
                </ul>
              </Box>
            </Box>
          </Grid>
          {/* Rating */}
          <Grid item xs={12} sm={5.8} md={5.7} lg={5.7} className="d-flex flex-wrap align-items-center my-2">
            <Box className="col-12 col-lg-6 d-flex gap-2 w-100">
              <CheckCircle sx={{ color: success }} />
              <Box>
                <Typography className="fw-500" variant="body1">
                  Novice
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1">Completed 10 tasks with 98% min rating </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Earn £800 or more</Typography>
                  </li>
                </ul>
              </Box>
            </Box>
          </Grid>

          {/* Gigs */}
          <Grid item xs={12} sm={5.8} md={5.7} lg={5.7} className="d-flex flex-wrap align-items-center my-2">
            <Box className="col-12 col-lg-6 d-flex gap-2 w-100">
              <CheckCircle sx={{ color: success }} />
              <Box>
                <Typography className="fw-500" variant="body1">
                  Nynx Pro
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1">Complete at least 60 tasks with 98% min rating</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Earn £5000 or more</Typography>
                  </li>
                </ul>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Seller level Summary */}
      <Box>
        <Divider />
        {/* ROW-3 HEADER */}
        <Box className="d-flex align-items-center justify-content-between flex-wrap py-3 px-4">
          <Box className="col-12 col-xl">
            <Typography className="fw-500" variant="h6">
              Your Seller Level Summary
            </Typography>
          </Box>
        </Box>

        {/* ROW-3 BODY */}
        <Box className="py-3 px-4">
          <Grid container className="flex-wrap align-items-center justify-content-between">
            {/* Completed Order */}
            <Grid
              item
              xs={12}
              sm={5.8}
              md={5.7}
              lg={5.7}
              className="d-flex flex-wrap align-items-center my-2"
            >
              <Box className="col-12 col-lg-6 d-flex align-items-center gap-2">
                <CheckCircle sx={{ color: isCompletedOrderCriteriaCompleted ? success : lightYellow }} />

                <Typography className="fw-500" variant="body1">
                  Completed Order
                </Typography>
              </Box>
              <Box className="col-12 col-lg-6 px-2">
                <ProgressBar
                  isFixed
                  min="0"
                  max={requiredCompletedOrders?.toString()}
                  value={isCompletedOrderCriteriaCompleted ? 100 : +completedOrdersValue}
                />
              </Box>
            </Grid>

            {/* Total Earning */}
            <Grid
              item
              xs={12}
              sm={5.8}
              md={5.7}
              lg={5.7}
              className="d-flex flex-wrap align-items-center my-2"
            >
              <Box className="col-12 col-lg-6 d-flex align-items-center gap-2">
                <CheckCircle sx={{ color: isRequiredEarningCriteriaIsCompleted ? success : lightYellow }} />

                <Typography className="fw-500" variant="body1">
                  Total Earning
                </Typography>
              </Box>

              <Box className="col-12 col-lg-6 px-2">
                <ProgressBar
                  isFixed
                  min="0"
                  max={`$${requiredTotalEarning}`}
                  value={isRequiredEarningCriteriaIsCompleted ? 100 : +requiredEarningValue}
                />
              </Box>
            </Grid>

            {/* Rating */}
            <Grid
              item
              xs={12}
              sm={5.8}
              md={5.7}
              lg={5.7}
              className="d-flex flex-wrap align-items-center my-2"
            >
              <Box className="col-12 col-lg-6 d-flex align-items-center gap-2">
                <CheckCircle sx={{ color: isRequiredRatingCriteriaCompleted ? success : lightYellow }} />

                <Typography className="fw-500" variant="body1">
                  Rating
                </Typography>
              </Box>

              <Box className="col-12 col-lg-6 px-2">
                <ProgressBar isFixed min="0" max="5" value={+overAllRatingValue || 0} />
              </Box>
            </Grid>

            {/* Gigs */}
            <Grid
              item
              xs={12}
              sm={5.8}
              md={5.7}
              lg={5.7}
              className="d-flex flex-wrap align-items-center my-2"
            >
              <Box className="col-12 col-lg-6 d-flex align-items-center gap-2">
                <CheckCircle sx={{ color: isReuirementGigCriteriaCompleted ? success : lightYellow }} />

                <Typography className="fw-500" variant="body1">
                  Skill Set
                </Typography>
              </Box>

              <Box className="col-12 col-lg-6 px-2">
                <ProgressBar isFixed min="0" max={requiredGig?.toString()} value={+requiredGigValue || 0} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

ExpertLevelInfo.propTypes = {
  sellerLevelData: PropTypes.object,
};

ExpertLevelInfo.defaultProps = {
  sellerLevelData: {},
};

export default ExpertLevelInfo;
