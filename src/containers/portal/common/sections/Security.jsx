import React from 'react';
import { Grid, Box, Typography, useTheme, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

// hook
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// services
import { useLoginChangePasswordMutation } from 'services/private/auth';

// styles
import styles from 'styles/portal/freelancer/profile/profile.module.scss';

// shared components
import FormikField from 'shared/components/form/FormikField';

// common components
import SubmitButton from '../../../common/components/SubmitButton';

// utilities
import { securityInitialValues } from '../utilities/initialValues';
import { securityValidation } from '../utilities/schemaValidation';

function Security({ innerRef }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const [loginChangePassword, { isLoading, error, isSuccess }] = useLoginChangePasswordMutation();
  const successMessage = 'Your Password has been changed Successfully';

  useHandleApiResponse(error, isSuccess, successMessage);

  return (
    <Box className="bg-white" ref={innerRef}>
      <Box className={`${styles.boxContainer} mt-5 basic-info`}>
        <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4 ms-0">
          <Grid item lg={12} md={12} sm={12} className="p-0 ">
            <Box className={`${styles.header} d-flex  align-items-center`}>
              <Typography variant="dashboardh2" className="weight-700">
                Security
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} className="pt-0">
            <Divider className="mt-3" sx={{ color: '#ece9eb' }} />
          </Grid>
        </Grid>
      </Box>
      <Box className="basic-info-form">
        <Formik
          initialValues={securityInitialValues}
          onSubmit={(values, { resetForm }) => {
            loginChangePassword(values);
            resetForm(values);
          }}
          validationSchema={securityValidation}
        >
          {({ isSubmitting, resetForm, values }) => (
            <Form className="mt-0 mt-lg-3 ">
              <Grid
                container
                spacing={2}
                className="px-3 px-lg-4 px-md-4 px-sm-4"
                sx={{ width: 'auto', margin: '0px' }}
              >
                <Grid
                  item
                  lg={6}
                  md={12}
                  sm={12}
                  xs={12}
                  className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 pt-0 d-flex align-items-center"
                >
                  <label htmlFor="firstName">
                    <Typography variant="dashboardh6" className="weight-500">
                      Current Password
                    </Typography>
                  </label>
                </Grid>
                <Grid item lg={6} md={12} sm={12} className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0">
                  <FormikField type="password" name="current_password" fullWidth />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                className="px-3 px-lg-4 px-md-4 px-sm-4"
                sx={{ width: 'auto', margin: '0px' }}
              >
                <Grid
                  item
                  lg={6}
                  md={12}
                  sm={12}
                  xs={12}
                  className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 pt-0 d-flex align-items-center"
                >
                  <label htmlFor="firstName">
                    <Typography variant="dashboardh6" className="weight-500">
                      New Password
                    </Typography>
                  </label>
                </Grid>
                <Grid item lg={6} md={12} sm={12} className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0">
                  <FormikField type="password" name="new_password" fullWidth />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                className="px-3 px-lg-4 px-md-4 px-sm-4"
                sx={{ width: 'auto', margin: '0px' }}
              >
                <Grid
                  item
                  lg={6}
                  md={12}
                  sm={12}
                  xs={12}
                  className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 pt-0 d-flex align-items-center"
                >
                  <label htmlFor="firstName">
                    <Typography variant="dashboardh6" className="weight-500">
                      Confirm Password
                    </Typography>
                  </label>
                </Grid>
                <Grid item lg={6} md={12} sm={12} className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0">
                  <FormikField type="password" name="confirmPassword" fullWidth />
                  <Typography variant="dashboardBody" className="weight-500" sx={{ color: '#A0919B' }}>
                    8 characters or longer. Combine upper and lowercase letters and numbers.
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12}>
                  <Divider className="mt-4" sx={{ color: '#ece9eb' }} />
                </Grid>
              </Grid>
              <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4 ms-0">
                <Grid item lg={12} md={12} sm={12} className="w-100 px-0">
                  <Box
                    className={`${styles.footer} d-flex justify-content-center justify-content-lg-end justify-content-md-center justify-content-sm-center align-items-center`}
                  >
                    {(values.current_password || values.confirmPassword || values.new_password) && (
                      <Typography
                        variant="body1"
                        className={`${styles.cancelBtn} weight-500 me-2`}
                        color={darkPurple}
                        sx={{ cursor: 'pointer' }}
                        onClick={resetForm}
                      >
                        Cancel
                      </Typography>
                    )}
                    <SubmitButton
                      title="save"
                      className="px-lg-5 px-md-3 px-sm-1 py-2"
                      isLoading={isSubmitting || isLoading}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

Security.propTypes = {
  innerRef: PropTypes.object.isRequired,
};

export default Security;
