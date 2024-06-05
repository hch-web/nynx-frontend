import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Typography, Grid } from '@mui/material';

// API HOOKS
import {
  useGetAnalyticsDetailsQuery,
} from 'services/private/payments/analytics';
import { useLazyGetUserSellerLevelAnalyticsQuery } from 'services/private/analytics';

// COMPONENTS & UTILITIES & Styles
import { analyticsBorderStyles } from 'styles/mui/portal/analytics-styles';
import SelectField from 'shared/components/form/SelectField';
import RatingCard from './components/RatingCard';
import WithdrawAmountModal from './components/WithdrawAmountModal';
import ExpertLevelInfo from './components/ExpertLevelInfo';
import { getMonthListTillCurrentMonth } from './utilities/helper';

function Analytics() {
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    month: {},
  });

  // API HOOKS
  // const [getAsyncAnalyticDetails] = useGetWalletDetailsMutation();
  const [getUserSellerLevelAnalytics, { data: sellerLevelData }] = useLazyGetUserSellerLevelAnalyticsQuery();
  const { data: analyticsDetails } = useGetAnalyticsDetailsQuery(filters);

  useEffect(() => {
    getUserSellerLevelAnalytics();
  }, []);

  // HANDLERS
  const toggleWithdrawModal = () => {
    setWithdrawModalOpen(!isWithdrawModalOpen);
  };

  const handleSetMonthFilters = value => {
    setFilters({ month: value });
  };

  // Current Month
  const date = new Date();
  const currentMonth = date.getMonth();

  // CONSTANTS
  const isWithdrawAvailable = Number(analyticsDetails?.available_balance);
  const totalEarning = analyticsDetails?.total_earning || 0;
  const averageTaskPrice = analyticsDetails?.average_task_price || 0;
  const totalCompletedTask = analyticsDetails?.total_completed_task || 0;
  const totalCanceledTask = analyticsDetails?.total_canceled_task || 0;
  const InEscrow = analyticsDetails?.panding_balance || 0; // Panding balance works as Escrow
  const pendingBalance = analyticsDetails?.panding_balance_for_escrow || 0;
  const availableBalance = analyticsDetails?.available_balance || 0;
  const totalTask = analyticsDetails?.total_task || 0;

  const monthFilterOptions = [
    { label: 'This Month', value: currentMonth + 1 },
    ...getMonthListTillCurrentMonth(),
  ];

  return (
    <Container variant="portal">
      <Box className="d-flex align-items-center justify-content-between flex-wrap">
        <Typography className="fw-500" variant="h3">
          Analytics
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          className="px-3 py-2"
          onClick={toggleWithdrawModal}
          disabled={!isWithdrawAvailable}
        >
          {`Withdraw $${analyticsDetails?.available_balance || 0}`}
        </Button>
      </Box>

      <Box className="my-3 d-flex flex-column align-items-stretch">
        {/* ROW-1 */}
        <Card className="d-flex align-items-center flex-wrap flex-lg-nowrap bg-white py-3 px-4 overflow-visible">
          <Grid container spacing={2}>
            <Grid item xxl={2.3} lg={4} md={6} sm={6} xs={12}>
              <Box className="text-center" sx={analyticsBorderStyles}>
                <Typography className="fw-500" variant="h4">
                  ${totalEarning}
                </Typography>
                <Typography variant="body2">Total Income</Typography>
              </Box>
            </Grid>
            <Grid item xxl={2.3} lg={4} md={6} sm={6} xs={12}>
              <Box className="text-center" sx={analyticsBorderStyles}>
                <Typography className="fw-500" variant="h4">
                  {totalTask}
                </Typography>
                <Typography variant="body2">Total Task</Typography>
              </Box>
            </Grid>
            <Grid item xxl={2.3} lg={4} md={6} sm={6} xs={12}>
              <Box className="text-center" sx={analyticsBorderStyles}>
                <Typography className="fw-500" variant="h4">
                  {totalCompletedTask}
                </Typography>

                <Typography variant="body2">Completed Tasks</Typography>
              </Box>
            </Grid>
            <Grid item xxl={2.3} lg={4} md={6} sm={6} xs={12}>
              <Box className="text-center" sx={analyticsBorderStyles}>
                <Typography className="fw-500" variant="h4">
                  {totalCanceledTask}
                </Typography>
                <Typography variant="body2">Cancelled Tasks</Typography>
              </Box>
            </Grid>
            <Grid item xxl={2.8} lg={4} md={6} sm={6} xs={12}>
              <Box className="d-flex justify-content-center w-100">
                <SelectField
                  options={monthFilterOptions}
                  value={filters?.month}
                  onChange={handleSetMonthFilters}
                  placeholder="Select Filter"
                />
              </Box>
            </Grid>
          </Grid>
        </Card>

        {/* ROW-2 */}
        <Card className="d-flex align-items-center flex-wrap flex-sm-nowrap bg-white py-3 px-4 overflow-visible mt-3">
          <Box className="col-12 col-sm-3 text-center" sx={analyticsBorderStyles}>
            <Typography className="fw-500" variant="h4">
              ${InEscrow}
            </Typography>

            <Typography variant="body2">In Escrow</Typography>
          </Box>
          <Box className="col-12 col-sm-3 text-center" sx={analyticsBorderStyles}>
            <Typography className="fw-500" variant="h4">
              ${pendingBalance}
            </Typography>

            <Typography variant="body2">Pending Clearance</Typography>
          </Box>

          <Box className="col-12 col-sm-3 text-center" sx={analyticsBorderStyles}>
            <Typography className="fw-500" variant="h4">
              ${averageTaskPrice}
            </Typography>
            <Typography variant="body2">Average Task Price</Typography>
          </Box>

          <Box className="col-12 col-sm-3 text-center">
            <Typography className="fw-500" variant="h4">
              ${availableBalance}
            </Typography>

            <Typography variant="body2">Available for Withdraw</Typography>
          </Box>
        </Card>

        {/* ROW-3 */}
        <ExpertLevelInfo sellerLevelData={sellerLevelData} />

        {/* ROW-5 */}
        <RatingCard />
      </Box>

      <WithdrawAmountModal
        isOpen={isWithdrawModalOpen}
        handleClose={toggleWithdrawModal}
        amount={analyticsDetails?.available_balance}
        getUserSellerLevelAnalytics={getUserSellerLevelAnalytics}
      />
    </Container>
  );
}

export default Analytics;
