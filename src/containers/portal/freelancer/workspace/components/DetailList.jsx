import React from 'react';
import { Box, Typography, useTheme, Avatar, AvatarGroup, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

// utilities
import { formatName } from 'containers/public-pages/services/single-service/utililites/helper';

// components
import TaskDetails from './TaskDetails';

function DetailList({ workspace, isBottomDividerLine }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // CONSTANTS
  const ClientName = formatName(
    workspace?.ws_owner_first_name,
    workspace?.ws_owner_last_name,
    workspace?.ws_owner_usernme
  );

  return (
    <Box className="row p-3 py-4 justify-content-end w-100 pointer bg-white mb-1">
      {/* WORKSPACE TITLE WITH LINK */}
      <Box className="col-5 pe-3">
        <Typography
          component={Link}
          to={`/portal/freelancer/workspace/${workspace?.id}`}
          variant="h6"
          className="text-decoration-none"
          color={darkPurple}
        >
          {workspace?.title}
        </Typography>

        <Box className="d-flex align-items-center">
          <Typography variant="caption1">
            Hired by <span className="fw-bold">{ClientName}</span>
          </Typography>

          <AvatarGroup className="ms-3" max={8} total={workspace?.freelancers?.length}>
            {workspace?.freelancers?.map(freelancer => (
              <Avatar
                component={Link}
                to={`/profile/${freelancer?.profile_id}`}
                key={freelancer?.profile_id}
                src={freelancer?.profile_image}
                alt={freelancer?.username}
                className="pointer"
              />
            ))}
          </AvatarGroup>
        </Box>
      </Box>

      <Stack
        className="col-7"
        direction="column"
        divider={<Divider className="my-1" orientation="horizontal" light />}
      >
        {workspace?.orders?.map(order => (
          <TaskDetails key={order?.id} orderDetail={order} workspaceId={workspace?.id} />
        ))}
      </Stack>
      {isBottomDividerLine && (
        <Box className="ms-2">
          <Divider light />
        </Box>
      )}
    </Box>
  );
}

DetailList.propTypes = {
  workspace: propTypes.object.isRequired,
  isBottomDividerLine: propTypes.bool,
};

DetailList.defaultProps = {
  isBottomDividerLine: false,
};

export default DetailList;
