import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

// services
import { useGetSubmittedProposalsQuery } from 'services/private/proposals';
// component
import SectionLoader from 'containers/common/loaders/SectionLoader';
import ProposalList from './components/ProposalList';

function index() {
  const { data: proposals, isLoading } = useGetSubmittedProposalsQuery();
  return isLoading ? (
    <Box className="section-loader">
      <SectionLoader />
    </Box>
  ) : (
    <Container variant="public">
      <Typography varaint="dashboardh2" className="weight-500 my-2">
        Proposal
      </Typography>
      <Box className="px-4 py-3 bg-white" sx={{ borderRadius: '10px 10px 0px 0px' }}>
        <Typography varaint="dashboardh2" className="weight-500">
          Submitted ({proposals?.length})
        </Typography>
      </Box>
      <Divider />
      <ProposalList proposals={proposals} />
    </Container>
  );
}

export default index;
