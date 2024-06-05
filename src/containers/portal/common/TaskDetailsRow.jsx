import React from 'react';
import propTypes from 'prop-types';
import { Avatar, Box, Button, Rating, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

// IMAGES
import blankImage from 'assets/jobPostingBlank.png';

// COMPONENTS & UTILITIES
import { ADHOC, COMPLETED, IN_PROGRESS, MONTHLY, PROJECT_BASED } from 'utilities/constants';
import { formatEndDate, getFormatedTaskStatus } from 'utilities/helpers';
import { tasksDetailsTableRowStyles, tasksGigMainImgStyles } from 'styles/mui/portal/workspace-styles';

function TaskDetailsRow({ tasksData }) {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const {
    userInfo: { id: loggedUserId, is_buyer: isBuyer },
  } = useSelector(state => state.auth);

  const handleNavigateToSingleTaskManagement = (freelancerId, taskId, taskVia) => {
    if (isBuyer) {
      navigate(`/portal/workspace/${workspaceId}/task/${taskId}/${taskVia}`);
    } else if (freelancerId === loggedUserId) {
      navigate(`/portal/workspace/${workspaceId}/task/${taskId}/${taskVia}`);
    }
  };

  const ShowBudget = freelancerId => {
    if (isBuyer) {
      return true;
    }
    if (freelancerId === loggedUserId) {
      return true;
    }
    return false;
  };

  return (
    <Box className="d-flex flex-column align-items-start p-0 w-100">
      {tasksData?.length > 0 ? (
        tasksData?.map(row => {
          const fullName = `${row?.first_name} ${row?.last_name}`;
          const budgetType = row?.budget_type === PROJECT_BASED ? ADHOC : MONTHLY;
          const rowStatus = row?.status;
          const taskTimeline = `Started - ${moment(row?.hiring_date).format('D MMM, YYYY')}`;
          const taskLabel = rowStatus !== COMPLETED && rowStatus !== IN_PROGRESS && taskTimeline;
          const { value: statusValue, variant: btnVariant } = getFormatedTaskStatus(rowStatus);
          const taskTime = formatEndDate(row?.delivery_date, row?.budget_type, rowStatus, row?.completed_at);
          const freelancerId = row?.freelancer_id;

          return (
            <Box
              key={row.id}
              className="row mx-0 py-3 px-4 w-100 text-decoration-none"
              sx={tasksDetailsTableRowStyles}
              onClick={() => handleNavigateToSingleTaskManagement(freelancerId, row?.id, row?.task_via)}
            >
              <Box className="col-2 ps-0 d-flex align-items-start">
                <Avatar className="me-2" src={row?.prof_img} alt="A" />

                <Typography variant="body2" className="fw-600">
                  {fullName}
                </Typography>
              </Box>

              <Box className="col-4 d-flex align-items-start gap-2">
                <Box
                  sx={{
                    background: `#f3f3f3 url(${row?.gig_main_image}) no-repeat center`,
                    ...tasksGigMainImgStyles,
                  }}
                />

                <Typography variant="body2" className="fw-600 mb-2 align-self-center">
                  {row?.title}
                </Typography>
              </Box>

              <Box className="col-2">
                {ShowBudget(freelancerId) && (
                  <>
                    <Typography variant="body2" className="fw-600 mb-2">
                      {`$${Math.floor(row?.rates)}`}
                    </Typography>

                    <Typography variant="body2" className="text-muted text-capitalize">
                      {budgetType}
                    </Typography>
                  </>
                )}
              </Box>

              <Box className="col-2">
                <Box className="d-flex align-items-start gap-1">
                  <Box>
                    <Typography variant="body2" className="fw-600">
                      {taskTime?.label}
                    </Typography>

                    <Typography variant="body2">{taskTime?.value}</Typography>
                  </Box>

                  {taskTime?.timer && <img src={taskTime?.timer} alt="timer" />}
                </Box>

                <Typography variant="body2" className="text-muted">
                  {taskLabel}
                </Typography>
              </Box>

              <Box className="col-2  mx-auto gap-2">
                {rowStatus === COMPLETED && (
                  <Rating readOnly className="mb-2" size="small" value={row?.freelancer_rating} />
                )}

                <Button className="d-block" variant={btnVariant}>
                  {statusValue}
                </Button>
              </Box>
            </Box>
          );
        })
      ) : (
        <Box className="d-flex flex-column align-items-center justify-content-center w-100 py-5">
          <img src={blankImage} alt="Blank-Record-Img" />

          <Typography variant="h6" className="fw-600 mt-3 text-muted">
            No Record Found!
          </Typography>
        </Box>
      )}
    </Box>
  );
}

TaskDetailsRow.propTypes = {
  tasksData: propTypes.array.isRequired,
};

export default TaskDetailsRow;
