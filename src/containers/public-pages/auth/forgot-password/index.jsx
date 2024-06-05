import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { onForgetEmail } from 'store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useForgotPasswordLinkMutation } from 'services/public/auth';
import { useLazyAuthorizedQuery } from 'services/private/auth';
import { privateApi } from 'services/private';
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import logo from '../../../../assets/nav-logo-dark_auth.png';
import initialValues from './utilities/initialValues';
import validationSchema from './utilities/validationSchema';

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordLinkMutation();
  const [authorizeUser, { isLoading: isAuthorizing }] = useLazyAuthorizedQuery();

  const [email, setEmail] = useState('');
  useHandleApiResponse(error);

  useEffect(() => {
    if (isSuccess) {
      dispatch(privateApi.util.resetApiState());
      dispatch(onForgetEmail(email));
      authorizeUser();
      navigate('/auth/verify-email', { replace: true });
    }
  }, [isSuccess]);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ height: '100vh', background: '#FFF6EC' }}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <Link to="/">
          <img src={logo} alt="main" />
        </Link>
        <Typography variant="h6" className="my-3">
          Forgot your password?
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            forgotPassword(values);
            setEmail(values.email);
            resetForm(values);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form className="w-100 d-flex flex-column align-items-center">
              <FormikField type="text" name="email" placeholder="Enter your email" />
              <SubmitButton title="Reset Password" className="my-2" isLoading={isSubmitting || isLoading || isAuthorizing} />
            </Form>
          )}
        </Formik>
        <p className="text-muted d-flex mb-1">
          Not a member?{' '}
          <Link to="/auth/signup" className="text-black mx-2 mb-0">
            Sign up
          </Link>
        </p>
      </Grid>
    </Grid>
  );
}

export default ForgotPassword;
