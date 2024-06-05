import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSearchParams, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';

// services
import {
  useGetOverViewDataQuery,
  useListCategoriesQuery,
  useLazyListSubCategoriesQuery,
  useAddOveriewTabPayloadMutation,
  useUpdateOveriewTabMutation,
  useLazyGetSubCategoriesQuery,
} from 'services/private/gig/create/overView';

// styles
import { overTabMainContainerStyles } from 'styles/mui/public-pages/create-gig/over-view-tab-styles';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import useApiServices from 'custom-hooks/useApiServices';

// common
import FormikField from 'shared/components/form/FormikField';
import FormikSelectField from 'shared/components/form/FormikSelectField';

// styles
import styles from 'styles/public-pages/create-gig/overview-tab.module.scss';

// utilities
import { overViewInitialValues } from '../../utilities/initialValues';
import { overViewTabValidationSchema } from '../../utilities/validationSchema';
import { transformSearchTags } from '../../utilities/helpers';

// components
import Attributes from '../Attributes';
import LayoutWrapper from '../../common/LayoutWrapper';
import Label from '../../common/Label';
import SubmitButton from '../../../../common/components/SubmitButton';
import SearchTags from '../SearchTags';

function ChipWithClose({ title }) {
  return <Typography variant="body1">{title}</Typography>;
}
ChipWithClose.propTypes = {
  title: propTypes.string.isRequired,
};

