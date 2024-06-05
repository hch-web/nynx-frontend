import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';

// API HOOKS
import { useAddPrivacyPolicyMutation, useUpdatePrivacyPolicyMutation } from 'services/private/terms-privacy';

// COMPONENTS & UTILITIES
import FormikTextEditor from 'shared/components/form/FormikTextEditor';
import SubmitButton from 'containers/common/components/SubmitButton';
import { privacyPolicyFormInitVals, privacyPolicyFormValSchema } from '../utilities/formUtils';

function ContentModalForm({ data, toggle }) {
  const [initValues, setInitValues] = useState(privacyPolicyFormInitVals);

  const [addPrivacyPolicy, { isLoading: isAddLoading }] = useAddPrivacyPolicyMutation();
  const [updatePrivacyPolicy, { isLoading: isUpdateLoading }] = useUpdatePrivacyPolicyMutation();

  useEffect(() => {
    if (data?.length > 0) {
      setInitValues({ privacy_policy: data[0]?.privacy_policy });
    }
  }, [data]);

  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      validationSchema={privacyPolicyFormValSchema}
      onSubmit={async values => {
        if (data?.length > 0) {
          await updatePrivacyPolicy({ ...values, id: data[0]?.id });
        } else {
          await addPrivacyPolicy(values);
        }

        toggle();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box className="px-4 py-2 d-flex align-items-center justify-content-between">
            <Typography variant="h6" fontWeight={500}>
              Manage Content
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button onClick={toggle}>Cancel</Button>

              <SubmitButton
                title="Save"
                className="px-4 py-2"
                isLoading={isSubmitting || isAddLoading || isUpdateLoading}
              />
            </Stack>
          </Box>

          <Divider />

          <Box sx={{ padding: '20px' }}>
            <FormikTextEditor name="privacy_policy" />
          </Box>
        </Form>
      )}
    </Formik>
  );
}

ContentModalForm.propTypes = {
  toggle: propTypes.func.isRequired,
  data: propTypes.array,
};

ContentModalForm.defaultProps = {
  data: [],
};

export default ContentModalForm;
