import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

// API HOOKS & CUSTOM HOOKS
import {
  useGetOfferJobPostDetailsQuery,
  useSendProposalOfferMutation,
} from 'services/private/onBoarding/proposalOffer';
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import { useGetGigListQuery } from 'services/private/gig';

// COMPONENTS
import SubmitButton from 'containers/common/components/SubmitButton';
import FormikField from 'shared/components/form/FormikField';
import FormikSelectField from 'shared/components/form/FormikSelectField';

// STYLES
import { formToggleButtonsStyles } from 'styles/mui/public-pages/buyer-request/buyer-request-styles';

// COMPONENT
import Skill from 'containers/public-pages/common/components/Skill';

// UTILITIES & CUSTOM HOOKS
import { PROJECT_BASED } from 'utilities/constants';

import useTransformGigOptions from 'custom-hooks/useTransformGigOptions';
import useTransformTaskOptions from '../custom-hooks/useTransformTaskOptions';
import { buyerRequestFormValidationSchema } from '../utilities/validationSchema';
import { buyerRequestInitialValues } from '../utilities/initialValues';

function BuyerRequestForm({ id, handleToggle, taskId }) {
  const theme = useTheme();

  // STATE HOOKS
  const [initValues, setInitValues] = useState(buyerRequestInitialValues);
  const { id: profile } = useSelector(state => state.auth.userInfo);

  const gigListParams = { id: profile, status: 'completed' };

  // API HOOKS
  const [sendProposalOffer, { error, isSuccess, isLoading }] = useSendProposalOfferMutation();
  const { data: selectedData } = useGetOfferJobPostDetailsQuery(id, { skip: !id });
  const { data: listAllgigs } = useGetGigListQuery(gigListParams, { skip: !profile });

  // TRANSFORMER CUSTOM HOOKS
  const transformedTaskOptions = useTransformTaskOptions(selectedData?.job?.job_skills);
  const transformedGigOptions = useTransformGigOptions(listAllgigs?.results);

  useEffect(() => {
    setInitValues({ ...initValues, job_skill: taskId });
  }, [taskId]);

  // CUSTOM HOOKS
  useHandleApiResponse(error, isSuccess, 'Proposal submitted successfully');

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // HANDLER FUNCTIONS
  const handleToggleProjectType = (e, newValue, setFieldValue) => {
    if (newValue !== null) {
      setFieldValue('budget_type', newValue);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      validationSchema={buyerRequestFormValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        const body = { ...values, profile, is_custom_offer: false };
        const sendOfferResp = await sendProposalOffer(body);

        if (sendOfferResp?.data) {
          handleToggle();
          resetForm(values);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => {
        const timelineField = values.budget_type === PROJECT_BASED ? 'days' : 'months';
        return (
          <Form>
            {/* HEADER */}
            <Box className="px-4 py-3 d-flex align-items-center justify-content-between">
              <Typography variant="h6" className="fw-500">
                Create Offer
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button onClick={handleToggle} className="px-4 py-2">
                  Cancel
                </Button>

                <SubmitButton
                  title="Send Offer"
                  className="px-4 py-2"
                  variant="contained"
                  color="secondary"
                  isLoading={isLoading || isSubmitting}
                />
              </Stack>
            </Box>

            <Divider light />

            {/* FORM BODY */}
            <Box sx={{ overflowY: 'auto' }}>
              <Grid container sx={{ height: 'calc(80vh - 76px)' }}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  sx={{ borderRight: '2px solid #eaeaeb' }}
                  className="px-4 py-3"
                >
                  <Typography variant="h6" className="fw-500 mb-3">
                    Client Requirements
                  </Typography>

                  {/* JOB POST DATA */}
                  <Box>
                    <Typography variant="body1" className="fw-500">
                      {selectedData?.job?.title}
                    </Typography>

                    <Typography variant="body2" className="text-muted my-3 responsive-text">
                      {selectedData?.job?.description}
                    </Typography>

                    {selectedData?.job?.job_skills?.map(skill => (
                      <Skill key={skill?.id} skill={skill} isOfferSkill />
                    ))}
                  </Box>
                </Grid>

                {/* Form Body */}
                <Grid item xs={12} sm={12} md={6} className="px-4 py-3">
                  <Typography variant="h6" className="fw-500 mb-3">
                    Your Offer
                  </Typography>

                  {/* SELECT TASK FIELD */}
                  <Box className="mb-3">
                    <Typography variant="body2" className="fw-500 mb-2">
                      Select Task
                    </Typography>

                    <FormikSelectField name="job_skill" options={transformedTaskOptions || []} />
                  </Box>

                  {/* SELECT GIG FIELD */}
                  <Box className="mb-3">
                    <Typography variant="body2" className="fw-500 mb-2">
                      Select Gig
                    </Typography>

                    <FormikSelectField name="gig" options={transformedGigOptions || []} />
                  </Box>

                  {/* DESCRIPTION FIELD */}
                  <Box className="mb-3">
                    <Typography variant="body2" className="fw-500 mb-2">
                      Description
                    </Typography>

                    <FormikField type="textarea" name="description" fullWidth />
                  </Box>

                  {/* DESCRIPTION FIELD */}
                  <Box className="mb-3">
                    <Typography variant="body2" className="fw-500 mb-2">
                      Choose Your Budget
                    </Typography>

                    <ToggleButtonGroup
                      value={values.budget_type}
                      exclusive
                      className="d-flex align-items-center justify-content-between gap-3"
                      onChange={(e, newVal) => handleToggleProjectType(e, newVal, setFieldValue)}
                    >
                      <Card sx={formToggleButtonsStyles} component={ToggleButton} value="project_budget">
                        <CardContent>
                          <Typography variant="h6" className="fw-600" color={darkPurple}>
                            Project Budget
                          </Typography>

                          <Typography variant="body2" className="text-muted">
                            You can charge on Project Based
                          </Typography>
                        </CardContent>
                      </Card>

                      <Card sx={formToggleButtonsStyles} component={ToggleButton} value="monthly_based">
                        <CardContent>
                          <Typography variant="h6" className="fw-600" color={darkPurple}>
                            Monthly Budget
                          </Typography>

                          <Typography variant="body2" className="text-muted">
                            You can charge on Monthly Based
                          </Typography>
                        </CardContent>
                      </Card>
                    </ToggleButtonGroup>
                  </Box>

                  <Box className="mb-3 d-flex align-items-start gap-3">
                    <Box className="col">
                      <Typography variant="body2" className="fw-500 mb-2">
                        Budget (USD)
                      </Typography>

                      <FormikField type="price" name="rates" fullWidth />
                    </Box>

                    <Box className="col">
                      <Typography variant="body2" className="fw-500 mb-2">
                        {values.budget_type === PROJECT_BASED ? 'Days' : 'Months'}
                      </Typography>

                      <FormikField type={timelineField} name="timeline" fullWidth />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}

BuyerRequestForm.propTypes = {
  id: propTypes.number,
  taskId: propTypes.number,
  handleToggle: propTypes.func.isRequired,
};

BuyerRequestForm.defaultProps = {
  taskId: null,
  id: null,
};

export default BuyerRequestForm;
