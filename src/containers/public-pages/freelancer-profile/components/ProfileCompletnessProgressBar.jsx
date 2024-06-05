import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

// Services
import { useProfileCompleteStatusQuery } from 'services/private/profile';

// Components
import ProgressBar from 'containers/portal/common/ProgressBar';

function ProfileCompletnessProgressBar() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkGrey = colors.grey.dark;

  const { data: profileCompleteProgressBarData, refetch: profileCompleteProgressBarDataRefetch } = useProfileCompleteStatusQuery();

  useEffect(() => {
    profileCompleteProgressBarDataRefetch();
  }, []);

  return (
    <Box className="w-100">
      <Box className="d-flex justify-content-between">
        <Box>
          <Typography variant="dashboardBody" color={darkGrey} className="weight-500">
            Profile Status
          </Typography>
        </Box>
        <Box>
          <Typography variant="dashboardBody" className="weight-700">
            {profileCompleteProgressBarData?.progress || ''}%
          </Typography>
        </Box>
      </Box>
      <ProgressBar value={profileCompleteProgressBarData?.progress} />
    </Box>
  );
}

export default ProfileCompletnessProgressBar;
