import React from 'react';
import { Grid, Typography, Box, useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import SubmitButton from 'containers/common/components/SubmitButton';
import { Link, useParams } from 'react-router-dom';
import FormikField from 'shared/components/form/FormikField';
import { useResetPasswordMutation } from 'services/public/auth';
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import logo from '../../../../assets/Logo.svg';
import initialValues from './utilities/initialValues';
import validationSchema from './utilities/validationSchema';

function ResetPassword() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const [resetPassword, { data, isLoading, error, isSuccess }] = useResetPasswordMutation();
  const { activationKey } = useParams();
  const successMessage = data && data.message;

  useHandleApiResponse(error, isSuccess, successMessage);
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ height: '100vh', background: '#FFF6EC' }}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <Box>
          <Link to="/">
            <Box className="d-flex justify-content-center">
              <img src={logo} alt="main" />
            </Box>
          </Link>
          <Box>
            <Typography variant="h6" className="my-4 text-center " sx={{ fontWeight: '500' }}>
              Create New Password
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              const { password } = values;
              resetPassword({ activationKey, password });
              resetForm(values);
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form className="w-100 d-flex flex-column align-items-center px-2">
                <FormikField type="password" name="password" placeholder="Enter New Password" />

                <FormikField type="password" name="reEnterPassword" placeholder="Re-enter New Password" />
                <Box className="d-flex justify-content-start">
                  <Typography variant="body1" className="my-3 ms-md-4 ms-lg-4" color={darkPurple}>
                    *Passward should be: <br />
                    -Atleast 8 characters long <br />
                    -Should have atleast one upper case letter <br />
                    -Should have atleast one lowercase letter <br />
                    -Should have atleast a Number or a special Character <br />
                  </Typography>
                </Box>
                <SubmitButton title="Submit" className="my-2" isLoading={isSubmitting || isLoading} />
              </Form>
            )}
          </Formik>
          <Box className="d-flex justify-content-center mt-2">
            <p className="text-muted d-flex mb-1 ">
              Already a member?{' '}
              <Link to="/auth/login" className="text-black mx-2 mb-0">
                Sign In
              </Link>
            </p>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ResetPassword;
