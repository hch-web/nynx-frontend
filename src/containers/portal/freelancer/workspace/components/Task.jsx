import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import propTypes from 'prop-types';

// styles
import { gigImageStyle } from 'styles/mui/portal/task-detail-styles';
import { tasksDetailsTableRowStyles } from 'styles/mui/portal/workspace-styles';
// utilities
import {
  MONTHLY,
  ADHOC,
  FIXED,
  MONTHLY_BASED,
  PROJECT_BASED,
  IN_PROGRESS,
  IN_REVISION,
} from 'utilities/constants';
import { formatTimeline } from 'utilities/helpers';
import {
  conditionalIcon,
  conditionalButtonBackgroundColor,
  conditionalTextColor,
  conditionalStatusText,
} from '../utilities/helper';

function Task({ taskDetail }) {
  const { workspaceId } = useParams();

  // constants
  const isAdhocBudget = taskDetail?.budget_type === PROJECT_BASED;
  const packageType = isAdhocBudget ? ADHOC : MONTHLY;
  const budgetType = isAdhocBudget ? FIXED : MONTHLY;
  const budgetTimelineBased = isAdhocBudget ? PROJECT_BASED : MONTHLY_BASED;
  const taskVia = taskDetail?.task_via;
  const taskId = taskDetail?.id;
  const showTimerIcon = taskDetail?.status === (IN_PROGRESS || IN_REVISION);

  return (
    <Box
      className="w-100 row p-2 text-decoration-none m-0"
      component={Link}
      to={`/portal/workspace/${workspaceId}/task/${taskId}/${taskVia}`}
      sx={{ color: 'initial', ...tasksDetailsTableRowStyles }}
    >
      <Box className="col-5 p-0">
        <Box className="d-flex gap-2">
          <Box
            sx={{
              background: `url(${taskDetail?.gig_main_image}) center no-repeat`,
              ...gigImageStyle,
            }}
          />
          <Typography variant="caption" className="mb-1 weight-600">
            {taskDetail?.title}
          </Typography>
        </Box>
      </Box>
      <Box className="col-2 p-0">
        <Box className="d-flex flex-column">
          <Box>
            <Typography variant="caption1" className="weight-600">
              ${taskDetail?.rates}
            </Typography>
            <Typography variant="caption1">/{packageType}</Typography>
          </Box>
          <Typography variant="caption1">{budgetType} Budget</Typography>
        </Box>
      </Box>
      <Box className="col-2 p-0">
        <Box>
          <Typography variant="caption1" className=" fw-bold ">
            {formatTimeline(taskDetail?.timeline, budgetTimelineBased)}
          </Typography>
          {showTimerIcon && (
            <img
              src={conditionalIcon(taskDetail?.status)}
              className="ms-1"
              alt="icon"
              style={{ width: '20px' }}
            />
          )}
        </Box>
        <Typography variant="caption1">Time</Typography>
      </Box>
      <Box className="col-2 p-0">
        <Button
          variant="contained"
          sx={{
            borderRadius: '5px',
            backgroundColor: conditionalButtonBackgroundColor(taskDetail?.status),
            color: conditionalTextColor(taskDetail?.status),
          }}
        >
          <Typography variant="body2" className="text-disabled text-capitalize">
            {conditionalStatusText(taskDetail?.status)}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

Task.propTypes = {
  taskDetail: propTypes.object.isRequired,
};

export default Task;
