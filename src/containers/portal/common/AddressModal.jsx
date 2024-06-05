/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Modal, Stack } from '@mui/material';
import propTypes from 'prop-types';
import { Formik, Form } from 'formik';

// shared components
import FormikField from 'shared/components/form/FormikField';
import PortalFormikSelectField from 'shared/components/form/PortalFormikSelectField';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// services
import { useUpdateBasicInfoMutation } from 'services/private/user';
import { useListCountriesQuery } from 'services/public/countries';

// styles
import { modalBoxContainer, flagIconStyles } from 'styles/mui/portal/profile-setting-styles';

// utilities
import { billingAddressValidation } from './utilities/schemaValidation';

// common components
import SubmitButton from '../../common/components/SubmitButton';

function AddAddressModal({ isOpenAddressModal, toggleAddressModal, isSelected }) {
  const { userInfo } = useSelector(state => state.auth);
  const [updateBasicInfo, { isLoading: addAddressLoading, error, isSuccess }] = useUpdateBasicInfoMutation();
  const { data: countries } = useListCountriesQuery();
  const successMessage = 'Your profile has been updated successfully';
  useHandleApiResponse(error, isSuccess, successMessage);

  const countryOptions = countries?.map(element => ({
    label: element.common_name,
    value: element.id,
    flag: element.flag_svg,
  }));

  const initialValues = {
    address: isSelected ? userInfo?.address : '',
    address_country: isSelected ? userInfo?.address_country : '',
  };

  const renderCustomOption = ({ label, flag }) => (
    <Box className="d-flex align-items-center">
      {flag && <img src={flag} alt="Flag" style={flagIconStyles} />}
      <Typography variant="dashboardCaption" className="ms-2">
        {label}
      </Typography>
    </Box>
  );

  return (
    <Modal open={isOpenAddressModal} onClose={toggleAddressModal}>
      <Box className="modal-box-container" sx={modalBoxContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={billingAddressValidation}
          onSubmit={async values => {
            await updateBasicInfo({ address: values.address, address_country: values.address_country });
            toggleAddressModal();
          }}
        >
          {({ isSubmitting }) => {
            const loading = isSubmitting || addAddressLoading;
            return (
              <Form>
                <Box className="modal-box-header px-4 py-2 d-flex justify-content-between align-items-center border-bottom">
                  <Typography variant="h6" className="weight-500">
                    {isSelected ? 'Edit Address' : 'Add Address'}
                  </Typography>

                  <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 2 }}>
                    <Button sx={{ borderRadius: '25px' }} className="px-3 py-2" onClick={toggleAddressModal}>
                      Cancel
                    </Button>
                    <SubmitButton
                      title={isSelected ? 'Update' : 'Add'}
                      className="px-2 py-1"
                      isLoading={loading}
                    />
                  </Stack>
                </Box>

                <Box className="modal-box-body py-3">
                  <Stack
                    spacing={{ xs: 1, sm: 1, md: 2 }}
                    direction={{ xs: 'column', sm: 'column', md: 'column' }}
                    className="px-3"
                  >
                    <Box className="col-12 p-0">
                      <FormikField name="address" type="text" placeholder="Type Address" fullWidth />
                    </Box>
                    <Box className="col-12 p-0">
                      <PortalFormikSelectField
                        options={countryOptions || []}
                        name="address_country"
                        placeholder="Countries"
                        fullWidth
                        formatOptionLabel={renderCustomOption}
                      />
                    </Box>
                  </Stack>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
}

AddAddressModal.propTypes = {
  isSelected: propTypes.bool,
  isOpenAddressModal: propTypes.bool,
  toggleAddressModal: propTypes.func,
};

AddAddressModal.defaultProps = {
  isSelected: false,
  isOpenAddressModal: false,
  toggleAddressModal: () => {},
};

export default AddAddressModal;
