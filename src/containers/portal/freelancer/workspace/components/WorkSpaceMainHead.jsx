import React, { useState } from 'react';
import { Box, ToggleButtonGroup, Typography, ToggleButton, Divider } from '@mui/material';
import {
  freelancertHeaderBoxStyles,
  clienttHeaderBoxStyles,
  toggleButtonStyles,
} from 'styles/mui/portal/workspace-styles';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';

function WorkSpaceMainHeader({ handleFunc }) {
  const [workSpaceType, setWorkSpaceType] = useState('');

  const { userInfo } = useSelector(state => state.auth);

  // HANDLER FUNCTIONS
  const handleWorkSpaceType = (_, value) => {
    if (value !== null) {
      setWorkSpaceType(value);
      handleFunc({ status: value });
    }
  };

  // constants
  const headerStyles = userInfo?.is_buyer ? clienttHeaderBoxStyles : freelancertHeaderBoxStyles;

  return (
    <Box sx={headerStyles}>
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
              <ToggleButton sx={toggleButtonStyles} value="in_progress">
                In Progress
              </ToggleButton>
              <ToggleButton sx={toggleButtonStyles} value="in_revision">
                In Revision
              </ToggleButton>
              <ToggleButton sx={toggleButtonStyles} value="completed">
                Completed
              </ToggleButton>
              <ToggleButton sx={toggleButtonStyles} value="canceled">
                Canceled
              </ToggleButton>
              <ToggleButton sx={toggleButtonStyles} value="">
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
WorkSpaceMainHeader.propTypes = {
  handleFunc: propTypes.func.isRequired,
};
export default WorkSpaceMainHeader;
