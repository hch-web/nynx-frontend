import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box, Typography, useTheme, Divider } from '@mui/material';
import { Formik, Form } from 'formik';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// services
import { useUpdateBasicInfoMutation } from 'services/private/user';
import { useListCountriesQuery, useLazyListTimeZonesQuery } from 'services/public/countries';

// styles
import styles from 'styles/portal/freelancer/profile/profile.module.scss';
import {
  flagIconStyles,
  timeZoneSelectStyles,
  selectSingleValueStyles,
} from 'styles/mui/portal/profile-setting-styles';

// assets
import editIcon from 'assets/editIcon.svg';

// shared components
import PortalFormikSelectField from 'shared/components/form/PortalFormikSelectField';
import FormikField from 'shared/components/form/FormikField';

// common components
import SubmitButton from '../../../common/components/SubmitButton';

// utilities
import { basicInfoinitValues } from '../utilities/initialValues';
import { basicInfoValidation } from '../utilities/schemaValidation';

function BasicInfo() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(basicInfoinitValues);
  const [updateBasicInfo, { isLoading, isSuccess, error }] = useUpdateBasicInfoMutation();
  const { data: countries } = useListCountriesQuery();
  const [listTimeZones, { data: countryTimeZones }] = useLazyListTimeZonesQuery();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    setInitialValues({
      first_name: userInfo?.first_name || '',
      last_name: userInfo?.last_name || '',
      company: userInfo?.company || '',
      phone: userInfo?.phone || '',
      company_site: userInfo?.company_site || '',
      country: userInfo?.country || '',
      time_zone: userInfo?.time_zone || '',
      username: userInfo?.username || '',
    });

    // Fetch time zones for selected country
    if (userInfo?.country) listTimeZones(userInfo?.country);
  }, [userInfo]);

  const countryOptions = countries?.map(element => ({
    label: element.common_name,
    value: element.id,
    flag: element.flag_svg,
  }));

  const timeZoneOptions = countryTimeZones?.map(element => ({
    label: element.time_zone,
    value: element.id,
  }));

  const renderCustomOption = ({ label, flag }) => (
    <Box className="d-flex align-items-center">
      {flag && <img src={flag} alt="Flag" style={flagIconStyles} />}
      <Typography variant="dashboardCaption" className="ms-2">
        {label}
      </Typography>
    </Box>
  );

  const successMessage = 'Your Information has been updated successfully';
  useHandleApiResponse(error, isSuccess, successMessage);

  const handleEditInfo = () => {
    setIsDisabled(false);
  };

  const handleClose = () => setIsDisabled(true);

  const handleCountryForTimeZone = value => {
    if (value) {
      listTimeZones(value);
    }
  };

  return (
    <>
      <Box className={`${styles.basicInfo} mt-5`}>
        <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4">
          <Grid item lg={12} md={12} sm={12} className="pt-0 w-100 ">
            <Box className={`${styles.infoHeader} d-flex justify-content-between align-items-center`}>
              <Box>
                <Typography variant="dashboardh2" className="weight-700">
                  Basic Info
                </Typography>
              </Box>

              <Box
                className={`${styles.editIcon} d-flex justify-content-center align-items-center`}
                onClick={handleEditInfo}
              >
                <img src={editIcon} alt="main" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ color: '#ece9eb' }} />

      <Box className={styles.basicInfoForm}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={values => {
            updateBasicInfo(values);
            setIsDisabled(true);
          }}
          validationSchema={basicInfoValidation}
        >
          <Form>
            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoFirstForm} px-3 px-lg-4 px-md-4 px-sm-4`}
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
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Username
                  </Typography>
                </label>
              </Grid>

              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0"
              >
                <FormikField
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={`${styles.inputDesign} ${styles.pinkBackground}`}
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoForm} px-3 px-lg-4 px-md-4 px-sm-4`}
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
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Full Name
                  </Typography>
                </label>
              </Grid>

              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0"
              >
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={12} className="w-100">
                    <FormikField
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      className={`${styles.inputDesign} ${styles.pinkBackground}`}
                      disabled={isDisabled}
                      fullWidth
                    />
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} className="w-100">
                    <FormikField
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      className={`${styles.inputDesign} ${styles.pinkBackground}`}
                      fullWidth
                      disabled={isDisabled}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoForm} px-3 px-lg-4 px-md-4 px-sm-4`}
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
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Company
                  </Typography>
                </label>
              </Grid>

              <Grid item lg={6} md={12} sm={12} className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0">
                <FormikField
                  type="text"
                  name="company"
                  placeholder="Company"
                  className={`${styles.inputDesign} ${styles.pinkBackground}`}
                  fullWidth
                  disabled={isDisabled}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoForm} px-3 px-lg-4 px-md-4 px-sm-4`}
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
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Contact Phone
                  </Typography>
                </label>
              </Grid>

              <Grid item lg={6} md={12} sm={12} className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0">
                <FormikField
                  type="text"
                  name="phone"
                  placeholder="Contact Phone"
                  className={`${styles.inputDesign}`}
                  fullWidth
                  disabled={isDisabled}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoForm} px-3 px-lg-4 px-md-4 px-sm-4`}
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
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Company Site
                  </Typography>
                </label>
              </Grid>

              <Grid item lg={6} md={12} sm={12} className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0">
                <FormikField
                  type="text"
                  name="company_site"
                  placeholder="Company Site"
                  className={`${styles.inputDesign}`}
                  fullWidth
                  disabled={isDisabled}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoForm} px-3 px-lg-4 px-md-4 px-sm-4`}
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
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Country
                  </Typography>
                </label>
              </Grid>

              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0 position-relative"
              >
                <PortalFormikSelectField
                  options={countryOptions || []}
                  maxMenuHeight={150}
                  name="country"
                  singleValueStyle={selectSingleValueStyles}
                  isDisabled={isDisabled}
                  onChange={handleCountryForTimeZone}
                  formatOptionLabel={renderCustomOption}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoForm} px-3 px-lg-4 px-md-4 px-sm-4`}
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
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Time Zone
                  </Typography>
                </label>
              </Grid>

              <Grid item lg={6} md={12} sm={12} className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0">
                <PortalFormikSelectField
                  name="time_zone"
                  placeholder="Time Zone"
                  options={timeZoneOptions || []}
                  singleValueStyle={selectSingleValueStyles}
                  inputStyle={timeZoneSelectStyles}
                  isDisabled={isDisabled}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box pt={2}>
              <Divider className="mt-3" sx={{ color: '#ece9eb' }} />
            </Box>

            <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4">
              <Grid item lg={12} md={12} sm={12} className=" px-0 w-100">
                <Box
                  className={`${styles.formFooter} d-flex justify-content-center justify-content-lg-end justify-content-md-center justify-content-sm-center align-items-center`}
                >
                  {!isDisabled && (
                    <Typography
                      variant="body1"
                      className={`${styles.cancelBtn} weight-500 me-2`}
                      color={darkPurple}
                      sx={{ cursor: 'pointer' }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Typography>
                  )}

                  <SubmitButton
                    title="save"
                    className="px-lg-5 px-md-3 px-sm-1 py-2"
                    isLoading={isLoading}
                    disabled={isDisabled}
                  />
                </Box>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </>
  );
}

export default BasicInfo;
