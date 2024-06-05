import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { MoreHoriz, ArrowBackIos } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import moment from 'moment';

// API HOOKS
import { useTaskDetailsQuery } from 'services/private/task-details';

// CUSTOM HOOKS
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import {
  backButtonIconStyles,
  taskDetailsHeaderGigImg,
  taskDetailsHeaderGigTitle,
  workspaceContainerStyles,
  workspaceResponsiveWidth,
} from 'styles/mui/portal/workspace-styles';

// COMPONENTS & UTILITIES
import { IN_PROGRESS, IN_REVISION } from 'utilities/constants';
import TabPanel from 'containers/common/components/TabPanel';
import { formatName } from 'utilities/helpers';
import TaskDetailsRequirementsTabPanel from './TaskDetailsRequirementsTabPanel';
import TaskDetailTabPanel from './TaskDetailsDetailTabPanel';
import ChangeTaskBudgetTimeModal from './ChangeTaskBudgetTimeModal';
import RefundTaskModal from './RefundTaskModal';
import DeliverableFeedback from './DeliverableFeedback';
import { formatDate, formatStatus } from '../../utilities/helper-functions';
import ChangeTermRefundTaskDetails from '../ChangeTermRefundTaskDetails';
import CompletedTaskDetail from '../CompletedTaskDetail';
import TimerCard from '../../common/TimerCard';

