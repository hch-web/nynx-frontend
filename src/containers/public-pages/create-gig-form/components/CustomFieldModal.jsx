import React, { useContext } from 'react';
import { Modal, Box, Typography, Stack, Button } from '@mui/material';
import propTypes from 'prop-types';
import { Form, Formik } from 'formik';

// styles
import { modalBoxContainer } from 'styles/mui/public-pages/freelancer-profile/freelancer-profile-styles';

// common
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';

// context
import { PricingFormContext } from '../context/PricingContext';

// utilities
import { addCustomFieldInitialValues } from '../utilities/initialValues';
import { addCustomFieldValidationSchema } from '../utilities/validationSchema';

function CustomFieldModal({ isOpenAddCustomFieldModal, handleToggleCustomFieldModal, isAdhoc }) {
  const { handleAddCustomField } = useContext(PricingFormContext);

  return (
    <Modal open={isOpenAddCustomFieldModal} onClose={handleToggleCustomFieldModal}>
      <Box className="modal-box-container" sx={modalBoxContainer}>
        <Formik
          initialValues={addCustomFieldInitialValues}
          onSubmit={async submittedValue => {
            handleAddCustomField(submittedValue.field_name, isAdhoc);
            handleToggleCustomFieldModal();
          }}
          validationSchema={addCustomFieldValidationSchema}
        >
          {({ isSubmitting }) => {
            const loading = isSubmitting;
            return (
              <Form>
                <Box className="modal-box-header px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
                  <Typography variant="h6">Add Field</Typography>

                  <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 2 }}>
                    <Button
                      sx={{ borderRadius: '25px' }}
                      className="px-3 py-2"
                      onClick={handleToggleCustomFieldModal}
                    >
                      Cancel
                    </Button>

                    <SubmitButton
                      isLoading={loading}
                      color="secondary"
                      variant="contained"
                      className="px-4 py-2"
                      title="Save"
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
                      <FormikField
                        name="field_name"
                        type="text"
                        placeholder="Field Name"
                        wordsCounter
                        maxWords={20}
                        fullWidth
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

CustomFieldModal.propTypes = {
  isOpenAddCustomFieldModal: propTypes.bool.isRequired,
  handleToggleCustomFieldModal: propTypes.func.isRequired,
  isAdhoc: propTypes.bool,
};

CustomFieldModal.defaultProps = {
  isAdhoc: false,
};

export default CustomFieldModal;
