import React, { useRef, useLayoutEffect } from 'react';
import { Box, Container, Grid, Typography, styled, Button, useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Custom Hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// assets
import progressImg from 'assets/contact-us-progress.svg';

// styles
import { formBodyBoxWrapperStyles, stepsTypographyStyles } from 'styles/mui/public-pages/contact-us-styles';

// services
import { useSubmitContactUsDetailsMutation } from 'services/private/contact-us/contactUs';

// components
import FormikSelectField from 'shared/components/form/FormikSelectField';
import FormikField from 'shared/components/form/FormikField';
import UploadFIleButton from 'shared/components/form/UploadFIleButton';
import FormUploadFiles from 'shared/components/form/FormUploadFiles';
// utilities
import { contactUsInitialValues } from '../utilities/initialValues';
import { reportSubjectOption } from '../utilities/data';
import { contactUsValidationSchema } from '../utilities/validationSchema';

const Label = styled(Typography)(() => ({
  fontFamily: 'Roboto Flex, sans-serif',
  fontWeight: '500',
}));

function FormBody() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { state: routeState } = useLocation();

  const [submitContactUsDetails, { isSuccess: cotactUsSuccess, error: contactUsSuccess }] = useSubmitContactUsDetailsMutation();

  //  API RESPONSE
  const submitContactUssuccessMessage = 'Request has been submitted Successfully';
  useHandleApiResponse(contactUsSuccess, cotactUsSuccess, submitContactUssuccessMessage);

  const { userInfo } = useSelector(state => state.auth);
  const firstName = userInfo?.first_name || '';
  const lastName = userInfo?.last_name || '';
  const orderId = routeState?.orderDetail?.orderId;
  const reportSubject = routeState?.orderDetail?.subject;

  const formikRef = useRef(null);

  useLayoutEffect(() => {
    if (formikRef && userInfo) {
      formikRef.current.setFieldValue('first_name', firstName || '');
      formikRef.current.setFieldValue('last_name', lastName || '');
      formikRef.current.setFieldValue('order_number', orderId || '');
      formikRef.current.setFieldValue('subject', reportSubject || '');
    }
  }, [userInfo, formikRef]);

  return (
    <Container variant="public" className="pt-0 pt-md-5">
      <Grid container className="py-0 py-md-4">
        <Grid item md={5} className="pe-3">
          <Typography variant="h2" className="text-center text-md-start" color={darkPurple}>
            What will be Next Steps ?
          </Typography>
          <Typography
            variant="h6"
            className="py-3 py-sm-3 py-md-5 text-center text-md-start"
            color={darkPurple}
          >
            Our contact team will reach out to you within 24 hours to resolve any query.{' '}
          </Typography>

          <Box className="d-flex mb-4 mb-md-0">
            <Box className="d-none d-md-block">
              <img src={progressImg} alt="" />
            </Box>

            <Box className="d-flex flex-column flex-sm-row flex-md-column align-items-center justify-content-between col-12 col-md-10">
              <Box className="col-12 col-sm-4 col-md-12 d-flex flex-column align-items-center d-md-block text-center px-1 px-sm-2 px-md-0 mb-3 mb-sm-0">
                <Typography
                  variant="body1"
                  sx={stepsTypographyStyles}
                  className="d-flex d-md-none align-items-center justify-content-center mb-2"
                  color="#fff"
                >
                  1
                </Typography>
                <Typography variant="h6" fontWeight={500} color={darkPurple}>
                  Enter your name, email, message, query details.
                </Typography>{' '}
              </Box>
              <Box className="col-12 col-sm-4 col-md-12 d-flex flex-column align-items-center d-md-block text-center px-1 px-sm-2 px-md-0 mb-3 mb-sm-0">
                <Typography
                  variant="body1"
                  sx={stepsTypographyStyles}
                  className="d-flex d-md-none align-items-center justify-content-center mb-2"
                  color="#fff"
                >
                  2
                </Typography>
                <Typography variant="h6" fontWeight={500} color={darkPurple}>
                  Our team will investigate the matter thoroughly, and respond to you as soon as possible.
                </Typography>{' '}
              </Box>
              <Box className="col-12 col-sm-4 col-md-12 d-flex flex-column align-items-center d-md-block text-center px-1 px-sm-2 px-md-0 mb-3 mb-sm-0">
                <Typography
                  variant="body1"
                  sx={stepsTypographyStyles}
                  className="d-flex d-md-none align-items-center justify-content-center mb-2"
                  color="#fff"
                >
                  3
                </Typography>
                <Typography variant="h6" fontWeight={500} color={darkPurple}>
                  Once the query is resolved, you can give us your feedback.
                </Typography>{' '}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item md={7}>
          <Formik
            innerRef={formikRef}
            initialValues={contactUsInitialValues}
            validationSchema={contactUsValidationSchema}
            onSubmit={(values, { resetForm }) => {
              submitContactUsDetails(values);
              resetForm();
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <Box sx={formBodyBoxWrapperStyles} className="p-4 py-5">
                  <Box className="d-flex flex-column flex-sm-row justify-content-between mb-0 mb-sm-4">
                    <Box className="col-12 col-sm-6 pe-0 pe-sm-2 py-2 py-sm-0">
                      <Label className="mb-1">First Name</Label>
                      <FormikField type="text" name="first_name" placeholder="First Name" fullWidth />
                    </Box>
                    <Box className="col-12 col-sm-6 ps-0 ps-sm-2 py-2 py-sm-0">
                      <Label className="mb-1">Last Name</Label>
                      <FormikField type="text" name="last_name" placeholder="Last Name" fullWidth />
                    </Box>
                  </Box>

                  <Box className="d-flex flex-column flex-sm-row justify-content-between mb-0 mb-sm-4">
                    <Box className="col-12 col-sm-6 pe-0 pe-sm-2 py-2 py-sm-0">
                      <Label className="mb-1">Subject</Label>
                      <FormikSelectField
                        name="subject"
                        placeholder="Subject"
                        options={reportSubjectOption || []}
                      />
                    </Box>
                    <Box className="col-12 col-sm-6 ps-0 ps-sm-2 py-2 py-sm-0">
                      <Label className="mb-1">Task Number</Label>
                      <FormikField type="text" name="order_number" placeholder="Task Number" fullWidth />
                    </Box>
                  </Box>

                  <Box className="d-flex mb-4">
                    <Box className="col-12">
                      <Label>Details</Label>
                      <FormikField type="textarea" name="description" placeholder="Task Details" fullWidth />
                    </Box>
                  </Box>

                  {/* upload files */}
                  <UploadFIleButton
                    formValues={values}
                    setFieldValue={setFieldValue}
                    fieldName="report_images"
                  />

                  <FormUploadFiles name="report_images" />

                  <Button variant="contained" color="secondary" type="submit" className="w-100 py-3 my-3">
                    Send
                  </Button>

                  <Box className="col-10 mx-auto">
                    <Label variant="body1" className="text-muted text-center">
                      Our Contact Support Team is working hard to respond you as soon as possible. We will get
                      back to you in 24 Hours
                    </Label>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FormBody;
