import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import propTypes from 'prop-types';

// components
import Skill from 'containers/public-pages/common/components/Skill';

function JobInfo({ job }) {
  return (
    <Box className="bg-white common-border">
      <Box className="py-4 px-3">
        <Typography variant="dashboardh2" className="weight-500">
          Job details
        </Typography>
      </Box>
      <Divider />
      <Box className="py-4 px-3">
        <Typography variant="dashboardh2" className="weight-500">
          Client Requirements
        </Typography>
        <Typography variant="dashboardh2" className="weight-700 mt-2 d-block">
          {job?.title}
        </Typography>
        <Typography variant="caption" className="mt-2 d-block">
          {job?.description}
        </Typography>

        {job?.job_skills?.map(skill => (
          <Skill key={skill?.id} skill={skill} />
        ))}
      </Box>
    </Box>
  );
}

JobInfo.propTypes = {
  job: propTypes.object
};

JobInfo.defaultProps = {
  job: {}
};

export default JobInfo;
