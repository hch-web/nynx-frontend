/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Typography, Button, useTheme, Menu, ListItemButton, Rating } from '@mui/material';
import propTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

// styles
import {
  freelancerTaskGigImageStyles,
  listItemBtnStyles,
  workspaceListItemActionButtonStyles,
} from 'styles/mui/portal/workspace-styles';

// IMAGES & UTILITIES
import dotsIcon from 'assets/Dots.svg';
import {
  MONTHLY,
  MONTHLY_BASED,
  PROJECT_BASED,
  IN_PROGRESS,
  IN_REVISION,
  FIXED,
  ADHOC,
  COMPLETED,
} from 'utilities/constants';

// helpers
import { formatTimeline, getFormatedTaskStatus, formatEndDate } from 'utilities/helpers';
import { conditionalIcon } from '../utilities/helper';

function TaskDetails({ orderDetail, workspaceId }) {
  const theme = useTheme();
  const [taskMenu, setTaskMenu] = useState(null);

  const navigate = useNavigate();

  // COLORS
  const colors = theme.palette;
  const hover = colors.hover.main;

  // HANDLERS
  const handleOpenMenu = e => {
    setTaskMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setTaskMenu(null);
  };

  const handleNavigate = () => {
    handleCloseMenu();
    navigate('/contact-us', {
      state: {
        orderDetail: { orderId: orderDetail?.order_number, subject: 'task_report' },
      },
    });
  };

  // constants
  const isAdhocBudget = orderDetail?.budget_type === PROJECT_BASED;
  const budgetType = isAdhocBudget ? FIXED : MONTHLY;
  const taskTimeline = `Started - ${moment(orderDetail?.hiring_date).format('D MMM, YYYY')}`;
  const rating = orderDetail?.rating;
  const orderStatus = orderDetail?.status;
  const { value, variant: btnVariant } = getFormatedTaskStatus(orderDetail?.status);
  const taskSubHeading = orderStatus !== COMPLETED && orderStatus !== IN_PROGRESS && taskTimeline;
  const dateObject = formatEndDate(
    orderDetail?.delivery_date,
    orderDetail?.budget_type,
    orderDetail?.status,
    orderDetail?.completed_at
  );

  return (
    <Box
      className="d-flex align-items-center my-2 py-2 px-1"
      sx={{ ':hover': { background: hover, color: 'unset' }, background: 'transparent' }}
    >
      <Box
        className="col-11 d-flex align-items-center text-decoration-none"
        component={Link}
        to={`/portal/workspace/${workspaceId}/task/${orderDetail?.id}/${orderDetail?.task_via}`}
        sx={{ color: 'unset', ':hover': { color: 'unset' } }}
      >
        <Box className="col-6">
          <Box className="d-flex align-items-center gap-2">
            <Box
              sx={{
                background: `url(${orderDetail?.main_image}) center no-repeat`,
                ...freelancerTaskGigImageStyles,
              }}
            />
            <Box className="d-flex h-100 flex-column">
              <Typography variant="caption1" className=" fw-bold d-block">
                $ {orderDetail?.rates}/{isAdhocBudget ? ADHOC : MONTHLY}
              </Typography>

              <Typography variant="caption" className="mt-2">
                {`${budgetType}`} Budget
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="col-2">
          <Box className="d-flex align-items-center gap-2">
            <Box className="d-flex h-100 flex-column">
              <Box className="d-flex align-items-center">
                <Box>
                  <Typography variant="body2" className="fw-600">
                    {dateObject?.label}
                  </Typography>

                  <Typography variant="body2">{dateObject?.value}</Typography>
                </Box>

                {dateObject?.timer && <img src={dateObject?.timer} alt="timer" />}
              </Box>

              <Typography variant="body2" className="text-muted">
                {taskSubHeading}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="col-auto mx-auto d-flex align-items-center flex-column gap-2">
          {orderDetail?.status === COMPLETED && <Rating readOnly value={rating} size="small" />}

          <Button variant={btnVariant}>{value}</Button>
        </Box>
      </Box>

      {orderDetail?.status === (IN_PROGRESS || IN_REVISION) && (
        <Box className="col-auto ms-auto align-self-center position-relative">
          <Box
            onClick={handleOpenMenu}
            className="d-flex align-items-center justify-content-center"
            sx={workspaceListItemActionButtonStyles}
          >
            <img src={dotsIcon} alt="menu-dots" />
          </Box>
        </Box>
      )}

      <Menu anchorEl={taskMenu} open={!!taskMenu} onClose={handleCloseMenu}>
        <ListItemButton sx={listItemBtnStyles} onClick={handleNavigate}>
          <Typography variant="body1" className="text-danger">
            Cancel Task
          </Typography>
        </ListItemButton>
      </Menu>
    </Box>
  );
}

TaskDetails.propTypes = {
  orderDetail: propTypes.object.isRequired,
  workspaceId: propTypes.number.isRequired,
};

export default TaskDetails;
