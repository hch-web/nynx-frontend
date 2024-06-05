import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Collapse } from '@mui/material';
import { Form, Formik } from 'formik';

// API HOOKS
import { useGetCategoriesListQuery } from 'services/public/asset';

// COMPONETS & UTILITIES
import SubmitButton from 'containers/common/components/SubmitButton';
import FormikSelectField from 'shared/components/form/FormikSelectField';
import { gigTypeOptions, sellerLevelsOptions } from 'utilities/selectOptions';
import BudgetRangeFilter from './BudgetRangeFilter';
import { gigFiltersInitValues, gigFiltersValSchema } from '../utilities/formUtils';
import { useGetTransformedCategoriesList } from '../customHooks/useTransformers';
import { useGetGigSearchContext } from '../customHooks/useGetGigSearchContext';

function GigFilters() {
  const [initValues, setInitValues] = useState(gigFiltersInitValues);

  // API HOOKS & TRANSFORMERS
  const { setSearchParams, searchParamsObj } = useGetGigSearchContext();
  const { data: categoriesList } = useGetCategoriesListQuery();
  const categoriesOptions = useGetTransformedCategoriesList(categoriesList?.categories);

  useEffect(() => {
    if (searchParamsObj?.length > 0) {
      setInitValues(searchParamsObj);
    }
  }, []);

  // HANDLERS
  const handleResetFilters = resetForm => {
    resetForm();
    setSearchParams({});
  };

  return (
    <Box my={2}>
      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={gigFiltersValSchema}
        onSubmit={async values => {
          const searchPayload = { ...searchParamsObj, ...values };
          setSearchParams(searchPayload);
        }}
      >
        {({ isSubmitting, values, resetForm }) => {
          const isFilterValues = !!values?.category || !!values?.gig_type || !!values?.seller_levels;
          const isAllFilterValues = isFilterValues || !!searchParamsObj?.min_price || !!searchParamsObj?.max_price;

          return (
            <Form className="d-flex gap-2">
              <BudgetRangeFilter />

              <Box maxWidth="170px" width={1}>
                <FormikSelectField
                  name="gig_type"
                  options={gigTypeOptions}
                  removeSelectOption
                  placeholder="Type"
                />
              </Box>

              <Box maxWidth="170px" width={1}>
                <FormikSelectField
                  name="seller_levels"
                  options={sellerLevelsOptions}
                  removeSelectOption
                  placeholder="Seller Level"
                />
              </Box>

              <Box maxWidth="170px" width={1}>
                <FormikSelectField
                  name="category"
                  options={categoriesOptions}
                  removeSelectOption
                  placeholder="Category"
                />
              </Box>

              <Collapse in={isAllFilterValues}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  {isFilterValues && (
                    <SubmitButton title="Search" isLoading={isSubmitting} className="px-4 py-2" />
                  )}

                  {isAllFilterValues && (
                    <Button
                      variant="contained"
                      color="primary"
                      className="px-4 py-2"
                      onClick={() => handleResetFilters(resetForm)}
                    >
                      Reset
                    </Button>
                  )}
                </Stack>
              </Collapse>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}

export default GigFilters;
