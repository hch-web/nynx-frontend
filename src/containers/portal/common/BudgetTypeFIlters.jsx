import React, { useState, useEffect } from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import propTypes from 'prop-types';

// styles
import { toggleButtonStyles } from 'styles/mui/portal/workspace-styles';

function BudgetTypeFIlters({ handlerFunc, workspaceId }) {
  const [selectedType, setSelectedType] = useState('');

  // HANDLER FUNCTIONS
  const handleWorkSpaceType = (_, value) => {
    if (value !== null) {
      setSelectedType(value);
    }
  };

  useEffect(() => {
    const apiResponseHandler = async () => {
      await handlerFunc({ budget_type: selectedType, workspaceId });
    };
    apiResponseHandler();
  }, [selectedType]);

  return (
    <Box>
      <ToggleButtonGroup exclusive value={selectedType} onChange={handleWorkSpaceType} color="secondary">
        <ToggleButton sx={toggleButtonStyles} value="">
          All
        </ToggleButton>
        <ToggleButton sx={toggleButtonStyles} value="project_budget">
          Adhoc
        </ToggleButton>
        <ToggleButton sx={toggleButtonStyles} value="monthly_based">
          Monthly
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

BudgetTypeFIlters.propTypes = {
  handlerFunc: propTypes.func.isRequired,
  workspaceId: propTypes.number.isRequired,
};

export default BudgetTypeFIlters;
