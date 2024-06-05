import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, CardActionArea, Grid, Typography, useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import useApiServices from 'custom-hooks/useApiServices';

// services
import {
  useUpdateRequirmentsMutation,
  useGetRequirementsQuery,
} from 'services/private/gig/create/requirement';

// styles
import { addRequirmentButtonStyles, requirementMainContainerStyles } from 'styles/mui/public-pages/create-gig/requirement-styles';
import styles from 'styles/public-pages/create-gig/requirement-tab.module.scss';

// utilities
import { requirementsInitialValues } from '../../utilities/initialValues';
import { requirementsValidationSchema } from '../../utilities/validationSchema';

// common
import LayoutWrapper from '../../common/LayoutWrapper';
import Label from '../../common/Label';
import SubmitButton from '../../../../common/components/SubmitButton';

// component
import AddRequirementModal from '../AddRequirementModal';
import Requirements from '../Requirements';

function RequirementsTab({ setCurrentTab }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const navigate = useNavigate();
  const formikRef = useRef(null);

  const [searchParams] = useSearchParams();
  const gigId = searchParams.get('id');

  const { userInfo } = useSelector(state => state.auth);

  const { invalidatePrivateTags } = useApiServices();

  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState(false);

  const [updateRequirments, { isSuccess, error, isLoading: updateRequirementsLoading }] = useUpdateRequirmentsMutation();
  const { data: requirements } = useGetRequirementsQuery(gigId, { skip: !gigId });

  const successMessage = 'Data has been saved Successfully';
  useHandleApiResponse(error, isSuccess, successMessage);

  const nextStep = () => {
    setCurrentTab(prevState => prevState + 1);
  };

  useEffect(() => {
    if (requirements?.length > 0) {
      formikRef.current.setFieldValue('requirements', requirements);
    }
  }, [requirements]);

  useEffect(() => {
    if (isSuccess) nextStep();
  }, [isSuccess]);

  const toggleRequirementModel = () => {
    setIsRequirementModalOpen(!isRequirementModalOpen);
  };

  const handleCancel = () => {
    invalidatePrivateTags(['GetGigList']);
    navigate(`/profile/${userInfo?.id}`);
  };

  return (
    <LayoutWrapper title="Requirements">
      <Formik
        initialValues={requirementsInitialValues}
        innerRef={formikRef}
        onSubmit={async values => {
          const requirementPayload = { ...values, gig: gigId };
          await updateRequirments(requirementPayload);
        }}
        validationSchema={requirementsValidationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Box className="pb-3 px-4">
              <Box sx={requirementMainContainerStyles}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    className="text-center text-md-start mt-3 mb-3 mb-sm-3 mb-md-0 pe-0 pe-md-2"
                  >
                    <Label>Tell the client what you need to get started</Label>
                  </Grid>

                  <Grid item xs={12} sm={12} md={9}>
                    {/* All Requirements  */}
                    <Requirements />

                    {/* add requirement modal */}
                    <AddRequirementModal
                      name="requirements"
                      isRequirementModalOpen={isRequirementModalOpen}
                      toggleRequirementModel={toggleRequirementModel}
                    />
                    <CardActionArea className="my-3">
                      <Box
                        className="d-flex align-items-center justify-content-center py-3"
                        sx={addRequirmentButtonStyles}
                        onClick={toggleRequirementModel}
                      >
                        <Typography variant="body2" color={darkPurple}>
                          Add Requirement
                        </Typography>
                      </Box>
                    </CardActionArea>
                    {errors.requirements && touched.requirements && (
                      <div className={`text-danger ${styles.fieldError}`}>{errors.requirements}</div>
                    )}
                  </Grid>
                </Grid>
              </Box>
              <Box className="border-top py-3 px-4 d-flex justify-content-end">
                <Button className="me-3" onClick={handleCancel}>
                  Cancel
                </Button>
                <SubmitButton
                  title="Save & Continue"
                  className="px-lg-5 px-md-3 px-sm-1 py-2"
                  isLoading={updateRequirementsLoading}
                />
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </LayoutWrapper>
  );
}

RequirementsTab.propTypes = {
  setCurrentTab: propTypes.func,
};

RequirementsTab.defaultProps = {
  setCurrentTab: () => {},
};

export default RequirementsTab;
