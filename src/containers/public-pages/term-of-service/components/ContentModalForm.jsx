import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';

// API HOOKS
import {
  useAddTermsOfServiceMutation,
  useUpdateTermsOfServiceMutation,
} from 'services/private/terms-privacy';

// COMPONENTS & UTILITIES
import FormikTextEditor from 'shared/components/form/FormikTextEditor';
import SubmitButton from 'containers/common/components/SubmitButton';
import { termsOfServiceFormInitVals, termsOfServiceFormValSchema } from '../utilities/formUtils';

function ContentModalForm({ data, toggle }) {
  const [initValues, setInitValues] = useState(termsOfServiceFormInitVals);

  const [addTermsOfService, { isLoading: isAddLoading }] = useAddTermsOfServiceMutation();
  const [updateTermsOfService, { isLoading: isUpdateLoading }] = useUpdateTermsOfServiceMutation();

  useEffect(() => {
    if (data?.length > 0) {
      setInitValues({ terms_and_conditions: data[0]?.terms_and_conditions });
    }
  }, [data]);

  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      validationSchema={termsOfServiceFormValSchema}
      onSubmit={async values => {
        if (data?.length > 0) {
          await updateTermsOfService({ ...values, id: data[0]?.id });
        } else {
          await addTermsOfService(values);
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
            <FormikTextEditor name="terms_and_conditions" />
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
