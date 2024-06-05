import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Menu, Box, Typography, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import propTypes from 'prop-types';
import { v4 } from 'uuid';

// COMPONENTS & STYLES & UTILITIES
import FormikField from 'shared/components/form/FormikField';
import styles from 'styles/components/min-max-form.module.scss';
import { MIN_MAX } from 'utilities/constants';
import { fieldButtonStyles } from 'styles/mui/components/common-button-styles';
import { minMaxInitialValues } from '../utilities/initialValues';
import { minMaxFormValidationSchema } from '../utilities/validationSchema';
import { isFilterExist, replaceSameTypeFilter } from '../utilities/helper';

export default function MinMax({ setFilters, filters, handleUpdateFilterState }) {
  const [budgetElement, setBudgetElement] = useState(null);
  const open = Boolean(budgetElement);

  const [searchParams, setSearchParams] = useSearchParams();

  // Search Params
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const job = searchParams.get('job');

  const handleOpenBudgetMenu = event => {
    setBudgetElement(event.currentTarget);
  };
  const handleCloseBudgetMenu = () => {
    setBudgetElement(null);
  };

  return (
    <div className="me-2">
      <Box className="d-flex align-items-center h-100">
        <Box sx={fieldButtonStyles} onClick={handleOpenBudgetMenu}>
          <Typography variant="body1">Budget</Typography>
        </Box>
      </Box>

      <Menu className="p-0 mt-2" anchorEl={budgetElement} open={open} onClose={handleCloseBudgetMenu}>
        <Formik
          initialValues={minMaxInitialValues}
          validationSchema={minMaxFormValidationSchema}
          onSubmit={(values, { resetForm }) => {
            const params = {
              subcategory: subcategory || '',
              category: category || '',
              job: job || '',
              min: values?.min,
              max: values?.max,
            };

            const filterArrayItem = {
              label: `${values?.min} - ${values?.max}`,
              value: v4(),
              type: MIN_MAX,
            };

            if (!isFilterExist(filters, filterArrayItem)) {
              setFilters([...filters, filterArrayItem]);
            } else {
              handleUpdateFilterState(filterArrayItem);
              handleUpdateFilterState();
              setFilters(() => [...replaceSameTypeFilter(filters, filterArrayItem)]);
            }

            setSearchParams(params);
            handleCloseBudgetMenu();
            resetForm();
          }}
        >
          <Form className="pt-2 pb-1 px-2">
            <Box className="d-flex gap-2">
              <FormikField className={styles.fieldWidth} type="text" name="min" placeholder="Min" fullWidth />
              <FormikField className={styles.fieldWidth} type="text" name="max" placeholder="Max" fullWidth />
            </Box>
            <Box className="d-flex justify-content-end">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className="me-3 mt-2 mt-sm-2 mt-md-2 mt-lg-2 px-4 py-1"
              >
                <Typography variant="body1">Apply</Typography>
              </Button>
            </Box>
          </Form>
        </Formik>
      </Menu>
    </div>
  );
}

MinMax.propTypes = {
  setFilters: propTypes.func.isRequired,
  filters: propTypes.array,
  handleUpdateFilterState: propTypes.func.isRequired,
};

MinMax.defaultProps = {
  filters: [],
};
