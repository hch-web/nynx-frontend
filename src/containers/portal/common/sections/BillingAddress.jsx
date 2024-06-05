import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  useTheme,
  Divider,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Add } from '@mui/icons-material';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// services
import { useUpdateBasicInfoMutation } from 'services/private/user';

// styles
import styles from 'styles/portal/freelancer/profile/profile.module.scss';

// components
import AddAddressModal from '../AddressModal';

function BillingAddress() {
  const theme = useTheme();
  const colors = theme.palette;
  const parrot = colors.parrot.main;
  const darkPurple = colors.darkPurple.main;
  const darkgrey = colors.grey.dark;
  const red = colors.red.main;
  const lightOrange = colors.lightOrange.main;
  const yellow = colors.yellow.main;

  const { userInfo } = useSelector(state => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [isOpenAddressModal, setIsOpenAddressModal] = useState(false);

  const [updateBasicInfo, { isLoading: deleteAddressLoading, error, isSuccess }] = useUpdateBasicInfoMutation();

  const successMessage = 'Your Address has been deleted Successfully';
  useHandleApiResponse(error, isSuccess, successMessage);

  const toggleAddressModal = () => {
    setIsOpenAddressModal(false);
    setIsEditing(false);
  };

  const handleShowAddressModal = e => setIsOpenAddressModal(e.currentTarget);

  const handleDeleteAddress = async () => {
    await updateBasicInfo({ address: null });
  };

  const handleEditAddress = e => {
    setIsEditing(true);
    setIsOpenAddressModal(e.currentTarget);
  };

  return (
    <>
      <Box className={`${styles.boxContainer} mt-5`}>
        <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4 ms-0">
          <Grid item lg={12} md={12} sm={12} className="p-0 ">
            <Box className={`${styles.header} d-flex  align-items-center justify-content-between`}>
              <Typography variant="dashboardh2" className="weight-700">
                Billing Address
              </Typography>
              {userInfo?.address === null && (
                <IconButton onClick={handleShowAddressModal}>
                  <Add sx={{ background: yellow, borderRadius: '50%' }} color={darkPurple} />
                </IconButton>
              )}
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
      <Box className={styles.billingAddressContainer}>
        {userInfo.address === null ? (
          <Box
            className="px-3 px-lg-4 px-md-4 px-sm-4 ms-0 w-100 d-flex justify-content-center align-items-center"
            sx={{ height: '10rem' }}
          >
            <Typography variant="dashboardh2" className="weight-500">
              Add your Address
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4 ms-0 w-100">
              <Grid item lg={12} md={12} sm={12} className="px-0 pt-2 pt-lg-5 pt-md-5">
                <Box className={`${styles.addressBox} p-3`}>
                  <Grid container spacing={2}>
                    <Grid item lg={10} md={10} sm={12}>
                      <Box>
                        <Typography variant="dashboardh5" className="weight-700" color={darkPurple}>
                          Address 1
                        </Typography>
                        <Button variant="contained" className={`${styles.primaryButton}  px-3 py-1 ms-1`}>
                          <Typography variant="dashboardCaption2" className="weight-700" color={parrot}>
                            Primary
                          </Typography>
                        </Button>
                      </Box>
                      <Box>
                        <Typography
                          variant="dashboardh6"
                          className={`${styles.newLineBreak} weight-500`}
                          color={darkPurple}
                        >
                          {userInfo?.address} <br /> {userInfo?.addres_country_label}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      lg={2}
                      md={2}
                      sm={12}
                      className="d-flex align-items-center justify-content-end"
                    >
                      <Box className="d-flex align-items-center justify-content-end">
                        <Typography
                          variant="dashboardCaption2"
                          className={`${styles.deleteBtn} weight-700 me-3 p-2`}
                          color={darkgrey}
                          sx={{ cursor: 'pointer' }}
                          onClick={handleDeleteAddress}
                        >
                          {deleteAddressLoading ? <CircularProgress size={18} /> : 'Delete'}
                        </Typography>
                        <Button
                          variant="contained"
                          className={`${styles.editButton}  px-3 py-2 ms-1`}
                          onClick={handleEditAddress}
                        >
                          <Typography variant="dashboardCaption2" className="weight-700" color={red}>
                            Edit
                          </Typography>
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4 ms-0 w-100">
              <Grid item lg={12} md={12} sm={12} className="px-0 py-5">
                <Box>
                  <Box>
                    <Typography variant="dashboardh6" className="weight-700" color={darkPurple}>
                      Tax Location
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="dashboardh6" className="weight-500" color={darkPurple}>
                      {userInfo?.addres_country_label} - 10% VAT
                      <Box component="span">
                        <Typography variant="dashboardh6" className="weight-500" color={lightOrange}>
                          More Info
                        </Typography>
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      {/* Billing Address Modal */}
      <AddAddressModal
        isOpenAddressModal={isOpenAddressModal}
        toggleAddressModal={toggleAddressModal}
        isSelected={isEditing}
        setIsSelected={setIsEditing}
      />
    </>
  );
}

export default BillingAddress;
