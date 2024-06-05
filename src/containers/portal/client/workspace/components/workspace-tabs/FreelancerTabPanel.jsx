import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';

// CUSTOM HOOKS
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import { freelanceToggleButtonStyles } from 'styles/mui/portal/workspace-styles';

// COMPONENTS
import TabPanel from 'containers/common/components/TabPanel';
import FreelancerProposalTabPanel from './FreelancerProposalTabPanel';
import FreelancerTeamTabPanel from './FreelancerTeamTabPanel';

function FreelancerTabPanel() {
  // HOOKS REFERENCING
  const theme = useTheme();
  const { invalidatePrivateTags } = useApiServices();

  // STATE HOOKS
  const [currentTab, setCurrentTab] = useState(0);
  const [freelancerFilter, setFreelancerFilter] = useState('all');

  // COLORS
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;

  // HANDLER FUNCTIONS
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFreelancerFilter = (_, value) => {
    if (value !== null) {
      setFreelancerFilter(value);
    }
  };

  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace']);
  }, []);

  return (
    <Box className="bg-white" sx={{ borderRadius: '20px' }}>
      {/* HEADER TITLE */}
      <Box className="py-3 px-4">
        <Typography variant="h6">Freelancers</Typography>
      </Box>

      <Divider light className="mb-2" />

      {/* TABS BODY */}
      <Box className="d-flex flex-wrap flex-lg-nowrap align-items-center justify-content-between px-2">
        <Box className="col-12 col-md-6 col-lg-6">
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
            <Tab label="Proposals" />
            <Tab label="Team" />
          </Tabs>
        </Box>

        <Box className="col-12 col-md-6 col-lg-6 text-center text-lg-end mt-3 mt-md-0">
          <ToggleButtonGroup
            exclusive
            value={freelancerFilter}
            onChange={handleFreelancerFilter}
            color="secondary"
          >
            <ToggleButton sx={freelanceToggleButtonStyles} value="all">
              All
            </ToggleButton>

            <ToggleButton sx={freelanceToggleButtonStyles} value="adhoc">
              Adhoc
            </ToggleButton>

            <ToggleButton sx={freelanceToggleButtonStyles} value="monthly">
              Monthly
            </ToggleButton>

            <ToggleButton sx={freelanceToggleButtonStyles} value="hourly">
              Hourly
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Divider light />

      <Box className="px-4 py-3">
        <TabPanel stateValue={currentTab} index={0}>
          <FreelancerProposalTabPanel />
        </TabPanel>

        <TabPanel stateValue={currentTab} index={1}>
          <FreelancerTeamTabPanel />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default FreelancerTabPanel;
