import React, { useRef } from 'react';
import { Grid, Box, Typography, useTheme, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// assets
import LocationIcon from 'assets/location.svg';
import badge from 'assets/badge.svg';

// styles
import styles from 'styles/portal/freelancer/profile/profile.module.scss';

// shared
import ProfileImgBox from 'containers/portal/common/ProfileImgBox';
import { profileLinks } from '../../../common/utilities/data';
import BasicInfo from '../../../common/sections/BasicInfo';
import Notifications from '../../../common/sections/Notifications';
import BillingPayments from '../../../common/sections/BillingPayments';
import BillingAddress from '../../../common/sections/BillingAddress';
import Security from '../../../common/sections/Security';
import DeactivateAccount from '../../../common/sections/DeactivateAccounts';
import ConnectedAccounts from '../../../common/sections/ConnectedAccounts';

function ProfileStats() {
  const notificationRef = useRef(null);
  const billingRef = useRef(null);
  const securityRef = useRef(null);

  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const darkGrey = colors.grey.dark;

  const {
    userInfo: {
      image,
      first_name: firstName,
      last_name: lastName,
      username,
      country_label: countryLabel,
      id,
      total_earning: totalEarning = 0,
      total_job: totalJob = 0,
      total_completed_job: completedJobs = 0,
    },
  } = useSelector(state => state.auth);

  // constants
  const userFullName = !!firstName && !!lastName ? `${firstName} ${lastName}` : username;

  const handleClick = to => {
    if (to === 'notfications') {
      notificationRef.current?.scrollIntoView();
    }
    if (to === 'billing') {
      billingRef.current?.scrollIntoView();
    }
    if (to === 'security') {
      securityRef.current?.scrollIntoView();
    }
  };

  return (
    <Box>
      <Box className={`${styles.profileDetails} pt-5 pb-2`}>
        <Box
          className={`${styles.profileInfoContainer} d-flex align-items-start px-3 px-lg-4 px-md-4 px-sm-4 gap-3`}
        >
          <ProfileImgBox image={image} />

          <Box
            className={`${styles.profileTitle} d-flex flex-column justify-content-between  my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0 h-100`}
          >
            <Box className="mb-4">
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} xs={12} className={`${styles.nameContainer}`}>
                  <Box className={`${styles.centerAlign} ${styles.titleLInk}`}>
                    <Box className={`${styles.contentFullWidth}`}>
                      <Typography variant="dashboardh4" color={darkPurple} className="weight-900">
                        {userFullName}
                      </Typography>

                      <img src={badge} alt="main" className="ps-2" />
                    </Box>

                    <Box className={`${styles.contentFullWidth}`}>
                      <Typography variant="dashboardBody" className="weight-500">
                        Want to update your public Profile{' '}
                        <Link className={styles.profilLink} to={`/profile/${id}`}>
                          Go to Profile
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item lg={12} md={12} xs={12} className={`${styles.centerAlign} py-0`}>
                  {countryLabel && (
                    <Box className={`${styles.locationCenterAlign}`}>
                      <img src={LocationIcon} alt="location-main" className="me-1" />
                      <Typography variant="dashboardBody" color="#a0919b" className="weight-500">
                        {countryLabel}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>

            <Box className=" mb-0 mb-lg-0 mb-sm-4 d-flex">
              <Grid container spacing={2} className="d-flex">
                <Grid item xl={8} lg={12} md={12} xs={12} className={`${styles.infoBoxesContainer} py-0`}>
                  <Box className={`${styles.infoBoxesContainer} d-flex flex-wrap center-align`}>
                    <Box
                      className={`${styles.statsBox} d-flex flex-column  mt-1 py-1 ms-2 ms-lg-0  ms-md-0 `}
                    >
                      <Typography variant="dashboardh1" className="weight-900">
                        ${totalEarning}
                      </Typography>
                      <Typography variant="dashboardBody" color="#a0919b" className="weight-500">
                        Total Earning
                      </Typography>
                    </Box>
                    <Box className={`${styles.statsBox} d-flex flex-column py-1 mt-1  ms-2  ms-lg-2 ms-md-2`}>
                      <Typography variant="dashboardh1" className="weight-900">
                        {totalJob}
                      </Typography>
                      <Typography variant="dashboardBody" color="#a0919b" className="weight-500">
                        Total Jobs
                      </Typography>
                    </Box>
                    <Box className={`${styles.statsBox} mt-1 ms-2  ms-lg-2 ms-md-2 d-flex flex-column py-1`}>
                      <Typography variant="dashboardh1" className="weight-900">
                        {completedJobs}
                      </Typography>
                      <Typography variant="dashboardBody" color="#a0919b" className="weight-500">
                        Completed Jobs
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>

        <Grid
          container
          spacing={2}
          className={`${styles.profileResponsive} px-3 px-lg-4 px-md-4 px-sm-4`}
          sx={{ width: 'auto', margin: '0px' }}
        >
          <Grid item lg={12} md={12} sm={12} className="p-0 mt-2 d-none d-sm-none d-md-none d-lg-block ">
            <Divider className="mt-3" sx={{ color: '#ece9eb' }} />
            <Box className="mt-3 ">
              {profileLinks.map((item, idx) => (
                <Box component="span" key={Math.random()} className="text-decoration-none">
                  <Typography
                    variant="dashboardh6"
                    color={darkGrey}
                    onClick={() => handleClick(item.to)}
                    className={
                      idx <= 0
                        ? `${styles.profileLink} p-2 weight-500 ${styles.active}`
                        : `${styles.profileInfoLikns} weight-500 ms-3 p-2 `
                    }
                  >
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <BasicInfo />

      <Notifications innerRef={notificationRef} />

      <ConnectedAccounts />

      <BillingPayments innerRef={billingRef} />

      <BillingAddress />

      <Security innerRef={securityRef} />

      <DeactivateAccount />
    </Box>
  );
}

export default ProfileStats;
