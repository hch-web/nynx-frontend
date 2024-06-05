import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// styles
import { headerBoxWrapperStyles, packagedToggleBoxStyles } from 'styles/mui/components/create-gig-styles';

// hook
import useApiServices from 'custom-hooks/useApiServices';

// styles
import { sectionLoaderStyles } from 'styles/mui/public-pages/create-gig/root-styles';

// common
import SwitchComponent from 'containers/common/components/Switch';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import PricingForm from './PricingForm';
import SubmitButton from '../../../common/components/SubmitButton';

// context
import { PricingFormContext } from '../context/PricingContext';

function PricingTabMainWrapper() {
  const {
    isLoading,
    isAdhocChecked,
    isThreeTierChecked,
    isMonthlyChecked,
    handleAdhocChange,
    handleThreeTierChange,
    handleMonthlyPackageChange,
    addPricingLoading,
    updatePriceLoading,
  } = useContext(PricingFormContext);

  const { invalidatePrivateTags } = useApiServices();

  const navigate = useNavigate();

  const contextState = useFormikContext();

  const { userInfo } = useSelector(state => state.auth);

  const error = typeof contextState?.errors?.features === 'string' ? contextState?.errors?.features : '';

  const handleCancel = () => {
    invalidatePrivateTags(['GetGigList']);
    navigate(`/profile/${userInfo?.id}`);
  };

  return isLoading ? (
    <div style={sectionLoaderStyles}>
      <SectionLoader />
    </div>
  ) : (
    <Box className="py-3 ">
      <Box className="adhoc-package-box px-4">
        <Box sx={packagedToggleBoxStyles}>
          <Box
            className="header-box d-flex align-items-center flex-column flex-sm-row p-2 px-3"
            sx={headerBoxWrapperStyles}
          >
            <div className="col-12 col-sm-6 d-flex justify-content-start justify-content-sm-start">
              <SwitchComponent
                label="Adhoc price"
                checked={isAdhocChecked}
                labelPlacement="start"
                className="ms-0"
                onChange={handleAdhocChange}
              />
            </div>
            <div className="col-12 col-sm-6 d-flex justify-content-start justify-content-sm-end">
              <SwitchComponent
                label="3 Tire"
                checked={isThreeTierChecked?.adhoc}
                labelPlacement="start"
                className="ms-0"
                onChange={event => handleThreeTierChange(event, 'adhoc')}
                disabled={!isAdhocChecked}
              />
            </div>
          </Box>
          {/* form */}
          {isAdhocChecked && <PricingForm isAdhoc />}
        </Box>
      </Box>

      <Box className="monthly-package-box mb-2 mt-3 px-4">
        <Box sx={packagedToggleBoxStyles}>
          <Box
            className="header-box d-flex align-items-center flex-column flex-md-row justify-content-between p-2 px-3"
            sx={headerBoxWrapperStyles}
          >
            <div className="col-12 col-sm-6 d-flex justify-content-start justify-content-sm-start">
              <SwitchComponent
                label="Monthly Packages"
                checked={isMonthlyChecked}
                labelPlacement="start"
                className="ms-0"
                onChange={handleMonthlyPackageChange}
              />
            </div>

            <div className="col-12 col-sm-6 d-flex justify-content-start justify-content-sm-end">
              <SwitchComponent
                label="3 Tire"
                checked={isThreeTierChecked?.monthly}
                labelPlacement="start"
                className="ms-0"
                onChange={event => handleThreeTierChange(event, 'monthly')}
                disabled={!isMonthlyChecked}
              />
            </div>
          </Box>
          {/* form */}
          {isMonthlyChecked && <PricingForm />}
        </Box>
      </Box>
      <Box className="px-4 field-error text-danger">{error}</Box>
      <Box className="border-top py-3 px-4 d-flex justify-content-end">
        <Button className="me-3" onClick={handleCancel}>
          Cancel
        </Button>
        <SubmitButton
          title="Save & Continue"
          className="px-lg-5 px-md-3 px-sm-1 py-2"
          isLoading={updatePriceLoading || addPricingLoading}
        />
      </Box>
    </Box>
  );
}

export default PricingTabMainWrapper;
