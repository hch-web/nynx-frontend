import React, { useContext } from 'react';
import { Box } from '@mui/material';
import propTypes from 'prop-types';

// styles
import { fieldWidthStyles } from 'styles/mui/components/create-gig-styles';

// common
import Label from '../common/Label';

// context
import { PricingFormContext } from '../context/PricingContext';

// utilities
import { ADHOC, MONTHLY } from '../utilities/constants';

function PricingFormHeader({ isAdhoc }) {
  const { isThreeTierChecked } = useContext(PricingFormContext);

  // constant
  const tierType = isAdhoc ? ADHOC : MONTHLY;

  return (
    <Box>
      <Box className="d-flex d-md-none align-items-center justify-content-end pt-3">
        <Box className="col-2" />
        <Box className="col-10 d-flex align-items-center">
          <Box className="mx-2" sx={fieldWidthStyles}>
            <Label>Basic</Label>
          </Box>

          {isThreeTierChecked[tierType] && (
            <>
              <Box className="mx-2" sx={fieldWidthStyles}>
                <Label>Standard</Label>
              </Box>
              <Box className="mx-2" sx={fieldWidthStyles}>
                <Label>Premium</Label>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Box
        className={`d-none d-md-flex align-items-center ${
          isThreeTierChecked ? 'justify-content-end' : 'justify-content-end'
        } pt-3`}
      >
        <Box className={`${isThreeTierChecked[tierType] ? 'col-3' : 'col-9'} text-center`}>
          <Label>Basic</Label>
        </Box>

        {isThreeTierChecked[tierType] && (
          <>
            <Box className="col-3 text-center">
              <Label>Standard</Label>
            </Box>
            <Box className="col-3 text-center">
              <Label>Premium</Label>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

PricingFormHeader.propTypes = {
  isAdhoc: propTypes.bool,
};

PricingFormHeader.defaultProps = {
  isAdhoc: false,
};

export default PricingFormHeader;
