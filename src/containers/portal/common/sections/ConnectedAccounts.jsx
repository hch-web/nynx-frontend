import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box, Typography, useTheme, Divider, Button, CircularProgress } from '@mui/material';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// services
import { useListSocialMediaQuery, useAddSocialMediaMutation } from 'services/private/profile';

// styles
import styles from 'styles/portal/freelancer/profile/profile.module.scss';

// utilities
import { connectedAccountsList } from '../utilities/data';

// shared
import ConnectedAccountsModal from '../ConnectAccountModal';
import DisconnectAccountModal from '../DisconnectAccountModal';
import Switch from '../../../common/components/Switch';

function ConnectedAccounts() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkgrey = colors.grey.dark;
  const darkPurple = colors.darkPurple.main;

  const {
    userInfo: { id },
  } = useSelector(state => state.auth);

  const [addSocialMedia, { isSuccess, error, isLoading }] = useAddSocialMediaMutation();
  const { data: socialMediaAccountsData } = useListSocialMediaQuery();

  const [isConnectAccountModalOpen, setIsConnectAccountModalOpen] = useState(false);
  const [isDisconectAccountModalOpen, setIsOpenDisconectAccountModal] = useState(false);
  const [accountsToBeConnected, setAccountsToBeConnected] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const successMessage = 'Your account has been connected';

  useHandleApiResponse(error, isSuccess, successMessage);

  const handleConnectSocialMedia = (event, moduleID) => {
    if (event.target.checked) {
      setSelectedId(moduleID);
      setIsConnectAccountModalOpen(event.target.checked);
    } else {
      setIsOpenDisconectAccountModal(true);
      setSelectedId(moduleID);
    }
  };

  const toggleConnectAccountModal = () => setIsConnectAccountModalOpen(false);

  const toggleDisconnectAccountModal = () => setIsOpenDisconectAccountModal(false);

  const handleAddConnectedMedia = () => {
    addSocialMedia({ profile: id, medias: accountsToBeConnected });
    setAccountsToBeConnected([]);
  };

  const handleClose = () => setAccountsToBeConnected([]);

  return (
    <>
      <Box className={`${styles.boxContainer} mt-5`}>
        <Grid container spacing={2} className=" px-3 px-lg-4 px-md-4 px-sm-4 ms-0">
          <Grid item lg={12} md={12} sm={12} className="p-0 ">
            <Box className={`${styles.header} d-flex  align-items-center`}>
              <Typography variant="dashboardh2" className="weight-700">
                Connected Accounts
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

      <Box className={`${styles.bottomFooter} pt-3`}>
        {socialMediaAccountsData?.map((item, idx) => (
          <Box key={item.id}>
            <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4 ms-0">
              <Grid item lg={12} md={12} xs={12} className="px-0 py-4">
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Grid container spacing={2} className="d-flex align-items-center py-0">
                      <Grid item xl={0.6} lg={1} md={1} xs={12}>
                        <img src={item.icon} alt="main" style={{ width: '2rem', height: '2rem' }} />
                      </Grid>
                      <Grid item xl={11.4} lg={11} md={11} xs={12}>
                        <Box className={styles.socialMediaTitle}>
                          <Typography variant="dashboardCaption" className="weight-700">
                            {item.name}
                          </Typography>
                        </Box>
                        <Box className={styles.slogen}>
                          <Typography variant="dashboardBody" className="weight-700" color={darkgrey}>
                            {item.tag_line}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} className={`${styles.switch} d-flex justify-content-end pe-3`}>
                    <Switch
                      checked={item.is_connected}
                      onChange={event => handleConnectSocialMedia(event, item.id)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {connectedAccountsList.length !== idx + 1 && (
              <Grid container spacing={2} className="mb-2">
                <Grid item lg={12} md={12} sm={12} className="px-5">
                  <Divider sx={{ color: '#ece9eb' }} />
                </Grid>
              </Grid>
            )}
          </Box>
        ))}
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12}>
            <Divider sx={{ color: '#ece9eb' }} />
          </Grid>
        </Grid>
      </Box>
      <Box className="bg-white">
        <Grid container spacing={2} className="px-2 px-lg-4 px-md-4 px-sm-4 ">
          <Grid item lg={12} md={12} sm={12} className="w-100 px-0">
            <Box
              className={`${styles.footer} d-flex justify-content-center justify-content-lg-end justify-content-md-center justify-content-sm-center align-items-center`}
            >
              {accountsToBeConnected.length > 0 && (
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
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="px-lg-5 px-md-3 px-sm-1 py-2"
                onClick={handleAddConnectedMedia}
                disabled={accountsToBeConnected.length === 0}
              >
                {isLoading ? <CircularProgress size={20} /> : 'Save'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* connect account modal */}
      <ConnectedAccountsModal
        isConnectAccountModalOpen={isConnectAccountModalOpen}
        toggleConnectAccountModal={toggleConnectAccountModal}
        accountsToBeConnected={accountsToBeConnected}
        setAccountsToBeConnected={setAccountsToBeConnected}
        selectedId={selectedId}
      />
      {/* Disconect account modal */}
      <DisconnectAccountModal
        isDisconectAccountModalOpen={isDisconectAccountModalOpen}
        toggleDisconnectAccountModal={toggleDisconnectAccountModal}
        selectedId={selectedId}
      />
    </>
  );
}

export default ConnectedAccounts;
