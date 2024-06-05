import React, { useState } from 'react';
import { Grid, Box, Typography, Divider, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';

// STYLES
import styles from 'styles/portal/freelancer/profile/profile.module.scss';
import {
  billingPaymentsTabStyles,
  billingPaymentsTabsStyles,
} from 'styles/mui/portal/profile-setting-styles';

// COMPONENTS
import TabPanel from 'containers/common/components/TabPanel';
// import CardList from './CardList';
// import CardDetailsModal from './CardDetailsModal';
import SetupPaypalAccount from '../SetupPaypalAccount';
import SetupPayoneerAccount from '../SetupPayoneerAccount';

function BillingPayments({ innerRef }) {
  const [value, setValue] = useState(0);
  // const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const togglePaymentModal = () => {
  //   setIsPaymentModalOpen(!isPaymentModalOpen);
  // };

  return (
    <Box ref={innerRef}>
      <Box className={`${styles.boxContainer} mt-5`}>
        <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4 ms-0">
          <Grid item lg={8} md={8} sm={6} className="p-0 ">
            <Box className={`${styles.header} d-flex  align-items-center`}>
              <Typography variant="dashboardh2" className="weight-700">
                Billing & Payments
              </Typography>
            </Box>
          </Grid>

          <Grid item lg={4} md={4} sm={6} className="p-0 ">
            <Box className={`${styles.tabBarContainer} d-flex  align-items-end justify-content-end header `}>
              <Box sx={{ borderBottom: '1px', borderColor: '#FEA87E' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={billingPaymentsTabsStyles}
                >
                  {/* <Tab label="Credit / Depit Card" sx={billingPaymentsTabStyles} /> */}

                  <Tab label="Paypal" sx={billingPaymentsTabStyles} />

                  <Tab label="Payoneer" sx={billingPaymentsTabStyles} />
                </Tabs>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ color: '#ece9eb' }} />

      {/* <TabPanel stateValue={value} index={0}>
        <Box>
          <CardList />

          <Divider sx={{ color: '#ece9eb' }} />

          <Box className={`${styles.bottomFooter} px-3 px-lg-4 px-md-4 px-sm-4 ms-0`}>
            <Box
              className={`${styles.footer} d-flex justify-content-center justify-content-lg-end justify-content-md-center justify-content-sm-center align-items-center `}
            >
              <Typography variant="body1" className="weight-500 me-3 pointer" color={darkPurple}>
                Cancel
              </Typography>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="px-lg-5 px-md-3 px-sm-1  py-2"
                onClick={togglePaymentModal}
              >
                Add Card
              </Button>
            </Box>
          </Box>
        </Box>
      </TabPanel> */}

      <TabPanel stateValue={value} index={0}>
        <SetupPaypalAccount />
      </TabPanel>

      <TabPanel stateValue={value} index={1}>
        <SetupPayoneerAccount />
      </TabPanel>

      {/* <CardDetailsModal isOpen={isPaymentModalOpen} handleClose={togglePaymentModal} /> */}
    </Box>
  );
}

BillingPayments.propTypes = {
  innerRef: PropTypes.object.isRequired,
};

export default BillingPayments;
