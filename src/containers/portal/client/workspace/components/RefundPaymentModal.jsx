import React from 'react';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

// API HOOKS
import { useGetPaypalAccountInfoQuery } from 'services/private/payments/paypal';
import { useAcceptPaypalRefundMutation } from 'services/private/payments/refund-task';

// STYLES
import { modalWrapperBoxStyles } from 'styles/mui/components/withdraw-modal-styles';
import { CLIENT_ORDER, DIRECT_HIRE, JOB_OFFER } from 'utilities/constants';

function RefundPaymentModal({ isOpen, handleClose, amount, refundId }) {
  const { taskId, taskVia } = useParams();
  const orderVia = taskVia === DIRECT_HIRE ? CLIENT_ORDER : JOB_OFFER;

  const { enqueueSnackbar } = useSnackbar();
  // REDUX STATE
  const { first_name: firstName, last_name: lastName } = useSelector(state => state?.auth?.userInfo);

  // API HOOKS
  const { data: paypalAccountInfo } = useGetPaypalAccountInfoQuery();
  const [acceptPaypalRefund, { isLoading }] = useAcceptPaypalRefundMutation();

  // HANDLERS
  const handleConfirmWithdraw = async () => {
    if (paypalAccountInfo?.paypal_email) {
      const body = {
        job_offer_id: +taskId,
        task_via: orderVia,
        amount: +amount,
        email: paypalAccountInfo?.paypal_email,
        refund_id: refundId,
      };

      const acceptPaypalRefundResponse = await acceptPaypalRefund(body);
      if (acceptPaypalRefundResponse.data) {
        handleClose();
        enqueueSnackbar('Transaction successfull!', { variant: 'success' });
      }
    } else {
      enqueueSnackbar('Please Add your Paypal Account in Settings Page', { variant: 'error' });
    }
  };

  // CONSTANTS
  const fullName = `${firstName} ${lastName}`;
  const email = paypalAccountInfo?.paypal_email || 'NA';

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalWrapperBoxStyles}>
        <Box className="d-flex align-items-center justify-content-between px-4 py-2">
          <Typography variant="h6" className="fw-500">
            Refund Amounts
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
              Confirm
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
                Paypal Email:
              </Typography>

              <Typography variant="body1">{email}</Typography>
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

RefundPaymentModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  refundId: propTypes.number,
  amount: propTypes.string,
};

RefundPaymentModal.defaultProps = {
  amount: '0',
  refundId: 0,
};

export default RefundPaymentModal;
