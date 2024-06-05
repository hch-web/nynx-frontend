import React, { useState, useContext } from 'react';
import { Box } from '@mui/material';
import propTypes from 'prop-types';

// styles
import { addCuatomButtonStyles } from 'styles/mui/public-pages/create-gig/root-styles';

// common
import Label from '../common/Label';
import CustomFieldModal from './CustomFieldModal';

// context
import { PricingFormContext } from '../context/PricingContext';

function AddCustomFIeld({ isAdhoc }) {
  const { isLimitOfCustomField } = useContext(PricingFormContext);
  const [isOpenAddCustomFieldModal, setIsOpenAddCustomFieldModal] = useState(false);

  const handleToggleCustomFieldModal = () => {
    setIsOpenAddCustomFieldModal(!isOpenAddCustomFieldModal);
  };

  // constant
  const shouldAdhocLimit = isAdhoc ? 'adhoc' : 'monthly';

  return (
    <Box className="single-row d-flex pt-3" sx={{ paddingBottom: '75px' }}>
      {!isLimitOfCustomField[shouldAdhocLimit] && (
        <Box className="col-4 item d-flex align-items-start justify-content-start ">
          <Label sx={addCuatomButtonStyles} className="p-1" onClick={handleToggleCustomFieldModal}>
            Add Custom Field
          </Label>
        </Box>
      )}
      {/* add custom field modal */}
      <CustomFieldModal
        handleToggleCustomFieldModal={handleToggleCustomFieldModal}
        isOpenAddCustomFieldModal={isOpenAddCustomFieldModal}
        isAdhoc={isAdhoc}
      />
    </Box>
  );
}

AddCustomFIeld.propTypes = {
  isAdhoc: propTypes.bool,
};

AddCustomFIeld.defaultProps = {
  isAdhoc: false,
};

export default AddCustomFIeld;
