import React from 'react';
import { Stepper, Step, styled, StepConnector } from '@mui/material';
import PropTypes from 'prop-types';
import { stepConnectorClasses } from '@mui/material/StepConnector';

// Components
import ExpertStep from './ExpertStep';

// Utilities
import { sellerLevels } from '../utilities/data';

function ExpertLevels({ activeStep }) {
  const ColorlibConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#FEA87E',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#FEA87E',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 10,
      border: 0,
      backgroundColor: '#ffecde',
      borderRadius: 3,
    },
  }));

  return (
    <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
      {sellerLevels?.map((label, index) => (
        <Step key={label} className="px-0">
          <ExpertStep index={index} activeStep={activeStep} label={label} />
        </Step>
      ))}
    </Stepper>
  );
}

ExpertLevels.propTypes = {
  activeStep: PropTypes.number,
};

ExpertLevels.defaultProps = {
  activeStep: 0,
};

export default ExpertLevels;
