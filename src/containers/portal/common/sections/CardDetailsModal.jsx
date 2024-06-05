/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import propTypes from 'prop-types';
import { useSnackbar } from 'notistack';

// API HOOKS
import { useAddCardDetailsMutation } from 'services/private/payments/cards';

// STYLES
import { addPaymentMethodModalStyles } from 'styles/common/profile/freelancer-profile-styles';
import styles from 'styles/portal/freelancer/profile-settings.module.scss';

// UTILITIES
import { cardNumberElementOptions } from '../utilities/stripe-options';

function CardDetailsModal({ isOpen, handleClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const { enqueueSnackbar } = useSnackbar();
  const [cardHolderName, setCardHolderName] = useState('');

  // API HOOKS
  const [addCardDetails, { isLoading }] = useAddCardDetailsMutation();

  // HANDLER FUNCTIONS
  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe && !elements) {
      handleClose();
      return;
    }

    if (cardHolderName.trim().length === 0) {
      enqueueSnackbar("Name field can't be empty", { variant: 'error' });

      return;
    }

    if (stripe) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: cardHolderName,
        },
      });

      if (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } else {
        await addCardDetails({ payment_method_id: paymentMethod.id });
      }

      setCardHolderName('');
    }

    handleClose();
  };

  const handleChangeCardHolderName = e => {
    setCardHolderName(e.target.value);
  };

  const handleCancel = () => {
    setCardHolderName('');
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className="bg-white mw-100" sx={addPaymentMethodModalStyles}>
        <Box className="d-flex align-items-center justify-content-between px-4 py-3">
          <Typography variant="h6" className="fw-500">
            Card Details
          </Typography>

          <Box className="d-flex align-items-center gap-3">
            <Button className="py-2 px-4" onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
              className="py-2 px-4"
              disabled={isLoading}
            >
              Save
            </Button>
          </Box>
        </Box>

        <Divider light />

        <Box className="px-4 py-3">
          <Box className="mb-3">
            <Typography variant="body2" className="mb-1 text-muted fw-500">
              CARD HOLDER NAME
            </Typography>

            <input
              className={`${styles.inputField} bg-light text-dark px-2 py-2 w-100`}
              placeholder="John"
              value={cardHolderName}
              onChange={handleChangeCardHolderName}
            />
          </Box>

          <Box className="mb-3">
            <Typography variant="body2" className="mb-1 text-muted fw-500">
              CARD NUMBER
            </Typography>

            <CardNumberElement className="bg-light py-3 px-2" options={cardNumberElementOptions} />
          </Box>

          <Box className="d-flex align-items-start gap-3">
            <Box className="col">
              <Typography variant="body2" className="mb-1 text-muted fw-500">
                EXPIRY DATE
              </Typography>

              <CardExpiryElement className="bg-light py-3 px-2" />
            </Box>

            <Box className="col">
              <Typography variant="body2" className="mb-1 text-muted fw-500">
                CVC NUMBER
              </Typography>

              <CardCvcElement className="bg-light py-3 px-2" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

CardDetailsModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default CardDetailsModal;
