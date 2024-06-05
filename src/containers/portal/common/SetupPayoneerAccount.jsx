/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';

// API HOOKS
import {
  useGetPayoneerAccountDetailsQuery,
  useRegisterPayoneerAccountMutation,
  useSetupAndGetPayoneerAccountMutation,
} from 'services/private/payments/payoneer';

// COMPONENTS & UTILITIES
import SubmitButton from 'containers/common/components/SubmitButton';
import FormikField from 'shared/components/form/FormikField';
import { setupPayoneerAccountInitValues } from './utilities/initialValues';

function SetupPayoneerAccount() {
  const [initValues, setInitValues] = useState(setupPayoneerAccountInitValues);
  const { enqueueSnackbar } = useSnackbar();

  const [setupAccount] = useSetupAndGetPayoneerAccountMutation();
  const [registerAccount] = useRegisterPayoneerAccountMutation();
  const { data: accountDetails, isLoading } = useGetPayoneerAccountDetailsQuery();

  useEffect(() => {
    if (accountDetails) {
      const payeeId = accountDetails.payee_id;
      setInitValues({ ...initValues, payee_id: payeeId });
    }
  }, [accountDetails]);

  return (
    <Box className="bg-white">
      <Formik
        enableReinitialize
        initialValues={initValues}
        onSubmit={async values => {
          const setupAccountResp = await setupAccount(values);

          if (setupAccountResp.data) {
            const payload = {
              data: { ...values, already_have_an_account: false },
              token: setupAccountResp?.data?.access_token,
            };
            const registerAccountResp = await registerAccount(payload);

            if (registerAccountResp.data?.error_description) {
              enqueueSnackbar(registerAccountResp.data.error_description, { variant: 'error' });
              return;
            }

            if (registerAccountResp.data) {
              window.open(registerAccountResp.data.result.registration_link, '_blank');
            }
          }
        }}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <Stack direction="row" justifyContent="center" alignItems="center" px={3} py={3} spacing={3}>
              <Typography variant="body1" fontWeight={500}>
                Payoneer Email:
              </Typography>

              <FormikField name="payee_id" placeholder="Type Email..." disabled={isLoading} />
            </Stack>

            {/* FOOTER */}
            <Divider light />

            <Box className="d-flex align-items-center justify-content-end py-3 px-3 gap-3">
              <Button className="px-3 py-2" onClick={resetForm}>
                Cancel
              </Button>

              <SubmitButton
                title="Setup"
                variant="contained"
                color="secondary"
                className="px-lg-5 px-md-3 px-sm-1 py-2"
                isLoading={isSubmitting}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default SetupPayoneerAccount;
