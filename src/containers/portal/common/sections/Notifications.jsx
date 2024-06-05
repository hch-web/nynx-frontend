import React from 'react';
import { Grid, Box, Typography, Divider, Button, useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

// styles
import styles from 'styles/portal/freelancer/profile/profile.module.scss';

// shared components
import FormikCheckBox from 'shared/components/form/FormikCheckBox';
import { settingsNotificationsData } from '../utilities/data';

function Notifications({ innerRef }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const initForm = {
    email: '',
    phone: '',
  };

  const initValues = {
    notifications: initForm,
    billingUpdates: initForm,
    newTeamMembers: initForm,
    completedProjects: initForm,
    newsLetters: initForm,
  };

  return (
    <Box ref={innerRef}>
      <Formik
        initialValues={initValues}
        onSubmit={(_, { resetForm }) => {
          resetForm();
        }}
      >
        <Form>
          <Box className={`${styles.notifications} mt-5 px-3 px-lg-4 px-md-4 px-sm-4 py-3`}>
            <Typography variant="dashboardh2" className="weight-700">
              Notifications
            </Typography>
          </Box>

          <Divider sx={{ color: '#ece9eb' }} />

          <Box className={`${styles.notificationsCheckBoxes} bg-white`}>
            {settingsNotificationsData?.map((item, idx) => (
              <Box key={item?.id}>
                <Grid container className="px-3 px-lg-4 px-md-4 px-sm-4 py-2 ms-0 d-flex align-items-center">
                  <Grid item lg={8} md={8} sm={6} xs={12} className={`${styles.checkbox} my-1 px-0`}>
                    <Typography variant="dashboardh6" className="weight-500">
                      {item?.label}
                    </Typography>
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12} className="my-1 px-0 d-flex justify-content-center">
                    <Box className="col d-flex align-items-center justify-content-center justify-content-sm-start">
                      <FormikCheckBox name={`${item?.formikKey}.email`} />

                      {idx === 0 && (
                        <Typography variant="dashboardBody" className="weight-500">
                          Email
                        </Typography>
                      )}
                    </Box>

                    <Box className="col d-flex align-items-center justify-content-center justify-content-sm-start">
                      <FormikCheckBox name={`${item?.formikKey}.phone`} />

                      {idx === 0 && (
                        <Typography variant="dashboardBody" className="weight-500">
                          Phone
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ color: '#ece9eb' }} />
              </Box>
            ))}

            <Box
              className={`${styles.notificationFooter} d-flex justify-content-center justify-content-lg-end justify-content-md-center justify-content-sm-center align-items-center px-3 gap-3`}
            >
              <Typography variant="body1" className="weight-500 me-3 pointer" color={darkPurple}>
                Cancel
              </Typography>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="px-lg-5 px-md-3 px-sm-1  py-2"
              >
                save
              </Button>
            </Box>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
}

Notifications.propTypes = {
  innerRef: PropTypes.object.isRequired,
};

export default Notifications;
