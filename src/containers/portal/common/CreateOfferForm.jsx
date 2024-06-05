import React, { useEffect, useRef } from 'react';
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
import { useGetGigListQuery } from 'services/private/gig';
import { useCreateOfferMutation } from 'services/private/chat/offer';

// STYLES
import { formToggleButtonsStyles } from 'styles/mui/public-pages/buyer-request/buyer-request-styles';

// UTILITIES & CUSTOM HOOKS
import { PROJECT_BASED } from 'utilities/constants';

// COMMON COMPONENTS
import SubmitButton from 'containers/common/components/SubmitButton';
import FormikField from 'shared/components/form/FormikField';
import FormikSelectField from 'shared/components/form/FormikSelectField';

// HOOKS
import useTransformGigOptions from 'custom-hooks/useTransformGigOptions';
import { createOfferFormValidationSchema } from './utilities/schemaValidation';
import { createGigInitialValues } from './utilities/initialValues';

// COMPONENTS
import FormUploadFiles from './FormUploadFiles';

// eslint-disable-next-line no-unused-vars
function CreateOfferForm({ handleToggleOfferModal, handleSentOffer, selectedUser }) {
  // HOOKS REFERENCING
  const theme = useTheme();

  const uploadFileInputRef = useRef(null);

  // REDUX STATE
  const { id } = useSelector(state => state.auth.userInfo);

  const gigListParams = { id, status: 'completed' };

  const { data: gigList } = useGetGigListQuery(gigListParams, { skip: !id });
  const [createOffer, { isSuccess: createOfferSuccess, isLoading: createOfferLoading }] = useCreateOfferMutation();

  // TRANSFORMER CUSTOM HOOKS
  const transformedGigOptions = useTransformGigOptions(gigList?.results);

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // HANDLER FUNCTIONS
  const handleToggleProjectType = (e, newValue, setFieldValue) => {
    if (newValue !== null) {
      setFieldValue('budget_type', newValue);
    }
  };

  const handleUploadFiles = (e, values, setFieldValue) => {
    const files = [...e.target.files];

    if (values.attachments?.length > 0) {
      setFieldValue('job_offer_attachments', [...values.job_offer_attachments, ...files]);
    } else {
      setFieldValue('job_offer_attachments', files);
    }
  };

  useEffect(() => {
    if (createOfferSuccess) {
      handleToggleOfferModal();
    }
  }, [createOfferSuccess]);

  return (
    <Formik
      initialValues={createGigInitialValues}
      validationSchema={createOfferFormValidationSchema}
      onSubmit={submittedValues => {
        const data = { ...submittedValues, profile: id, recieverId: selectedUser?.userId };
        createOffer(data).then(res => {
          handleSentOffer(res?.data);
        });
      }}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched }) => {
        const timelineField = values.budget_type === PROJECT_BASED ? 'days' : 'months';
        return (
          <Form>
            {/* HEADER */}
            <Box className="px-4 py-3 d-flex align-items-center justify-content-between">
              <Typography variant="h6" className="fw-500">
                Create Offer
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button onClick={handleToggleOfferModal} className="px-4 py-2">
                  Cancel
                </Button>

                <SubmitButton
                  title="Send Offer"
                  className="px-4 py-2"
                  variant="contained"
                  color="secondary"
                  isLoading={createOfferLoading || isSubmitting}
                />
              </Stack>
            </Box>

            <Divider light />

            {/* FORM BODY */}
            <Box sx={{ overflowY: 'auto' }}>
              <Grid container sx={{ height: 'calc(80vh - 76px)' }}>
                <Grid item xs={12} sm={12} md={12} className="px-4 py-3">
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

                  <Box className="mb-3">
                    <Button
                      sx={{
                        borderColor:
                          errors.job_offer_attachments
                          && touched.job_offer_attachments
                          && '#ff0000 !important',
                      }}
                      variant="file"
                      onClick={() => uploadFileInputRef.current.click()}
                    >
                      Add File
                    </Button>
                    <input
                      ref={uploadFileInputRef}
                      type="file"
                      multiple
                      hidden
                      onChange={e => handleUploadFiles(e, values, setFieldValue)}
                    />
                  </Box>
                  <FormUploadFiles name="job_offer_attachments" />
                </Grid>
              </Grid>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}

CreateOfferForm.propTypes = {
  handleToggleOfferModal: propTypes.func.isRequired,
  handleSentOffer: propTypes.func.isRequired,
  selectedUser: propTypes.object,
};

CreateOfferForm.defaultProps = {
  selectedUser: {},
};

export default CreateOfferForm;
