import React from 'react';
import { Box, Button, Collapse, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';

// COMPONENTS & UTILITIES
import FormikSelectField from 'shared/components/form/FormikSelectField';
import Chip from 'containers/common/components/Chip';
import SubmitButton from 'containers/common/components/SubmitButton';
import { adhocDeliveryOptions, gigTypeOptions } from '../utililites/data';
import { serviceFiltersInitVals, serviceFiltersValSchema } from '../utililites/formUtils';
import { getFormattedFilterLabels } from '../utililites/helper';

function ServiceFilters({ handler, subCategoryId }) {
  const handleResetFilter = (key, values, resetForm) => {
    resetForm({ values: { ...values, [key]: '' } });
    handler({ subCategoryId });
  };

  return (
    <Box className="my-4 pb-2">
      <Formik
        initialValues={serviceFiltersInitVals}
        validationSchema={serviceFiltersValSchema}
        onSubmit={async values => {
          await handler({ ...values, subCategoryId });
        }}
      >
        {({ resetForm, isSubmitting, values }) => (
          <Form>
            <Box className="d-flex flex-wrap justify-content-start align-items-center gap-2 mb-2">
              <Box maxWidth="200px" width={1}>
                <FormikSelectField name="gig_type" placeholder="Gig Type" options={gigTypeOptions} />
              </Box>

              <Box maxWidth="200px" width={1}>
                <FormikSelectField
                  name="delivery_time"
                  placeholder="Delivery Time"
                  options={adhocDeliveryOptions}
                  maxMenuHeight={200}
                />
              </Box>

              <Collapse in={!!values?.delivery_time || !!values?.gig_type} orientation="horizontal">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SubmitButton title="Search" isLoading={isSubmitting} className="px-4 py-2" />

                  <Button className="py-2" variant="contained" color="primary" onClick={resetForm}>
                    Reset
                  </Button>
                </Stack>
              </Collapse>
            </Box>

            <Box className="d-flex flex-wrap justify-content-start">
              {Object.keys(values)?.map(key => (
                <Collapse key={key} in={!!values[key]}>
                  <Box>
                    <Chip
                      title={getFormattedFilterLabels(key, values)}
                      item={key}
                      onClose={() => handleResetFilter(key, values, resetForm)}
                      close
                    />
                  </Box>
                </Collapse>
              ))}
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

ServiceFilters.propTypes = {
  handler: propTypes.func.isRequired,
  subCategoryId: propTypes.string.isRequired,
};

export default ServiceFilters;