function TaskDetails() {
  // REFERENCING HOOKS
  const theme = useTheme();
  const { taskId, taskVia } = useParams();
  const { invalidatePrivateTags } = useApiServices();
  const navigate = useNavigate();

  // STATE HOOKS
  const [currentTab, setCurrentTab] = useState(0);
  const [taskActionMenu, setTaskActionMenu] = useState(null);
  const [isBudgetTimeModalOpen, setIsBudgetTimeModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  const { is_buyer: isBuyer } = useSelector(state => state.auth.userInfo);

  // API HOOKS
  const { data: taskDetails } = useTaskDetailsQuery({ id: taskId, taskVia }, { skip: !(taskId && taskVia) });

  // COLORS
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;
  const darkPurple = colors.darkPurple.main;

  // HANDLER FUNCTIONS
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenTaskActionMenu = e => {
    setTaskActionMenu(e.currentTarget);
  };

  const handleCloseTaskActionMenu = () => {
    setTaskActionMenu(null);
  };

  const handleToggleChangeBudgetModal = () => {
    setIsBudgetTimeModalOpen(!isBudgetTimeModalOpen);
  };

  const handleToggleRefundModal = () => {
    setIsRefundModalOpen(!isRefundModalOpen);
  };

  const handleNavigateToContactUs = taskNumber => {
    handleCloseTaskActionMenu();
    navigate('/contact-us', {
      state: {
        orderDetail: { orderId: taskNumber, subject: 'task_report' },
      },
    });
  };

  useEffect(() => {
    invalidatePrivateTags(['GetSingleTaskDetails', 'ListChangeTerms', 'GetRequestRefundList']);
  }, []);

  const backToDashboard = () => {
    navigate(-1);
  };

  // Constants
  const currentDate = moment();
  const taskDeadline = taskDetails?.delivery_date;
  const timeline = taskDeadline ? moment(taskDeadline).diff(currentDate, 'milliseconds') : 0;
  const isTaskValidForChangeTerm = timeline > 0;

  return (
    <Container variant="portal">
      <Box className="d-flex align-item-start" mb={2}>
        <Stack direction="row" spacing={1} alignItems="center" onClick={backToDashboard} className="pointer">
          <ArrowBackIos sx={backButtonIconStyles} />
          <Typography variant="body1" color={darkPurple}>
            Back to this Workspace
          </Typography>
        </Stack>
      </Box>

      {/* HEADER BOX CONTAINER */}
      <Box className="pb-0" sx={workspaceContainerStyles}>
        {/* HEADER WITH TITLE & BUTTONS */}
        <Box className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-3">
          <Box className="col-12 col-md-7 col-lg-8 col-xl-9">
            <Typography variant="h3">{taskDetails?.workspace_title}</Typography>
          </Box>

          <Box className="col-12 col-md-5 col-lg-4 col-xl-3 d-flex align-items-center justify-content-end">
            <Typography variant="body2" className="text-muted">
              {formatDate(taskDetails?.delivery_date)}
            </Typography>

            <Button className="mx-3" variant="success">
              {formatStatus(taskDetails?.status)}
            </Button>
          </Box>
        </Box>

        {/* FREELANCER GIG + PROFILE & CARD WITH TIMER  */}
        <Box className="d-flex flex-column flex-xl-row align-items-center justify-content-start justify-content-xl-between">
          <Stack
            sx={workspaceResponsiveWidth}
            className="flex-column flex-sm-row align-items-center justify-content-between justify-content-xl-start mb-3 mb-xl-0 w-100"
          >
            {/* GIG IMAGE AND TITLE */}
            <Box className="order-2 order-sm-1 mt-2 mt-sm-0 d-flex flex-column flex-sm-row align-items-center justify-content-start mw-100">
              <Box
                sx={{
                  ...taskDetailsHeaderGigImg,
                  background: `rgba(0,0,0,0.2) url(${taskDetails?.gig_main_image})`,
                }}
              />

              <Typography
                variant="body1"
                className="ms-0 ms-sm-3 text-center text-sm-start"
                sx={taskDetailsHeaderGigTitle}
              >
                {taskDetails?.title}
              </Typography>
            </Box>

            <Box className="order-1 order-sm-2 ms-0 ms-xl-3 mb-2 mb-sm-0 d-flex align-items-center">
              <Avatar src={taskDetails?.prof_img} alt={taskDetails?.first_name} />

              <Typography className="ms-2" variant="body2" color={darkPurple}>
                {formatName(taskDetails?.first_name, taskDetails?.last_name)}
              </Typography>
            </Box>
          </Stack>

          <Stack
            sx={workspaceResponsiveWidth}
            spacing={2}
            className="flex-column flex-sm-row align-items-center justify-content-between justify-content-xl-end mb-0 w-100"
          >
            <Card className="align-self-stretch">
              <Box className="d-flex flex-column align-items-center align-items-md-start p-2">
                <Typography variant="body2" className="fw-500">
                  {`$${taskDetails?.rates}`}
                </Typography>

                <Typography variant="body2">Total Payments</Typography>
              </Box>
            </Card>

            {/* TIMER CARD */}
            <TimerCard />
          </Stack>
        </Box>

        <Divider light className="mt-3 mb-2" />

        {/* TABS */}
        <Box className="d-flex align-items-center justify-content-between">
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
            <Tab label="Requirements" />
            <Tab label="Details" />
            <Tab label="Delivery & Feedback" />
          </Tabs>

          {/* MENU BOX WRAPPER */}
          {(taskDetails?.status === IN_PROGRESS || taskDetails?.status === IN_REVISION) && (
            <Box>
              <IconButton onClick={handleOpenTaskActionMenu}>
                <MoreHoriz />
              </IconButton>

              <Menu
                open={Boolean(taskActionMenu)}
                anchorEl={taskActionMenu}
                onClose={handleCloseTaskActionMenu}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {!isBuyer && (
                  <Box>
                    {isTaskValidForChangeTerm && (
                      <MenuItem
                        onClick={() => {
                          handleCloseTaskActionMenu();
                          handleToggleChangeBudgetModal();
                        }}
                      >
                        Change Terms
                      </MenuItem>
                    )}

                    <MenuItem
                      onClick={() => {
                        handleCloseTaskActionMenu();
                        handleToggleRefundModal();
                      }}
                    >
                      Refund
                    </MenuItem>
                  </Box>
                )}

                <MenuItem
                  onClick={() => handleNavigateToContactUs(taskDetails?.order_number)}
                  className="text-danger"
                >
                  Cancel Task
                </MenuItem>
              </Menu>
            </Box>
          )}

          <ChangeTaskBudgetTimeModal
            isOpen={isBudgetTimeModalOpen}
            handleToggle={handleToggleChangeBudgetModal}
          />

          <RefundTaskModal isOpen={isRefundModalOpen} handleToggle={handleToggleRefundModal} />
        </Box>
      </Box>

      <ChangeTermRefundTaskDetails />

      <CompletedTaskDetail taskDetails={taskDetails} />

      {/* BODY BOX CONTAINER */}
      <Box className="mt-3">
        <TabPanel stateValue={currentTab} index={0}>
          <TaskDetailsRequirementsTabPanel gigId={taskDetails?.gig} />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={1}>
          <TaskDetailTabPanel />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={2}>
          <DeliverableFeedback />
        </TabPanel>
      </Box>
    </Container>
  );
}

export default TaskDetails;
