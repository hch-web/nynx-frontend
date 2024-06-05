import React from 'react';
import { Box } from '@mui/material';
import propTypes from 'prop-types';

// components
import JobInfo from './JobInfo';
import Proposalnfo from './Proposalnfo';

function JobDetail({ job, jobOffer }) {
  return (
    <Box className="my-3">
      <JobInfo job={job} />
      <Proposalnfo jobOffer={jobOffer} />
    </Box>
  );
}
JobDetail.propTypes = {
  job: propTypes.object,
  jobOffer: propTypes.object
};

JobDetail.defaultProps = {
  job: {},
  jobOffer: {}
};

export default JobDetail;
