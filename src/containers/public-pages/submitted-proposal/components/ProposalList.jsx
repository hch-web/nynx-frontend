import React from 'react';
import { Box } from '@mui/material';
import propTypes from 'prop-types';

// styles
import { proposalMainContainerStyles } from 'styles/mui/public-pages/submitted-proposal-styles/proposal-styles';

// component
import Proposal from './Proposal';

function ProposalList({ proposals }) {
  return (
    <Box className="bg-white common-border" sx={proposalMainContainerStyles}>
      {proposals?.map(element => (
        <Proposal key={element?.id} proposal={element} />
      ))}
    </Box>
  );
}

ProposalList.propTypes = {
  proposals: propTypes.array,
};

ProposalList.defaultProps = {
  proposals: [],
};

export default ProposalList;
