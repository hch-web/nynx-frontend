import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

// services
import { useGetSubmittedProposalDetailQuery } from 'services/private/proposals';

// components
import SectionLoader from 'containers/common/loaders/SectionLoader';
import ProfileInfo from './components/ProfileInfo';
import JobDetail from './components/JobDetail';

function ProposalDetail() {
  const { proposalId } = useParams();
  const { data: proposalDetail, isLoading } = useGetSubmittedProposalDetailQuery(+proposalId, {
    skip: !proposalId,
  });

  return isLoading ? (
    <Box className="section-loader">
      <SectionLoader />
    </Box>
  ) : (
    <Box className="container">
      <Box className="row">
        <Typography variant="dashboardh2" className="weight-500 mt-3">
          Proposal details
        </Typography>
        <Box className="col-lg-9 col-md-12">
          <JobDetail job={proposalDetail?.job} jobOffer={proposalDetail?.job_offer} />
        </Box>
        <Box className="col-lg-3  d-none d-lg-block d-md-none d-sm-none">
          <ProfileInfo client={proposalDetail?.client} />
        </Box>
      </Box>
    </Box>
  );
}

export default ProposalDetail;
