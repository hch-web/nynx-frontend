import React, { useState } from 'react';
import { Box, ToggleButtonGroup, Typography, ToggleButton, Divider } from '@mui/material';
import { tHeaderBoxStyles, toggleButtonStyles } from 'styles/mui/portal/workspace-styles';

function WorkSpaceMainHeader() {
  const [workSpaceType, setWorkSpaceType] = useState('all');

  // HANDLER FUNCTIONS
  const handleWorkSpaceType = (_, value) => {
    if (value !== null) {
      setWorkSpaceType(value);
    }
  };

  return (
    <Box sx={tHeaderBoxStyles}>
      <Box>
        <Box className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3">
          <Typography variant="h6" sx={{ fontWeight: '500' }}>
            Details
          </Typography>

          <Box>
            <ToggleButtonGroup
              exclusive
              value={workSpaceType}
              onChange={handleWorkSpaceType}
              color="secondary"
            >
              <ToggleButton sx={toggleButtonStyles} value="active">
                Active
              </ToggleButton>
              <ToggleButton sx={toggleButtonStyles} value="pending">
                Pending
              </ToggleButton>
              <ToggleButton sx={toggleButtonStyles} value="completed">
                Completed
              </ToggleButton>
              <ToggleButton sx={toggleButtonStyles} value="canceled">
                Canceled
              </ToggleButton>
              <ToggleButton sx={toggleButtonStyles} value="all">
                All
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>

      <Divider light />
    </Box>
  );
}

export default WorkSpaceMainHeader;
