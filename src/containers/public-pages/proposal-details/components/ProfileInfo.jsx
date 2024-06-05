import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import propTypes from 'prop-types';
import moment from 'moment';

// styles
import { ClientProfileImageStyles } from 'styles/mui/public-pages/submitted-proposal-styles/proposal-styles';

// components
import Rating from 'containers/common/components/Rating';
import { formatName } from 'utilities/helpers';

function ProfileInfo({ client }) {
  const theme = useTheme();
  const colors = theme.palette;
  const primary = colors.primary.main;
  const darkPurple = colors.darkPurple.main;

  // constants
  const firstName = client?.first_name;
  const lastName = client?.last_name;
  const userName = client?.username;

  return (
    <Box sx={{ border: '1px solid #ECE9EB', borderRadius: '10px' }}>
      <Box className="p-3 d-flex flex-column justify-content-center align-items-center">
        <Box
          sx={{
            background: `url(${client?.image}) no-repeat`,
            ...ClientProfileImageStyles,
          }}
        />
        <Typography variant="h3" color={primary} className="d-block mt-3">
          {formatName(firstName, lastName, userName)}
        </Typography>
        <Box className="d-flex justify-content-center align-items-center mt-3">
          <Rating name="rating-value" value={5} className="ratingIcons" size="medium" />
          <Typography variant="caption" color={darkPurple}>
            {client?.rating}
          </Typography>
        </Box>
        <Typography variant="caption" color={darkPurple}>
          1640 reviews
        </Typography>
      </Box>

      <Box className="mt-2 p-3">
        <Box className="d-flex justify-content-between ">
          <Typography variant="body1" color={primary}>
            From
          </Typography>
          <Typography variant="body1" color={primary} className="weight-500">
            {client?.country}
          </Typography>
        </Box>
        <Box className="d-flex justify-content-between mt-2">
          <Typography variant="body1" color={primary}>
            Member
          </Typography>
          <Typography variant="body1" color={primary} className="weight-500">
            {moment(client?.created_at).format('MMM YYYY')}
          </Typography>
        </Box>
        <Box className="d-flex justify-content-between mt-2">
          <Typography variant="body1" color={primary}>
            Total Hires
          </Typography>
          <Typography variant="body1" color={primary} className="weight-500">
            {client?.total_hires}
          </Typography>
        </Box>
        <Box className="d-flex justify-content-between mt-2">
          <Typography variant="body1" color={primary}>
            Total Jobs
          </Typography>
          <Typography variant="body1" color={primary} className="weight-500">
            {client?.total_jobs}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

ProfileInfo.propTypes = {
  client: propTypes.object
};

ProfileInfo.defaultProps = {
  client: {}
};

export default ProfileInfo;
