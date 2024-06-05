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
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import moment from 'moment';

// API HOOKS
import { useGetWorkspaceQuery } from 'services/private/workspace/workspace';

// CUSTOM HOOKS
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import {
  workspaceCardStyles,
  workspaceHeaderCardSubTitleStyles,
  workspaceHeaderCardTitleStyles,
  workspaceResponsiveWidth,
  workspaceTotalBudgetCardStyle,
} from 'styles/mui/portal/workspace-styles';

// COMPONENTS & UTILITIES
import TabPanel from 'containers/common/components/TabPanel';
import ActivityTabPanel from 'containers/portal/common/ActivityTabPanel';
import DeliverableTabPanel from './workspace-tabs/DeliverableTabPanel';
import JobPostingTabPanel from './workspace-tabs/JobPostingTabPanel';
import FreelancerTabPanel from './workspace-tabs/FreelancerTabPanel';
import TasksTabPanel from './workspace-tabs/TasksTabPanel';
import WorkspaceTitleModalForm from './WorkspaceTitleModalForm';
import { formatStatus } from '../utilities/helper-functions';

function SingleWorkspaceView() {
  // REFERENCING HOOKS
  const theme = useTheme();
  const { workspaceId } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  // STATE HOOKS
  const [currentTab, setCurrentTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API HOOKS
  const { data: workspaceData } = useGetWorkspaceQuery(workspaceId, { skip: !workspaceId });

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const yellow = colors.yellow.main;
  const lightOrange = colors.lightOrange.main;

  // HANDLER FUNCTIONS
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace']);
  }, []);

  // CONSTANTS
  const createdDate = moment(workspaceData?.created_at).format('MMM D, YYYY');
  const status = workspaceData?.status;

  return (
    <Container variant="portal">
      {/* HEADER BOX CONTAINER */}
      <Box className="pb-0 common-border bg-white p-4">
        {/* HEADER WITH TITLE & BUTTONS */}
        <Box className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-3">
          <Box className="col-12 col-md-7 col-lg-8 col-xl-9">
            <Typography variant="h3">{workspaceData?.title}</Typography>
          </Box>

          <Box className="col-12 col-md-5 col-lg-4 col-xl-3 d-flex align-items-center justify-content-end">
            <Typography variant="body2" className="text-muted">
              {createdDate}
            </Typography>

            <Button className="mx-3 text-capitalize" variant="success">
              {formatStatus(status)}
            </Button>

            <IconButton onClick={handleToggleModal} sx={{ background: yellow }}>
              <Edit sx={{ color: darkPurple }} />
            </IconButton>

            <WorkspaceTitleModalForm isOpen={isModalOpen} handleToggle={handleToggleModal} />
          </Box>
        </Box>

        {/* HEADER CARDS WITH IMAGES */}
        <Box className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
          <Stack
            sx={workspaceResponsiveWidth}
            direction={{ xs: 'column', sm: 'row', md: 'row' }}
            spacing={2}
            className="align-items-center justify-content-center mb-3 mb-lg-0"
          >
            <Card sx={workspaceCardStyles}>
              <CardContent>
                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardTitleStyles}>
                  {`$${workspaceData?.pending_budget}`}
                </Typography>

                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardSubTitleStyles}>
                  Pending Tasks
                </Typography>
              </CardContent>
            </Card>

            <Card sx={workspaceCardStyles}>
              <CardContent>
                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardTitleStyles}>
                  {`$${workspaceData?.completed_budget}`}
                </Typography>

                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardSubTitleStyles}>
                  Paid Tasks
                </Typography>
              </CardContent>
            </Card>

            <Card sx={workspaceTotalBudgetCardStyle}>
              <CardContent>
                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardTitleStyles}>
                  {`$${workspaceData?.total_task_budget}`}
                </Typography>

                <Typography variant="body2" color={darkPurple} sx={workspaceHeaderCardSubTitleStyles}>
                  Total Budget
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          <AvatarGroup className="ms-3">
            {workspaceData?.freelancers?.map(user => (
              <Avatar key={v4()} src={user || ''} alt={user} />
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
          <TasksTabPanel />
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
