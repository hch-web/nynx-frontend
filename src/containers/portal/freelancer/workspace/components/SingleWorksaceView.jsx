import React, { useState, useEffect } from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { v4 } from 'uuid';

// API HOOKS
import { useGetFreelancerWorkspaceQuery } from 'services/private/workspace/workspace';

// CUSTOM HOOKS
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import {
  workspaceHeaderCardSubTitleStyles,
  workspaceCardStyles,
  workspaceHeaderCardTitleStyles,
  workspaceResponsiveWidth,
  workspaceTotalBudgetCardStyle,
} from 'styles/mui/portal/workspace-styles';

// COMPONENTS
import TabPanel from 'containers/common/components/TabPanel';
import JobPostingTabPanel from 'containers/portal/common/JobPostingTabPanel';
import { formatStatus } from 'containers/portal/client/workspace/utilities/helper-functions';
import ActivityTabPanel from 'containers/portal/common/ActivityTabPanel';
import DeliverableTabPanel from './workspace-tabs/DeliverableTabPanel';
import FreelancerTabPanel from './workspace-tabs/FreelancerTabPanel';
import TaskTabPanel from './workspace-tabs/TasksTabPanel';

function SingleWorkspaceView() {
  // REFERENCING HOOKS
  const theme = useTheme();
  const { workspaceId } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  // API HOOKS
  const { data: workspaceDetail } = useGetFreelancerWorkspaceQuery(workspaceId, {
    skip: !workspaceId,
  });

  // STATE HOOKS
  const [currentTab, setCurrentTab] = useState(0);

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const lightOrange = colors.lightOrange.main;

  // HANDLER FUNCTIONS
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  // CONSTANTS
  const createdDate = moment(workspaceDetail?.created_at).format('MMM D, YYYY');
  const status = workspaceDetail?.status;

  useEffect(() => {
    invalidatePrivateTags(['GetFreelancerWorkspace']);
  }, []);

  return (
    <Container variant="portal">
      {/* HEADER BOX CONTAINER */}
      <Box className="pb-0 common-border bg-white p-4">
        {/* HEADER WITH TITLE & BUTTONS */}
        <Box className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-3">
          <Box className="col-12 col-md-7 col-lg-8 col-xl-9">
            <Typography variant="h3">{workspaceDetail?.title}</Typography>
          </Box>

          <Box className="col-12 col-md-5 col-lg-4 col-xl-3 d-flex align-items-center justify-content-end">
            <Typography variant="body2" className="text-muted">
              {createdDate}
            </Typography>

            <Button className="mx-3 text-capitalize" variant="success">
              {formatStatus(status)}
            </Button>
          </Box>
        </Box>

        {/* HEADER CARDS WITH IMAGES */}
        <Box className="d-flex flex-column flex-md-row align-items-center justify-content-between">
          <Stack
            sx={workspaceResponsiveWidth}
            direction={{ xs: 'column', sm: 'row', md: 'row' }}
            spacing={2}
            className="align-items-center mb-3 mb-md-0"
          >
            <Card sx={workspaceCardStyles}>
              <CardContent>
                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardTitleStyles}>
                  {`$${workspaceDetail?.completed_budget}`}
                </Typography>

                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardSubTitleStyles}>
                  Total Earned
                </Typography>
              </CardContent>
            </Card>

            <Card sx={workspaceTotalBudgetCardStyle}>
              <CardContent>
                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardTitleStyles}>
                  {`$${workspaceDetail?.total_task_budget}`}
                </Typography>

                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardSubTitleStyles}>
                  Total Payments
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          <AvatarGroup className="ms-3">
            {workspaceDetail?.freelancers?.map(user => (
              <Avatar key={v4()} src={user || ''} alt="user">
                {user.length && user[0]}
              </Avatar>
            ))}
          </AvatarGroup>
        </Box>

        <Divider light className="my-3" />

        {/* TABS */}
        <Box>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            variant="scrollable"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-indicator': { background: lightOrange },
              '& .Mui-selected': { color: `${lightOrange} !Important` },
            }}
          >
            <Tab label="Job Posting" />
            <Tab label="Freelancer" />
            <Tab label="Tasks" />
            <Tab label="Activity" />
            <Tab label="Deliverable" />
          </Tabs>
        </Box>
      </Box>

      <Box className="mt-3" sx={{ borderRadius: '20px' }}>
        <TabPanel stateValue={currentTab} index={0}>
          <JobPostingTabPanel />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={1}>
          <FreelancerTabPanel />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={2}>
          <TaskTabPanel />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={3}>
          <ActivityTabPanel />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={4}>
          <DeliverableTabPanel />
        </TabPanel>
      </Box>
    </Container>
  );
}

export default SingleWorkspaceView;
