import React, { useEffect } from 'react';
import Layout from 'containers/public-pages/common/auth-layout/Layout';
import { Formik, Form } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormikField from 'shared/components/form/FormikField';
import { useLoginUserMutation } from 'services/public/auth';
import { useDispatch, useSelector } from 'react-redux';
import { onLoggedIn } from 'store/slices/authSlice';
import { privateApi } from 'services/private';
import SubmitButton from 'containers/common/components/SubmitButton';
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import useGetGlobalAppContext from 'custom-hooks/useGetGlobalAppContext';
import { useLazyAuthorizedQuery } from 'services/private/auth';
import { getCancelPayoutURL, onlineSocketURL } from 'utilities/socket-urls';
import logo from '../../../../assets/nav-logo-dark_auth.png';
import loginImg from '../../../../assets/login.png';
import initValues from './utilities/initialValues';
import validationSchema from './utilities/validationSchema';

function Login() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleUpdateSocket, updateCancelPayoutSocket } = useGetGlobalAppContext();

  // API HOOKS
  const [loginUser, { data, isLoading: isLoggingIn, error: loginApiError, isSuccess }] = useLoginUserMutation();
  const [authorizeUser, { isLoading: isAuthorizing }] = useLazyAuthorizedQuery();

  // CUSTOM HOOKS
  useHandleApiResponse(loginApiError);

  // REDUX STATE
  const { isAuthenticated } = useSelector(userState => userState.auth);

  useEffect(() => {
    if (data) {
      dispatch(privateApi.util.resetApiState());

      dispatch(onLoggedIn(data));

      authorizeUser().then(res => {
        dispatch(onLoggedIn(res.data));
      });

      if (state?.from) {
        navigate(state.from, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [data]);

  return (
    <Layout heading="We're excited to see how you work!" loginImage={loginImg}>
      <main className="d-flex flex-column align-items-center justify-content-center h-100">
        <Link to="/">
          <img src={logo} className="mb-4 d-block d-sm-block d-xl-none" alt="login-img" />
        </Link>

        <h5 className="poppins-medium mb-3">Welcome back!</h5>

        <Formik
          initialValues={initValues}
          onSubmit={async (values, { resetForm }) => {
            const loginResp = await loginUser(values);
            const token = loginResp?.data?.token;

            const socket = new WebSocket(`${onlineSocketURL}${token}`);
            const cancelPayoutSocket = new WebSocket(getCancelPayoutURL());

            handleUpdateSocket(socket);
            updateCancelPayoutSocket(cancelPayoutSocket);

            if (isSuccess) {
              resetForm(values);
            }
          }}
          validationSchema={validationSchema}
        >
          <Form className="d-flex flex-column align-items-center w-100 px-3 px-sm-0 px-md-0">
            <FormikField
              className="loginFieldBorderColor"
              type="text"
              name="username_or_email"
              placeholder="Enter your Email"
            />

            <FormikField
              className="loginFieldBorderColor"
              type="password"
              name="password"
              placeholder="Enter your Password"
            />

            <SubmitButton title="Log in to NYNX" className="my-4" isLoading={isLoggingIn || isAuthorizing} />
          </Form>
        </Formik>
        <p className="text-muted d-flex mb-1">
          Not a member?
          <Link to="/auth/signup" className="text-black mx-2 mb-0">
            Sign up
          </Link>
        </p>
        <Link to="/auth/forgot-password" className="text-black">
          Forgot your password?
        </Link>
      </main>
    </Layout>
  );
}

export default Login;
