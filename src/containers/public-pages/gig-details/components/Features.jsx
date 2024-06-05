import React, { useState } from 'react';
import { Typography, Box, useTheme, Button } from '@mui/material';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// styles
import myStyles from 'styles/public-pages/gigDetails/gig-details.module.scss';
import {
  controlStyles,
  disabledControlStyles,
  dropDownIndicatorStyles,
} from 'styles/mui/components/react-select-styles';
import {
  featureBodyStyles,
  featureContainerWrapper,
  featureTableStyles,
  tableFeatureTitleStyles,
  tableFeatureValueStyles,
  tableSingleFeatureStyles,
} from 'styles/mui/public-pages/gig-details/gig-details-styles';

// common
import { gigPackageOptions } from 'containers/public-pages/utilities/data';
import Tooltip from 'containers/common/components/Tooltip';
import SelectField from 'shared/components/form/SelectField';

// components
import FieldValue from './FieldValue';
import DirectHireModal from './DirectHireModal';

function Features({
  features,
  isAdhoc,
  featurePrice,
  isMonthlyTier,
  featureDescription,
  isAdhocThreeTier,
  gigDetails,
  deadline,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userInfo, isAuthenticated } = useSelector(state => state.auth);

  const [isDirectHireModalOpen, setIsDirectHireModalOpen] = useState(false);
  const [gigPackageType, setGigPackageType] = useState('');

  const dropdownIndicator = base => ({
    ...base,
    ...dropDownIndicatorStyles,
  });

  const handleToggleDirectHireModal = () => {
    setIsDirectHireModalOpen(!isDirectHireModalOpen);
  };

  const handlePackageChange = event => {
    if (isAuthenticated) {
      setIsDirectHireModalOpen(true);
      setGigPackageType(event.value);
    } else {
      navigate('/auth/login', { state: { from: pathname } });
    }
  };

  const DirectHire = () => {
    if (isAuthenticated) {
      setIsDirectHireModalOpen(true);
      setGigPackageType('basic');
    } else {
      navigate('/auth/login', { state: { from: pathname } });
    }
  };

  // Constants
  const backgroundColor = isAdhoc ? myStyles.lightYellow : myStyles.lightDarkerPink;
  const featureBackgroundColor = isAdhoc ? myStyles.offWhite : myStyles.lighterOffWhite;
  const isThreeTier = isAdhoc ? isAdhocThreeTier : isMonthlyTier;
  const isDisable = userInfo ? userInfo?.is_buyer || false : true;
  const selectControlStyles = !isDisable ? disabledControlStyles : controlStyles;

  return (
    <>
      <Box sx={featureContainerWrapper}>
        <Box sx={featureTableStyles}>
          <table className="w-100">
            <tbody>
              <tr className={`${backgroundColor}`} style={featureBodyStyles}>
                <th style={tableFeatureTitleStyles} className="top-left-corner-border">
                  <Box className="d-flex align-items-center flex-wrap">
                    <Box>
                      <Typography variant="h6" color={darkPurple} className="weight-500">
                        Package
                      </Typography>
                    </Box>
                    <Box className="ms-md-2 ms-sm-0">
                      <Typography
                        variant="caption"
                        color={darkPurple}
                        className={`weight-500 ms-md-2 ms-sm-0 ${myStyles.packageType}`}
                      >
                        {isAdhoc ? 'Fixed' : 'Monthly'}
                      </Typography>
                    </Box>
                  </Box>
                </th>
                <th
                  className={`${!isThreeTier && 'top-right-corner-border'}`}
                  style={isThreeTier ? tableFeatureValueStyles : tableSingleFeatureStyles}
                >
                  <Typography variant="h6" color={darkPurple} className="mt-1 weight-500">
                    <Tooltip title={featureDescription.basic} placement="top-start">
                      <span> ${featurePrice?.basic} </span>
                    </Tooltip>
                  </Typography>
                  <Typography variant="caption" color={darkPurple} className=" weight-500">
                    Basic
                  </Typography>
                </th>
                {isThreeTier && (
                  <th style={tableFeatureValueStyles}>
                    <Typography variant="h6" color={darkPurple} className="mt-1 weight-500">
                      <Tooltip title={featureDescription.standard} placement="top-start">
                        <span> ${featurePrice?.standard} </span>
                      </Tooltip>
                    </Typography>
                    <Typography variant="caption" color={darkPurple} className=" weight-500">
                      Standard
                    </Typography>
                  </th>
                )}
                {isThreeTier && (
                  <th
                    className={`${isThreeTier && ' top-right-corner-border'}`}
                    style={tableFeatureValueStyles}
                  >
                    <Tooltip title={featureDescription.premium} placement="top-start">
                      <span>
                        <Typography variant="h6" color={darkPurple} className="mt-1 weight-500">
                          <span> ${featurePrice?.premium} </span>
                        </Typography>
                        <Typography variant="caption" color={darkPurple} className=" weight-500 ">
                          Premium
                        </Typography>
                      </span>
                    </Tooltip>
                  </th>
                )}
              </tr>
              {features?.map((item, idx) => (
                <tr
                  key={item?.id}
                  className={` ${(idx + 1) % 2 === 0 ? backgroundColor : featureBackgroundColor}`}
                >
                  <th style={tableFeatureTitleStyles}>
                    <Typography variant="h6" color={darkPurple} className="mt-1">
                      {item?.field_name || ''}
                    </Typography>
                  </th>
                  <td
                    className={`${isThreeTier ? 'tableHoverStyles' : 'singleValueTableStyles'}`}
                    style={tableFeatureValueStyles}
                  >
                    <FieldValue fieldType={item.field_type} values={item} valueType="basic" />
                  </td>
                  {isThreeTier && (
                    <td
                      className={`${isThreeTier ? 'tableHoverStyles' : 'singleValueTableStyles'}`}
                      style={tableFeatureValueStyles}
                    >
                      <FieldValue fieldType={item.field_type} values={item} valueType="standard" />
                    </td>
                  )}
                  {isThreeTier && (
                    <td
                      className={`${isThreeTier ? 'tableHoverStyles' : 'singleValueTableStyles'}`}
                      style={tableFeatureValueStyles}
                    >
                      <FieldValue fieldType={item.field_type} values={item} valueType="premium" />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Direct Hire Modal */}
          <DirectHireModal
            isOpen={isDirectHireModalOpen}
            handleToggle={handleToggleDirectHireModal}
            gigPackageType={gigPackageType}
            gigDetails={gigDetails}
            featurePrice={featurePrice}
            isAdhoc={isAdhoc}
            isOptionListBorderBottom
            deadline={deadline}
          />
        </Box>
      </Box>
      <Box
        className={`w-100 d-flex justify-content-end pt-3 pb-4 px-3  ${backgroundColor}`}
        sx={{ borderRadius: '0px 0px 15px 15px', zIndex: 10 }}
      >
        {isThreeTier ? (
          <SelectField
            classNames={`me-2 select-package-details ${myStyles.selectBtn} text-dark `}
            placeholder="Direct Hire"
            onChange={handlePackageChange}
            options={gigPackageOptions}
            control={selectControlStyles}
            dropdownIndicator={dropdownIndicator}
            isOptionListBorderBottom
            disable={!isDisable}
          />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            className={`${myStyles.selectBtn}`}
            sx={{ padding: '13px 23px', fontWeight: 400 }}
            onClick={DirectHire}
            disabled={!isDisable}
          >
            Direct Hire
          </Button>
        )}
      </Box>
    </>
  );
}

Features.propTypes = {
  features: propTypes.array.isRequired,
  deadline: propTypes.object,
  isAdhoc: propTypes.bool,
  featurePrice: propTypes.object,
  featureDescription: propTypes.object,
  isMonthlyTier: propTypes.bool.isRequired,
  isAdhocThreeTier: propTypes.bool.isRequired,
  gigDetails: propTypes.object,
};

Features.defaultProps = {
  isAdhoc: false,
  featurePrice: {},
  featureDescription: {},
  deadline: {},
  gigDetails: {},
};

export default Features;
