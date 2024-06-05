import React from 'react';
import { Box } from '@mui/material';
import propTypes from 'prop-types';

// styles
import { bodyBoxStyles, bodyBoxWrapperStyles } from 'styles/mui/components/create-gig-styles';

// common
import PricingFormHeader from './PricingFormHeader';
import PricingFormFields from './PricingFormFields';
import AddCustomFIeld from './AddCustomFIeld';

function PricingForm({ isAdhoc }) {
  return (
    <Box className="box-wrapper" sx={bodyBoxWrapperStyles}>
      <Box className="body p-2 px-3" sx={bodyBoxStyles}>
        <PricingFormHeader isAdhoc={isAdhoc} />
        <PricingFormFields isAdhoc={isAdhoc} />
        <AddCustomFIeld isAdhoc={isAdhoc} />
      </Box>
    </Box>
  );
}

PricingForm.propTypes = {
  isAdhoc: propTypes.bool,
};

PricingForm.defaultProps = {
  isAdhoc: false
};

export default PricingForm;
