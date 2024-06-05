/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState, createContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
// hook
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// serivces
import {
  useGetFieldsDataQuery,
  useGetUpdatedFieldsDataQuery,
  useAddPricingMutation,
  useUpdatePricingMutation,
} from 'services/private/gig/create/pricing';

// utilities
import {
  transformUpdatedInitialValues,
  transformInitalValues,
  generatePricingCustomField,
  checkLimitOfCustomFields,
  isFeatureExist,
  transformedSelectedValues,
  tranformedAdhocFeaturesForValidation,
  tranformedMonthlyFeaturesForValidation,
  transformCustomFeaturesPayload,
  transformGeneralFeaturesPayload,
  filterGeneralFeatures,
  filterCustomFields,
  filterAdhocFields,
  filterMonthlyFields,
} from '../utilities/helpers';
import { FeaturesValidationSchema } from '../utilities/validationSchema';

export const PricingFormContext = createContext(null);

function PricingContext({ children, setCurrentTab }) {
  const formikRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdhocChecked, setIsAdhochecked] = useState(true);
  const [isThreeTierChecked, setIsThreeTierChecked] = useState({
    adhoc: true,
    monthly: false,
  });
  const [isMonthlyChecked, setIsMonthlyChecked] = useState(false);
  const [isLimitOfCustomField, setIsLimitOfCustomField] = useState({
    adhoc: false,
    monthly: false,
  });

  const {
    userInfo
  } = useSelector(state => state.auth);

  const [searchParams] = useSearchParams();
  const subcategoryid = searchParams.get('subCategoryId');
  const gigId = searchParams.get('id');

  // API HOOKS
  const { data: fieldsData, isSuccess } = useGetFieldsDataQuery(subcategoryid, { skip: !subcategoryid });
  const { data: updatedFieldData, isSuccess: updateFieldDataSuccess } = useGetUpdatedFieldsDataQuery(gigId, {
    skip: !gigId,
  });
  const [
    updatePricing,
    { isSuccess: updatePricingSuccess, error: updatePricingError, isLoading: updatePriceLoading },
  ] = useUpdatePricingMutation();
  const [addPricing, { isSuccess: addPricingSuccess, error: addPricingError, isLoading: addPricingLoading }] = useAddPricingMutation();

  // pricing response
  const pricingSuccessMessage = 'Fields has been added';
  useHandleApiResponse(updatePricingError, updatePricingSuccess, pricingSuccessMessage);

  const addPricingSuccessMessage = 'Fields has been added';
  useHandleApiResponse(addPricingError, addPricingSuccess, addPricingSuccessMessage);

  // INITIAL VALUE HANDLER
  const filterAndSetFeatureValues = () => {
    if (updatedFieldData?.features?.length > 0) {
      const updatedFeatures = transformUpdatedInitialValues(
        updatedFieldData.features,
        userInfo?.id,
        subcategoryid,
        updatedFieldData?.is_adhoc_three_tire,
        updatedFieldData?.is_monthly_three_tire
      );
      setIsEditing(true);
      setIsAdhochecked(updatedFieldData?.is_adhoc);
      setIsMonthlyChecked(updatedFieldData?.is_monthly);
      setIsThreeTierChecked({
        adhoc: updatedFieldData?.is_adhoc_three_tire,
        monthly: updatedFieldData?.is_monthly_three_tire,
      });
      formikRef.current.setValues({
        features: updatedFeatures,
      });
      setIsLimitOfCustomField(checkLimitOfCustomFields(updatedFeatures));
    } else {
      setIsAdhochecked(true);
      const adhocValues = fieldsData?.filter(field => field.is_adhoc_feature);
      formikRef.current.setValues({
        features: transformInitalValues(adhocValues),
      });
    }
  };

  useEffect(() => {
    if (formikRef && (isSuccess || updateFieldDataSuccess)) {
      filterAndSetFeatureValues();
      setIsLoading(false);
    }
  }, [fieldsData, formikRef, updatedFieldData, updateFieldDataSuccess]);

  // ADHOC SWITCH
  const handleAdhocChange = event => {
    setIsAdhochecked(event.target.checked);
    if (event.target.checked) {
      setIsThreeTierChecked({ ...isThreeTierChecked, adhoc: event.target.checked });
      const featuresToBeFilter = filterAdhocFields(updatedFieldData?.features).length > 0 ? updatedFieldData?.features : fieldsData;
      const filteredAdhoceatures = featuresToBeFilter?.filter(field => field.is_adhoc_feature);
      const finalFeatutres = [
        ...formikRef.current.values.features,
        ...transformedSelectedValues(
          filteredAdhoceatures,
          formikRef.current.values.features,
          subcategoryid,
          userInfo?.id
        ),
      ];
      formikRef.current.setValues({
        features: finalFeatutres,
      });
      setIsLimitOfCustomField(checkLimitOfCustomFields(finalFeatutres));
    } else {
      setIsThreeTierChecked({ ...isThreeTierChecked, adhoc: event.target.checked });
      const filteredMonthlyFeatures = formikRef.current.values.features?.filter(
        field => !field.attributes.isadhoc
      );
      formikRef.current.setValues({
        features: filteredMonthlyFeatures,
      });
      setIsLimitOfCustomField(checkLimitOfCustomFields(filteredMonthlyFeatures));
    }
  };

  // MONTHLY SWITCH
  const handleMonthlyPackageChange = event => {
    setIsMonthlyChecked(event.target.checked);
    if (event.target.checked) {
      setIsThreeTierChecked({ ...isThreeTierChecked, monthly: event.target.checked });
      const featuresToBeFilter = filterMonthlyFields(updatedFieldData?.features).length > 0 ? updatedFieldData?.features : fieldsData;
      const filteredMonthlyFeatures = featuresToBeFilter?.filter(field => !field.is_adhoc_feature);
      const finalFeatutres = [
        ...formikRef.current.values.features,
        ...transformedSelectedValues(
          filteredMonthlyFeatures,
          formikRef.current.values.features,
          subcategoryid,
          userInfo?.id
        ),
      ];
      formikRef.current.setValues({
        features: finalFeatutres,
      });
      setIsLimitOfCustomField(checkLimitOfCustomFields(finalFeatutres));
    } else {
      setIsThreeTierChecked({ ...isThreeTierChecked, monthly: event.target.checked });
      const filteredAhocFeatures = formikRef.current.values.features?.filter(
        field => field.attributes.isadhoc
      );
      formikRef.current.setValues({
        features: filteredAhocFeatures,
      });
      setIsLimitOfCustomField(checkLimitOfCustomFields(filteredAhocFeatures));
    }
  };

  // THREE TIER SWITCHES
  const handleThreeTierChange = (event, tierType) => {
    const isAdhoc = tierType === 'adhoc';
    if (isAdhoc) {
      formikRef.current.setValues({
        features: tranformedAdhocFeaturesForValidation(
          formikRef.current.values.features,
          event.target.checked
        ),
      });
      setIsThreeTierChecked({ ...isThreeTierChecked, [tierType]: event.target.checked });
    } else {
      formikRef.current.setValues({
        features: tranformedMonthlyFeaturesForValidation(
          formikRef.current.values.features,
          event.target.checked
        ),
      });
      setIsThreeTierChecked({ ...isThreeTierChecked, [tierType]: event.target.checked });
    }
  };

  // NEXT STEP HANDLER
  const nextStep = () => {
    setCurrentTab(prevState => prevState + 1);
  };

  useEffect(() => {
    if (updatePricingSuccess || addPricingSuccess) {
      nextStep();
    }
  }, [updatePricingSuccess, addPricingSuccess]);

  // ADD CUSTOM FIELD
  const handleAddCustomField = (title, isAdhoc) => {
    if (!isFeatureExist(title, isAdhoc, formikRef.current.values.features)) {
      const modifiedFeatutres = [
        ...formikRef.current.values.features,
        generatePricingCustomField(
          title,
          isAdhoc,
          subcategoryid,
          userInfo?.id,
          gigId,
          formikRef.current.values.features,
          isThreeTierChecked
        ),
      ];
      formikRef.current.setValues({
        features: modifiedFeatutres,
      });
      setIsLimitOfCustomField(checkLimitOfCustomFields(modifiedFeatutres));
    } else enqueueSnackbar('Field Already Exist', { variant: 'error' });
  };

  // DELETE CUSTOM FIELD
  const handleDeleteCustomField = index => {
    const filteredFeature = formikRef.current.values.features.filter(
      item => item?.attributes?.index !== index
    );
    formikRef.current.setValues({
      features: filteredFeature,
    });
    setIsLimitOfCustomField(checkLimitOfCustomFields(filteredFeature));
  };

  // ADD AND UPDATE API
  const handleAddPricing = featuresPayload => {
    addPricing({
      gig: gigId,
      is_adhoc: isAdhocChecked,
      is_adhoc_three_tire: isThreeTierChecked.adhoc,
      is_monthly: isMonthlyChecked,
      is_monthly_three_tire: isThreeTierChecked.monthly,
      features: featuresPayload,
    });
  };

  const handleUpdatePricing = featuresPayload => {
    updatePricing({
      gig: gigId,
      is_adhoc: isAdhocChecked,
      is_adhoc_three_tire: isThreeTierChecked.adhoc,
      is_monthly: isMonthlyChecked,
      is_monthly_three_tire: isThreeTierChecked.monthly,
      features: featuresPayload,
    });
  };

  const handleSumbitPricing = featuresPayload => {
    if (isEditing) handleUpdatePricing(featuresPayload);
    else handleAddPricing(featuresPayload);
  };

  return (
    <PricingFormContext.Provider
      value={{
        isLoading,
        isAdhocChecked,
        isThreeTierChecked,
        isMonthlyChecked,
        subcategoryid,
        updatePriceLoading,
        addPricingLoading,
        isLimitOfCustomField,
        handleAdhocChange,
        handleThreeTierChange,
        handleMonthlyPackageChange,
        handleAddCustomField,
        handleDeleteCustomField,
      }}
    >
      <Formik
        enableReinitialize
        innerRef={formikRef}
        initialValues={{
          features: [],
        }}
        validationSchema={FeaturesValidationSchema}
        onSubmit={values => {
          const featuresPayload = [
            ...transformGeneralFeaturesPayload(filterGeneralFeatures(values.features)),
            ...transformCustomFeaturesPayload(filterCustomFields(values.features)),
          ];
          handleSumbitPricing(featuresPayload);
        }}
      >
        <Form>{children}</Form>
      </Formik>
    </PricingFormContext.Provider>
  );
}

PricingContext.propTypes = {
  children: PropTypes.element.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};

export default PricingContext;
