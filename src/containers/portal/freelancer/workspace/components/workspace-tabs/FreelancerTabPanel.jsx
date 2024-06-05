import React, { useState, useEffect } from 'react';
import { Box, Divider, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
// SERVICES
import { useLazySubmittedProposalsQuery } from 'services/private/workspace/proposals';

// CUSTOM HOOK
import useApiServices from 'custom-hooks/useApiServices';

// COMPONENTS
import TabPanel from 'containers/common/components/TabPanel';
import FreelancerTeamTabPanel from 'containers/portal/common/FreelancerTeamPanel';
import ToggleButtons from '../../../../common/BudgetTypeFIlters';
import SubmittedProposal from '../SubmittedProposal';

function FreelancerTabPanel() {
  // HOOKS REFERENCING
  const theme = useTheme();

  const { workspaceId } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  // STATE HOOKS
  const [currentTab, setCurrentTab] = useState(0);

  // API HOOK
  const [
    submittedProposals,
    {
      data: proposalList = [],
      isFetching: isSubmittedProposalFetching,
      isLoading: isSubmittedProposalLoading,
    },
  ] = useLazySubmittedProposalsQuery();

  // COLORS
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;

  // HANDLER FUNCTIONS
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace', 'GetFreelancerWorkspace']);
  }, []);

  return (
    <Box className="bg-white common-border">
      {/* HEADER TITLE */}
      <Box className="py-3 px-4">
        <Typography variant="h6">Freelancers</Typography>
      </Box>

      <Divider light className="mb-2" />

      {/* TABS BODY */}
      <Box className="px-2 row">
        <Box className="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-8">
          <Box className="d-flex justify-content-xxl-start justify-content-center">
            <Tabs
              className="justify-content-center justify-content-lg-start"
              value={currentTab}
              onChange={handleChange}
              variant="scrollable"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTabs-indicator': { background: lightOrange },
                '& .Mui-selected': { color: `${lightOrange} !Important` },
              }}
            >
              <Tab label="Team" />
              <Tab label="Submitted Proposals" />
            </Tabs>
          </Box>
        </Box>
        {currentTab > 0 && (
          <Box className="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-4">
            <Box className="mt-xxl-0 mt-3 d-flex justify-content-xxl-end justify-content-center">
              <ToggleButtons handlerFunc={submittedProposals} workspaceId={+workspaceId} />
            </Box>
          </Box>
        )}
      </Box>

      <Divider light />

      <Box className="px-4 py-3">
        <TabPanel stateValue={currentTab} index={0}>
          <FreelancerTeamTabPanel />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={1}>
          <SubmittedProposal
            proposalList={proposalList}
            isSubmittedProposalFetching={isSubmittedProposalFetching}
            isSubmittedProposalLoading={isSubmittedProposalLoading}
          />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default FreelancerTabPanel;
