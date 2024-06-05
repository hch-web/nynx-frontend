import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

// API HOOKS
import { useLazyGetWorkspacesQuery } from 'services/private/workspace/workspace';
import { useRecentFreelancersQuery } from 'services/private/workspace/dashboard';

// STYLES
import { workspaceMainTableBodyStyles, toggleButtonStyles } from 'styles/mui/portal/workspace-styles';

// COMPONENTS & UTILITIES
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { formatName, getUniqueObjects } from 'utilities/helpers';
import { worskpaceListContainerLoader } from 'styles/mui/portal/dashboard-styles';
import WorkSpaceListItem from '../workspace/components/WorkSpaceListItem';

function ClientDashboard() {
  const [workSpaceType, setWorkSpaceType] = useState('');

  // API HOOKS
  const [getWorkspaces, { isFetching: workspaceDataFetching, data: workspaces }] = useLazyGetWorkspacesQuery();

  const {
    data: recentFreelancers,
    isFetching: recentFreelancersDataFetching,
    refetch: recentFreelancersRefetch,
    isLoading: recentFreelancersDataLoading,
  } = useRecentFreelancersQuery();

  useEffect(() => {
    getWorkspaces({ status: '' });
    recentFreelancersRefetch();
  }, []);

  // HANDLER FUNCTIONS
  const handleWorkSpaceType = (_, value) => {
    if (value !== null) {
      setWorkSpaceType(value);
      getWorkspaces({ status: value });
    }
  };

  return (
    <Container variant="portal">
      <Box className="mb-4">
        <Typography variant="h3" className="fw-500">
          Dashboard
        </Typography>
      </Box>

      {/* RECENT FREELANCERS WRAPPER */}
      <Box>
        <Card className="p-3 bg-transparent mb-3">
          <Typography variant="h6" className="fw-500">
            Recent Freelancers
          </Typography>
          {recentFreelancersDataFetching || recentFreelancersDataLoading ? (
            <Box>
              <SectionLoader />
            </Box>
          ) : (
            <Box className="d-flex align-items-center flex-wrap">
              {recentFreelancers?.length > 0
                && getUniqueObjects('id', recentFreelancers)?.map(item => (
                  <Box
                    key={item?.id}
                    className="col-6 col-sm-4 col-md-4 col-lg d-flex align-items-center p-2 gap-2 text-decoration-none color-initial"
                    component={Link}
                    to={`/profile/${item?.id}`}
                  >
                    <Avatar src={item?.image} alt={item?.first_name} />

                    <Box>
                      <Typography className="fw-500" variant="body1">
                        {formatName(item?.first_name, item?.last_name, item?.username)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          )}
        </Card>
      </Box>
      <Box className="border px-3 py-3" sx={{ borderRadius: '15px' }}>
        {/* HEADER */}
        <Box className="d-flex flex-wrap align-items-center justify-content-between gap-4">
          <Box>
            <Typography className="fw-500" variant="h6">
              Workspace
            </Typography>
          </Box>

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
        {workspaceDataFetching ? (
          <Box sx={worskpaceListContainerLoader}>
            <SectionLoader />
          </Box>
        ) : (
          <Box className="px-3 py-3">
            {workspaces?.length > 0 ? (
              <Box className="w-100" sx={{ overflow: 'auto' }}>
                <Box sx={workspaceMainTableBodyStyles}>
                  <Box className="d-flex flex-column align-items-start pb-5">
                    {workspaces?.map(item => (
                      <WorkSpaceListItem item={item} key={item?.id} />
                    ))}
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box className="py-3 d-flex flex-column align-items-center justify-content-center">
                <Typography variant="body1">No Record Found</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default ClientDashboard;
