import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

// API HOOKS
import { useTaskDetailsQuery } from 'services/private/task-details';

// COMPONENT
import { COMPLETED } from 'utilities/constants';
import CountDownTimer from './CountDownTimer';
import CompletedTaskTime from './CompletedTaskTime';

function TimerCard() {
  const { taskId, taskVia } = useParams();

  // API HOOKS
  const { data: taskDetails } = useTaskDetailsQuery({ id: taskId, taskVia }, { skip: !(taskId && taskVia) });

  const deliveryDate = taskDetails?.delivery_date;
  const completedDate = taskDetails?.completed_at;
  const isDeliverableCreated = taskDetails?.deliverable;
  const isTaskCompleted = taskDetails?.status === COMPLETED;

  return isDeliverableCreated || isTaskCompleted ? (
    <CompletedTaskTime deliveryDate={deliveryDate} completedDate={completedDate} />
  ) : (
    <Box className="mt-2 mt-sm-0 align-self-stretch">
      <CountDownTimer endDate={taskDetails?.delivery_date} />
    </Box>
  );
}

export default TimerCard;
