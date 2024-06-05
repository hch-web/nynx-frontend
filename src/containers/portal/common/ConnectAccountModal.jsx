import React from 'react';
import { Box, Typography, Button, Modal, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import propTypes from 'prop-types';

// shared components
import FormikField from 'shared/components/form/FormikField';

// styles
import { modalBoxContainer } from 'styles/mui/portal/profile-setting-styles';

// utilities
import { addAccountValidation } from './utilities/schemaValidation';
import { addAccountInitialValues } from './utilities/initialValues';

// common components
import SubmitButton from '../../common/components/SubmitButton';

function ConnectedAccountsModal({
  isConnectAccountModalOpen,
  toggleConnectAccountModal,
  accountsToBeConnected,
  setAccountsToBeConnected,
  selectedId,
}) {
  return (
    <Modal open={isConnectAccountModalOpen} onClose={toggleConnectAccountModal}>
      <Box className="modal-box-container" sx={modalBoxContainer}>
        <Formik
          initialValues={addAccountInitialValues}
          validationSchema={addAccountValidation}
          onSubmit={values => {
            setAccountsToBeConnected([...accountsToBeConnected, { ...values, media: selectedId }]);
            toggleConnectAccountModal();
          }}
        >
          {({ isSubmitting }) => {
            const loading = isSubmitting;
            return (
              <Form>
                <Box className="modal-box-header px-4 py-2 d-flex justify-content-between align-items-center border-bottom">
                  <Typography variant="h6" className="weight-500">
                    Connect Account
                  </Typography>

                  <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 2 }}>
                    <Button
                      sx={{ borderRadius: '25px' }}
                      className="px-3 py-2"
                      onClick={toggleConnectAccountModal}
                    >
                      Cancel
                    </Button>
                    <SubmitButton title="Add" className="px-2 py-1" isLoading={loading} />
                  </Stack>
                </Box>

                <Box className="modal-box-body py-3">
                  <Stack
                    spacing={{ xs: 1, sm: 1, md: 2 }}
                    direction={{ xs: 'column', sm: 'column', md: 'column' }}
                    className="px-3"
                  >
                    <Box className="col-12 p-0">
                      <FormikField name="url" type="text" placeholder="Type Mail" fullWidth />
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

ConnectedAccountsModal.propTypes = {
  isConnectAccountModalOpen: propTypes.bool,
  toggleConnectAccountModal: propTypes.func,
  accountsToBeConnected: propTypes.array,
  setAccountsToBeConnected: propTypes.func,
  selectedId: propTypes.number,
};

ConnectedAccountsModal.defaultProps = {
  selectedId: 0,
  isConnectAccountModalOpen: false,
  accountsToBeConnected: [],
  setAccountsToBeConnected: () => {},
  toggleConnectAccountModal: () => {},
};

export default ConnectedAccountsModal;
