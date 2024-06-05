import React from 'react';
import { Box, Button, Collapse, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';

// COMPONENTS & UTILITIES
import FormikSelectField from 'shared/components/form/FormikSelectField';
import SubmitButton from 'containers/common/components/SubmitButton';
import { ADHOC } from 'utilities/constants';
import { adhocDeliveryOptions, gigTypeOptions, monthlyDeliveryOptions } from '../utililites/data';
import { serviceFiltersInitVals, serviceFiltersValSchema } from '../utililites/formUtils';

function ServiceFilters({ handler, subCategoryId, userId }) {
  const handleResetFilters = async resetForm => {
    resetForm();
    await handler({ subCategoryId, profile_id: userId });
  };

  return (
    <Box className="my-4 pb-2">
      <Formik
        initialValues={serviceFiltersInitVals}
        validationSchema={serviceFiltersValSchema}
        onSubmit={async values => {
          await handler({ ...values, subCategoryId, profile_id: userId });
        }}
      >
        {({ resetForm, isSubmitting, values }) => {
          const deliveryOptions = values?.gig_type === ADHOC ? adhocDeliveryOptions : monthlyDeliveryOptions;

          return (
            <Form>
              <Box className="d-flex flex-wrap justify-content-start align-items-center gap-2 mb-2">
                <Box maxWidth="200px" width={1}>
                  <FormikSelectField name="gig_type" placeholder="Gig Type" options={gigTypeOptions} />
                </Box>

                <Box maxWidth="200px" width={1}>
                  <FormikSelectField
                    name="delivery_time"
                    placeholder="Delivery Time"
                    options={deliveryOptions}
                    maxMenuHeight={200}
                    removeSelectOption
                  />
                </Box>

                <Collapse in={!!values?.delivery_time || !!values?.gig_type} orientation="horizontal">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SubmitButton title="Search" isLoading={isSubmitting} className="px-4 py-2" />

                    <Button
                      className="py-2"
                      variant="contained"
                      color="primary"
                      onClick={() => handleResetFilters(resetForm)}
                    >
                      Reset
                    </Button>
                  </Stack>
                </Collapse>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}

ServiceFilters.propTypes = {
  handler: propTypes.func.isRequired,
  subCategoryId: propTypes.string.isRequired,
  userId: propTypes.number,
};

ServiceFilters.defaultProps = {
  userId: null,
};

export default ServiceFilters;
