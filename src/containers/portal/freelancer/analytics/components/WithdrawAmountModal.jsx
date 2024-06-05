import React from 'react';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

// API HOOKS
import {
  useGetPayoneerAccountDetailsQuery,
  useWithdrawEarningsMutation,
} from 'services/private/payments/payoneer';

// STYLES & ASSETS
import { modalWrapperBoxStyles } from 'styles/mui/components/withdraw-modal-styles';
import { ReactComponent as PayoneerLogo } from 'assets/payoneer_logo.svg';

function WithdrawAmountModal({ isOpen, handleClose, amount, getUserSellerLevelAnalytics, getAsyncHandler }) {
  const { enqueueSnackbar } = useSnackbar();
  const { first_name: firstName, last_name: lastName } = useSelector(state => state?.auth?.userInfo);

  // API HOOKS
  const { data: payoneerAccountInfo } = useGetPayoneerAccountDetailsQuery();
  const [confirmWithdraw, { isLoading }] = useWithdrawEarningsMutation();

  // HANDLERS
  const handleConfirmWithdraw = async () => {
    if (payoneerAccountInfo?.payee_id) {
      const payload = { amount: +amount, payee_id: payoneerAccountInfo?.payee_id, currency: 'USD' };

      const confirmResp = await confirmWithdraw(payload);

      if ('data' in confirmResp) {
        getUserSellerLevelAnalytics();
        await getAsyncHandler();
        handleClose();
        enqueueSnackbar('Withdraw request has been sent successfully!', { variant: 'success' });
      }
    } else {
      enqueueSnackbar('Please Add your Payoneer Account in Settings Page', { variant: 'error' });
    }
  };

  // CONSTANTS
  const fullName = `${firstName} ${lastName}`;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalWrapperBoxStyles}>
        <Box className="d-flex align-items-center justify-content-between px-4 py-2">
          <Typography variant="h6" className="fw-500">
            Withdraw Earnings
          </Typography>

          <Box className="d-flex align-items-center gap-3">
            <Button className="px-4 py-2" onClick={handleClose}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="secondary"
              className="px-4 py-2"
              onClick={handleConfirmWithdraw}
              disabled={isLoading}
            >
              <PayoneerLogo />
            </Button>
          </Box>
        </Box>

        <Divider light />

        <Box className="px-4 py-4">
          <Box className="d-flex align-items-start flex-column gap-3">
            <Box className="d-flex align-items-center justify-content-center gap-2">
              <Typography variant="body1" className="fw-500">
                Name:
              </Typography>

              <Typography variant="body1">{fullName}</Typography>
            </Box>

            <Box className="d-flex align-items-center justify-content-center gap-2">
              <Typography variant="body1" className="fw-500">
                Payoneer Email:
              </Typography>

              <Typography variant="body1">{payoneerAccountInfo?.payee_id || 'NA'}</Typography>
            </Box>

            <Box className="d-flex align-items-center justify-content-center gap-2">
              <Typography variant="body1" className="fw-500">
                Amount:
              </Typography>

              <Typography variant="body1">{`$${amount || 0}`}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

WithdrawAmountModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  getUserSellerLevelAnalytics: propTypes.func,
  amount: propTypes.string,
  getAsyncHandler: propTypes.func,
};

WithdrawAmountModal.defaultProps = {
  getAsyncHandler: async () => {},
  getUserSellerLevelAnalytics: () => {},
  amount: '0',
};

export default WithdrawAmountModal;
