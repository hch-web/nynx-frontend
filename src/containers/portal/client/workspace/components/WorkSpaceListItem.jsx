import React, { useRef, useState } from 'react';
import { Avatar, AvatarGroup, Box, ListItemButton, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';

// API HOOKS
// import { useDeleteWorkspaceMutation } from 'services/private/workspace/workspace';

// STYLES
import {
  avatarStyles,
  firstAvatarStyles,
  workspaceListItemActionButtonStyles,
} from 'styles/mui/portal/workspace-styles';

// IMAGES
import dotsIcon from 'assets/Dots.svg';
import Menu from 'shared/components/CustomMenu';

// UTILITIES
import { getFormatedTaskStatus } from 'utilities/helpers';

function WorkSpaceListItem({ item }) {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const actionRef = useRef(null);

  // API HOOKS
  // const [deleteWorkspace] = useDeleteWorkspaceMutation();

  // HANDLER FUNCTIONS
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleDeleteWorkspace = async id => {
  //   await deleteWorkspace(id);
  // };

  // CONSTANTS
  const tasks = item?.completed_task > 0
    ? `${item?.completed_task} Performed Tasks`
    : `${item?.active_task} Active Tasks`;

  const isDashboard = pathname.includes('/dashboard');

  const taskCreatedDate = moment(item?.created_at).format('D MMM, YYYY');

  const remainingHired = item?.freelancers?.length > 4 ? Number(item?.freelancers?.length) - 4 : null;

  const { color: statusColor, value: statusValue } = getFormatedTaskStatus(item?.status);

  const totalBudget = item?.total_task_budget;

  return (
    <Box
      className="mt-2 p-3 py-4 bg-white d-flex align-items-start w-100"
      key={item.id}
      sx={{ borderRadius: '10px' }}
    >
      {/* WORKSPACE TITLE WITH LINK */}
      <Box className="col-5 pe-3">
        <Typography sx={{ fontSize: '11px', marginTop: '-10px' }} variant="body2">
          {taskCreatedDate}
        </Typography>

        <Typography
          component={Link}
          to={`/portal/client/workspace/${item?.id}`}
          className="text-decoration-none"
          variant="workspaceTitle"
        >
          {item.title}
        </Typography>
      </Box>

      {/* WORKSPACE TASKS */}
      <Box className="col-2 d-flex flex-column align-items-start pe-3">
        <Typography variant="workspaceSubTitle">{tasks}</Typography>

        <Box className="d-flex flex-wrap gap-1">
          <Box>
            <Typography variant="body2" className="text-disabled">
              {isDashboard ? `Total Tasks: ${item?.total_task}` : taskCreatedDate}
            </Typography>
          </Box>

          {item?.cancel_task ? (
            <Box>
              <Typography variant="body2" className="text-danger">
                {`- ${item?.cancel_task} Cancelled`}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>

      {/* WORKSPACE BUDGET */}
      <Box className="col-2 d-flex flex-column align-items-start pe-3">
        <Typography variant="workspaceSubTitle">{`Budget $${totalBudget}`}</Typography>

        <Typography variant="body2" className="text-disabled text-capitalize" sx={{ color: statusColor }}>
          {statusValue}
        </Typography>
      </Box>

      {/* WORKSPACE TEAM */}
      <Box className="col-2 d-flex align-items-center pe-3 align-self-center">
        <AvatarGroup max={4} className="me-1">
          {item?.freelancers?.map((profile, idx) => (
            <Avatar
              key={profile}
              sx={idx === 0 ? firstAvatarStyles : avatarStyles}
              src={profile || ''}
              alt={profile}
            />
          ))}
        </AvatarGroup>

        <Typography variant="workspaceSubTitle">{remainingHired}</Typography>
      </Box>

      <Box className="col-auto ms-auto align-self-center position-relative">
        <Box
          ref={actionRef}
          onClick={handleToggleMenu}
          className="d-flex align-items-center justify-content-center"
          sx={workspaceListItemActionButtonStyles}
        >
          <img src={dotsIcon} alt="menu-dots" />
        </Box>

        {isMenuOpen && (
          <Menu targetRef={actionRef} setMenuState={setIsMenuOpen}>
            <ListItemButton>
              <Typography variant="body1">Delete</Typography>
            </ListItemButton>
          </Menu>
        )}
      </Box>
    </Box>
  );
}

WorkSpaceListItem.propTypes = {
  item: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    total_budget: propTypes.number,
    status: propTypes.string,
    active_task: propTypes.number,
    completed_task: propTypes.number,
    freelancers: propTypes.array,
    created_at: propTypes.string.isRequired,
    total_task: propTypes.number.isRequired,
    cancel_task: propTypes.number.isRequired,
    total_task_budget: propTypes.number.isRequired,
  }),
};

WorkSpaceListItem.defaultProps = {
  item: {
    active_task: 0,
    total_budget: 0,
    completed_task: 0,
    freelancers: [],
    status: 'pending',
  },
};

export default WorkSpaceListItem;