function OverviewTab({ setCurrentTab }) {
  const formikRef = useRef(null);

  // QUERY PARAMS
  const [searchParams] = useSearchParams();
  const gigId = searchParams.get('id');
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.auth);

  const { data: overViewData } = useGetOverViewDataQuery(gigId, { skip: !gigId });
  const { data: categories } = useListCategoriesQuery();
  const [, setSearchParams] = useSearchParams();
  const [listSubCategories, { data: subCatogeries }] = useLazyListSubCategoriesQuery();
  const [getSubCategories, { data: attributesList }] = useLazyGetSubCategoriesQuery();
  const [
    addOveriewTabPayload,
    {
      data: overviewData,
      isSuccess: addOverViewSuccess,
      error: addOverViewError,
      isLoading: addOverViewLoading,
    },
  ] = useAddOveriewTabPayloadMutation();
  const [
    updateOveriewTab,
    { isSuccess: updateOveriewSuccess, error: updateOverViewError, isLoading: updateOveviewLoading },
  ] = useUpdateOveriewTabMutation();

  const { invalidatePrivateTags } = useApiServices();

  //  API RESPONSE
  const addOverViewsuccessMessage = 'Data has been saved Successfully';
  useHandleApiResponse(addOverViewError, addOverViewSuccess, addOverViewsuccessMessage);

  const updateOverViewsuccessMessage = 'Data has been Updated Successfully';
  useHandleApiResponse(updateOverViewError, updateOveriewSuccess, updateOverViewsuccessMessage);

  const nextStep = () => {
    setCurrentTab(prevState => prevState + 1);
  };

  useEffect(() => {
    if (addOverViewSuccess) {
      const params = {
        id: overviewData.id,
        subCategoryId: overviewData.sub_category,
      };
      setSearchParams(params);
      nextStep();
    }
    if (updateOveriewSuccess) {
      nextStep();
    }
  }, [addOverViewSuccess, updateOveriewSuccess]);

  const categoryOptions = categories?.map(category => ({
    label: category.name,
    value: category.id,
  }));

  const subCategoryOptions = subCatogeries?.map(subCatogery => ({
    label: subCatogery.name,
    value: subCatogery.id,
  }));

  const handleCategoryForSubCategory = value => {
    formikRef.current.setFieldValue('gig_attribute', []);
    getSubCategories();
    listSubCategories(value);
  };

  const handleChangeSubCategoryForAttributes = value => {
    getSubCategories(value);
  };

  useEffect(() => {
    if (formikRef && overViewData) {
      if (overViewData?.category) {
        listSubCategories(overViewData?.category);
      }
      if (overViewData?.sub_category) {
        getSubCategories(overViewData?.sub_category);
      }
      formikRef.current.setFieldValue('title', overViewData?.title);
      formikRef.current.setFieldValue('category', overViewData?.category);
      formikRef.current.setFieldValue('sub_category', overViewData?.sub_category);
      formikRef.current.setFieldValue('gig_attribute', overViewData?.gig_attribute);
      formikRef.current.setFieldValue('search_tags', transformSearchTags(overViewData?.search_tags));
    }
  }, [overViewData, formikRef]);

  const handleCancel = () => {
    invalidatePrivateTags(['GetGigList']);
    navigate(`/profile/${userInfo?.id}`);
  };

  const handleAddTags = (e, formValues, setValue) => {
    const tags = [...formValues, { tag: e.target.value, id: v4() }];

    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        e.preventDefault();
        setValue('search_tags', tags);
        e.target.value = '';
      }
    }
  };

  return (
    <LayoutWrapper title="Overview">
      <Formik
        enableReinitialize
        initialValues={overViewInitialValues}
        innerRef={formikRef}
        onSubmit={async values => {
          if (gigId) {
            await updateOveriewTab({ ...values, gig: gigId });
          } else {
            await addOveriewTabPayload({ ...values, gig_attribute: undefined });
          }
        }}
        validationSchema={overViewTabValidationSchema}
      >
        {({ setFieldValue: setCurrentFieldValue, errors, touched, values: formValues }) => (
          <Form>
            <Box className="pt-3 px-4" sx={overTabMainContainerStyles}>
              <Box className="d-flex align-items-start mb-3 mb-sm-3 mb-md-4">
                <Box className="col-3">
                  <Label variant="body1">Gig Title</Label>
                </Box>
                <Box className="col-9">
                  <FormikField
                    name="title"
                    type="text"
                    placeholder="Title"
                    fullWidth
                    wordsCounter
                    maxWords={80}
                  />
                </Box>
              </Box>

              <Box className="d-flex align-items-start mb-3 mb-sm-3 mb-md-4">
                <Box className="col-3">
                  <Label variant="body1">Category</Label>
                </Box>
                <Box className="col-9 d-flex align-items-center justify-content-between flex-column flex-md-row">
                  <div className="col-12 col-sm-12 col-md-6 pe-0 pe-md-3 mb-3 mb-md-0">
                    <FormikSelectField
                      name="category"
                      placeholder="Category"
                      options={categoryOptions || []}
                      onChange={handleCategoryForSubCategory}
                    />
                  </div>

                  <div className="col-12 col-sm-12 col-md-6 ps-0 ps-md-3 ">
                    <FormikSelectField
                      name="sub_category"
                      placeholder="Sub-Category"
                      options={subCategoryOptions || []}
                      onChange={handleChangeSubCategoryForAttributes}
                    />
                  </div>
                </Box>
              </Box>

              <Box className="d-flex align-items-start mb-3 mb-sm-3 mb-md-4">
                <Box className="col-3">
                  {attributesList?.length > 0 && <Label variant="body1">Project Attributes</Label>}
                </Box>
                <Box className="col-9">
                  <Box className="row">
                    {attributesList?.map(item => (
                      <Attributes key={item.id} attribute={item} name="gig_attribute" />
                    ))}
                  </Box>
                  <Box className="text-">
                    {attributesList?.length > 0 && errors.gig_attribute && touched.gig_attribute && (
                      <div className={`${styles.fieldError} text-danger`}>{errors.gig_attribute}</div>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box className="d-flex align-items-start mb-3 mb-sm-3 mb-md-4">
                <Box className="col-3">
                  <Label variant="body1">Search Tags</Label>
                </Box>
                <Box className="col-9">
                  <input
                    type="text"
                    className={styles.customTextField}
                    style={{
                      borderColor: errors.search_tags && touched.search_tags ? 'red' : '#e3d6d1',
                    }}
                    onKeyDown={e => handleAddTags(e, formValues.search_tags, setCurrentFieldValue)}
                  />
                  {errors.search_tags && touched.search_tags && (
                    <div className={`${styles.fieldError} text-danger`}>{errors.search_tags}</div>
                  )}
                  <SearchTags name="search_tags" />
                </Box>
              </Box>
            </Box>

            <Box className="border-top py-3 px-4 d-flex justify-content-end">
              <Button className="me-3" onClick={handleCancel}>
                Cancel
              </Button>
              <SubmitButton
                title="Save & Continue"
                className="px-lg-5 px-md-3 px-sm-1 py-2"
                isLoading={addOverViewLoading || updateOveviewLoading}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </LayoutWrapper>
  );
}

OverviewTab.propTypes = {
  setCurrentTab: propTypes.func,
};

OverviewTab.defaultProps = {
  setCurrentTab: () => {},
};

export default OverviewTab;
