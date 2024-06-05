import React, { useEffect } from 'react';
import Layout from 'containers/public-pages/common/auth-layout/Layout';
import { Formik, Form } from 'formik';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FormikField from 'shared/components/form/FormikField';
import { useRegisterUserMutation, useCheckEmailExistenceMutation } from 'services/public/auth';
import { useLazyAuthorizedQuery } from 'services/private/auth';
import { privateApi } from 'services/private';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import SubmitButton from 'containers/common/components/SubmitButton';
import { isBadRequest } from 'shared/helpers/utility-functions';
import logo from '../../../../assets/Logo.svg';
import signupImg from '../../../../assets/signup.png';
import validationSchema from './utilities/validationSchema';
import initialValues from './utilities/initialValues';

const errorVariant = { variant: 'error' };

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [registerUser, { data, isLoading: isRegistering, isSuccess }] = useRegisterUserMutation();
  const [authorizeUser, { isLoading: isAuthorizing }] = useLazyAuthorizedQuery();
  const [checkEmail] = useCheckEmailExistenceMutation();

  useEffect(() => {
    if (data) {
      dispatch(privateApi.util.resetApiState());
      authorizeUser();
    }
  }, [data, isSuccess]);

  return (
    <Layout
      heading="Welcome to The Nynx"
      subHeading="Sign up. Grow your business. Make a difference"
      signupImage={signupImg}
    >
      <main className="d-flex flex-column align-items-center justify-content-center h-100">
        <Link to="/">
          <img src={logo} className="mb-4 d-block d-sm-block d-xl-none" alt="main" />
        </Link>
        <h5 className="poppins-medium">Get your free account</h5>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm, setErrors }) => {
            const checkEmailResp = await checkEmail(values.email);
            if ('error' in checkEmailResp) {
              if (isBadRequest(checkEmailResp.error) && checkEmailResp.error.data.message === false) {
                setErrors({ email: "Can't register with this email, Please provide another one!" });
              } else {
                enqueueSnackbar('Something went wrong!', errorVariant);
              }
            } else {
              const signupResp = await registerUser(values);
              if ('error' in signupResp) {
                if (isBadRequest(signupResp.error)) {
                  enqueueSnackbar(signupResp.error.data.message, errorVariant);
                }
              } else {
                enqueueSnackbar(signupResp.data.message, { variant: 'success' });
                resetForm(values);
                navigate('/auth/login', { replace: true });
              }
            }
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="d-flex flex-column align-items-center w-100 px-3 px-sm-0 px-md-0">
              <FormikField type="text" name="username" placeholder="Enter your username" />

              <FormikField type="text" name="email" placeholder="Enter your email" />

              <ToggleButtonGroup
                color="primary"
                value={values.isBuyer}
                exclusive
                onChange={(_, val) => setFieldValue('isBuyer', val)}
              >
                <ToggleButton value={false}>Become an Expert</ToggleButton>
                <ToggleButton value>Become a Client</ToggleButton>
              </ToggleButtonGroup>

              <FormikField type="password" name="password" placeholder="Enter your password" />

              <FormikField type="password" name="confirmPassword" placeholder="Confirm password" />

              <SubmitButton
                title="Create Free Account"
                className="my-3"
                isLoading={isSubmitting || isRegistering || isAuthorizing}
              />
            </Form>
          )}
        </Formik>
        <p className="text-muted d-flex mb-1">
          Already a member?{' '}
          <Link to="/auth/login" className="text-black mx-2 mb-0">
            Sign in
          </Link>
        </p>
      </main>
    </Layout>
  );
}

export default Signup;
