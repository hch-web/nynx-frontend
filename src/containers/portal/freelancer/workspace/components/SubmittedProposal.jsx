import React from 'react';
import { Box, Typography } from '@mui/material';
import propTypes from 'prop-types';

// styles
import { sectionLoaderStyles } from 'styles/mui/portal/submitted-proposals-styles';

// Component
import SectionLoader from 'containers/common/loaders/SectionLoader';
import Proposal from 'containers/common/components/Proposal';

function SubmittedProposal({ proposalList, isSubmittedProposalLoading, isSubmittedProposalFetching }) {
  return isSubmittedProposalFetching || isSubmittedProposalLoading ? (
    <Box className="d-flex justify-content-center align-items-center" sx={sectionLoaderStyles}>
      <SectionLoader />
    </Box>
  ) : (
    <Box className="row align-items-center mt-4">
      {proposalList.length > 0 ? (
        proposalList?.map(proposal => <Proposal showBorder key={proposal?.id} proposal={proposal} />)
      ) : (
        <Typography className="text-center" variant="body1">
          No Record Found!
        </Typography>
      )}
    </Box>
  );
}

SubmittedProposal.propTypes = {
  proposalList: propTypes.array.isRequired,
  isSubmittedProposalLoading: propTypes.bool.isRequired,
  isSubmittedProposalFetching: propTypes.bool.isRequired,
};
export default SubmittedProposal;
