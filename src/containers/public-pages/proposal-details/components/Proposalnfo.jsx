import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import propTypes from 'prop-types';

// component
import Proposal from 'containers/common/components/Proposal';

function Proposalnfo({ jobOffer }) {
  return (
    <Box className="bg-white common-border">
      <Box className="py-4 px-3 mt-3">
        <Typography variant="dashboardh2" className="weight-500">
          Your proposal
        </Typography>
      </Box>
      <Divider />
      <Box className="py-4 px-3">
        <Proposal proposal={jobOffer} />
      </Box>
    </Box>
  );
}

Proposalnfo.propTypes = {
  jobOffer: propTypes.object,
};

Proposalnfo.defaultProps = {
  jobOffer: {},
};

export default Proposalnfo;
