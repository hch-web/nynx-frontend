import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Button, IconButton, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { Edit } from '@mui/icons-material';

// API HOOKS
import {
  useGetPaypalAccountInfoQuery,
  useSetupPaypalAccountMutation,
  useUpdatePaypalAccountInfoMutation,
} from 'services/private/payments/paypal';

// UTILITIES & COMPONENTS
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';
import { setupPaypalValSchema } from './utilities/schemaValidation';

function SetupPaypalAccount() {
  const theme = useTheme();
  const colors = theme.palette;
  const yellow = colors.yellow.main;

  const [initValues, setInitValues] = useState({ paypal_email: '' });
  const [canEdit, setCanEdit] = useState(true);

  // API HOOKS
  const [setupPaypal, { isLoading }] = useSetupPaypalAccountMutation();
  const { data: paypalAccountInfo } = useGetPaypalAccountInfoQuery();
  const [updatePaypalAccount] = useUpdatePaypalAccountInfoMutation();

  useEffect(() => {
    if (paypalAccountInfo) {
      setInitValues(paypalAccountInfo);

      if (paypalAccountInfo?.paypal_email?.length > 0) {
        setCanEdit(false);
      }
    }
  }, [paypalAccountInfo]);

  const handleCancel = setFieldValue => {
    setFieldValue('paypal_email', paypalAccountInfo?.paypal_email || '');
    setCanEdit(false);
  };

  return (
    <Box className="bg-white">
      <Formik
        initialValues={initValues}
        enableReinitialize
        validationSchema={setupPaypalValSchema}
        onSubmit={async values => {
          if (canEdit && paypalAccountInfo?.paypal_email) {
            const body = { ...values, id: paypalAccountInfo?.id };

            await updatePaypalAccount(body);
            setCanEdit(false);
          } else {
            await setupPaypal(values);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Box className="d-flex align-items-center justify-content-center gap-3 py-5">
              <Typography variant="body1" className="fw-500">
                Paypal Account Email:
              </Typography>

              <FormikField name="paypal_email" type="email" placeholder="Type Email..." disabled={!canEdit} />
            </Box>

            <Divider light />

            <Box className="d-flex align-items-center justify-content-end py-3 px-3 gap-3">
              <Button className="px-3 py-2" onClick={() => handleCancel(setFieldValue)}>
                Cancel
              </Button>

              <SubmitButton
                title={canEdit && paypalAccountInfo ? 'Update' : 'Save'}
                variant="contained"
                color="secondary"
                className="px-lg-5 px-md-3 px-sm-1 py-2"
                isLoading={isSubmitting || isLoading}
                disabled={!canEdit}
              />

              <IconButton sx={{ background: yellow }} onClick={() => setCanEdit(true)}>
                <Edit />
              </IconButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default SetupPaypalAccount;
