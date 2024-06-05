import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

// API HOOKS
import { useLazyGetFreelancerWorkspacesListQuery } from 'services/private/workspace/workspace';
import { useGetAnalyticsDetailsQuery } from 'services/private/payments/analytics';

// IMAGES
import dashboardImg from 'assets/client-dashboard.png';

// STYLES
import {
  analyticsBorderStyles,
  toggleButtonStyles,
  workspaceMainTableBodyStyles,
} from 'styles/mui/portal/workspace-styles';

// COMPONENTS & UTILITIES
import SectionLoader from 'containers/common/loaders/SectionLoader';
import DetailList from '../workspace/components/DetailList';
import WithdrawAmountModal from '../analytics/components/WithdrawAmountModal';

function FreelancerDashboard() {
  const [workSpaceType, setWorkSpaceType] = useState('');
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

  // API HOOKS
  const [getFreelancerWorkspaces, { data: workspaces, isLoading, isFetching }] = useLazyGetFreelancerWorkspacesListQuery();

  const { data: analyticsDetails, refetch: freelancerAnalyticsDetailsRefetch } = useGetAnalyticsDetailsQuery();

  useEffect(() => {
    getFreelancerWorkspaces({ status: '' });
    freelancerAnalyticsDetailsRefetch();
  }, []);

  // HANDLER FUNCTIONS
  const handleWorkSpaceType = (_, value) => {
    if (value !== null) {
      setWorkSpaceType(value);
      getFreelancerWorkspaces({ status: value });
    }
  };

  const toggleWithdrawModal = () => {
    setWithdrawModalOpen(!isWithdrawModalOpen);
  };

  // Constants
  const isWithdrawAvailable = Number(analyticsDetails?.available_balance);
  const InEscrow = analyticsDetails?.panding_balance || 0; // pending balance is used for inEscrow
  const pendingBalance = analyticsDetails?.panding_balance_for_escrow || 0;
  const availableBalance = analyticsDetails?.available_balance || 0;

  return (
    <Container variant="portal">
      <Box className="mb-4">
        <Typography variant="h3" className="fw-500">
          Dashboard
        </Typography>
      </Box>

      <Card className="p-3 bg-transparent mb-3">
        <Box className="d-flex align-items-start flex-wrap">
          <Box className="col-6 col-sm-4 col-md-4 col-lg p-2 text-center" sx={analyticsBorderStyles}>
            <Typography className="fw-500" variant="h5">
              ${InEscrow}
            </Typography>

            <Typography variant="body2">Escrow</Typography>
          </Box>

          <Box className="col-6 col-sm-4 col-md-4 col-lg p-2 text-center" sx={analyticsBorderStyles}>
            <Typography className="fw-500" variant="h5">
              ${pendingBalance}
            </Typography>

            <Typography variant="body2">Pending Clearance</Typography>
          </Box>

          <Box className="col-6 col-sm-4 col-md-4 col-lg p-2 text-center" sx={analyticsBorderStyles}>
            <Typography className="fw-500" variant="h5">
              ${availableBalance}
            </Typography>

            <Typography variant="body2">Available for Withdraw</Typography>
          </Box>

          <Box className="col-6 col-sm-4 col-md-4 col-lg p-2 text-center align-self-center mx-auto mx-sm-0">
            <Button
              variant="contained"
              color="secondary"
              className="px-4 py-2"
              onClick={toggleWithdrawModal}
              disabled={!isWithdrawAvailable}
            >
              {`Withdraw $${analyticsDetails?.available_balance || 0}`}
            </Button>
          </Box>
        </Box>
      </Card>

      {/* TASKS BOX */}
      <Box className="border px-3 py-3" sx={{ borderRadius: '15px' }}>
        {/* HEADER */}
        <Box className="d-flex flex-wrap align-items-center justify-content-between gap-4">
          <Box>
            <Typography className="fw-500" variant="h6">
              Tasks
            </Typography>
          </Box>

          {/* BUTTON TOOLBAR */}
          <Box>
            <ToggleButtonGroup
              exclusive
              value={workSpaceType}
              onChange={handleWorkSpaceType}
              color="secondary"
            >
              <ToggleButton sx={toggleButtonStyles} value="in_progress">
                In Progress
              </ToggleButton>

              <ToggleButton sx={toggleButtonStyles} value="in_revision">
                In Revision
              </ToggleButton>

              <ToggleButton sx={toggleButtonStyles} value="completed">
                Completed
              </ToggleButton>

              <ToggleButton sx={toggleButtonStyles} value="canceled">
                Canceled
              </ToggleButton>

              <ToggleButton sx={toggleButtonStyles} value="">
                All
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box className="px-3 py-3">
          {isLoading || isFetching ? (
            <Box
              className="d-flex justify-content-center align-items-center bg-white"
              sx={{ height: '40vh' }}
            >
              <SectionLoader />
            </Box>
          ) : (
            <Box>
              {workspaces?.length > 0 ? (
                <Box className="w-100" sx={{ overflow: 'auto' }}>
                  <Box sx={workspaceMainTableBodyStyles}>
                    <Box className="d-flex flex-column align-items-start pb-5">
                      {workspaces?.map(item => (
                        <DetailList workspace={item} key={item?.id} />
                      ))}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box className="py-3 d-flex flex-column align-items-center justify-content-center">
                  <img className="mw-100" src={dashboardImg} alt="empty-infographic" />

                  <Box className="my-3 text-center">
                    <Typography variant="body1" className="text-muted mb-3">
                      No Record Found!
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <WithdrawAmountModal
        isOpen={isWithdrawModalOpen}
        handleClose={toggleWithdrawModal}
        amount={analyticsDetails?.available_balance || '0'}
      />
    </Container>
  );
}

export default FreelancerDashboard;
