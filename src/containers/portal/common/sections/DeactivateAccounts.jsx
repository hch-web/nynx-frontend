import React, { useEffect } from 'react';
import { Grid, Box, Typography, useTheme, Divider, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// services
import { useDeactivateAccountMutation } from 'services/private/auth';
import { onLoggedOut } from 'store/slices/authSlice';

// styles
import styles from 'styles/portal/freelancer/profile/profile.module.scss';

// shared
import FormikCheckBox from 'shared/components/form/FormikCheckBox';
import { deactivateValidation } from '../utilities/schemaValidation';

function DeactivateAccount() {
  const theme = useTheme();
  const colors = theme.palette;
  const constrastBlack = colors.black.contrast;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [deactivateAccount, { isLoading, data, error, isSuccess }] = useDeactivateAccountMutation();
  const { userInfo } = useSelector(state => state.auth);
  const { deleted } = userInfo || {};

  const successMessage = data && data.message;
  useHandleApiResponse(error, isSuccess, successMessage);

  const isDeactivateinitValues = {
    status: deleted || false,
  };

  const handleNavigateToLogin = () => {
    dispatch(onLoggedOut());
    navigate('/');
  };

  useEffect(() => {
    if (isSuccess) handleNavigateToLogin();
  }, [isSuccess]);

  return (
    <Formik
      initialValues={isDeactivateinitValues}
      onSubmit={async values => {
        await deactivateAccount(values);
      }}
      validationSchema={deactivateValidation}
    >
      {({ values }) => (
        <Form>
          <Box className={`${styles.boxContainer} mt-5`}>
            <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4 ms-0">
              <Grid item lg={12} md={12} sm={12} className="p-0 ">
                <Box className={`${styles.header} d-flex  align-items-center`}>
                  <Typography variant="dashboardh2" className="weight-700">
                    Deactivate Account
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
          <Box className={`${styles.deactivateAccount} pt-1 pt-lg-3`}>
            <Grid
              container
              spacing={2}
              className="pt-2 my-2 my-md-4 px-3 px-lg-4 px-md-4 px-sm-4 ms-0 ms-0 w-100 "
            >
              <Grid item lg={12} md={12} sm={12} className="pt-0 px-0 d-flex align-items-center ">
                <FormikCheckBox name="status" />
                <Typography variant="dashboardCaption" className="weight-500" color={constrastBlack}>
                  Confirm Account Deactivation
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12}>
                <Divider sx={{ color: '#ece9eb' }} />
              </Grid>
            </Grid>
          </Box>
          <Box className={styles.bottomFooter}>
            <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4 ">
              <Grid item lg={12} md={12} sm={12} className=" px-0 w-100">
                <Box
                  className={`${styles.footer} d-flex justify-content-center justify-content-lg-end justify-content-md-center justify-content-sm-center align-items-center`}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="px-lg-5 px-md-3 px-sm-1 py-2 deactivate-button"
                    startIcon={isLoading && <CircularProgress />}
                    sx={{ color: '#D20000', background: '#feefef' }}
                    disabled={!values?.status}
                  >
                    Deactivate Account
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default DeactivateAccount;
