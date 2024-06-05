import React, { useState } from 'react';
import { Box, Menu, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

// STYLES & COMPONENTS & UTILITIES
import { fieldButtonStyles } from 'styles/mui/components/common-button-styles';
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';
import { getSearchParamsObject } from 'utilities/utility-functions';
import { gigBudgetInitValues, gigBudgetValSchema } from '../utilities/formUtils';
import { useGetGigSearchContext } from '../customHooks/useGetGigSearchContext';

// eslint-disable-next-line no-unused-vars
function BudgetRangeFilter() {
  const [anchorEl, setAnchorEl] = useState(null);

  // CUSTOM HOOKS
  const { searchParams, setSearchParams } = useGetGigSearchContext();

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box height={1}>
      <Box sx={fieldButtonStyles} onClick={handleOpen}>
        <Typography variant="body1">Budget</Typography>
      </Box>

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <Formik
          initialValues={gigBudgetInitValues}
          validationSchema={gigBudgetValSchema}
          onSubmit={values => {
            const searchParamsObject = getSearchParamsObject(searchParams);

            setSearchParams({
              ...searchParamsObject,
              min_price: values?.min_price,
              max_price: values?.max_price,
            });
            handleClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-2">
              <Box className="d-flex gap-2">
                <Box maxWidth="150px" width={1}>
                  <FormikField type="text" name="min_price" placeholder="Min" fullWidth />
                </Box>

                <Box maxWidth="150px" width={1}>
                  <FormikField type="text" name="max_price" placeholder="Max" fullWidth />
                </Box>
              </Box>

              <Box className="d-flex justify-content-center my-2">
                <SubmitButton title="Apply" isLoading={isSubmitting} className="px-4 py-1" />
              </Box>
            </Form>
          )}
        </Formik>
      </Menu>
    </Box>
  );
}

export default BudgetRangeFilter;
