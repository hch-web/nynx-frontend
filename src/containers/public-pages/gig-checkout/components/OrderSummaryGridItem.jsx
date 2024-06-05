import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { Grid, Box, Typography, Button, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useLocation } from 'react-router';

// API HOOKS
import { useSendPaypalOrderDetailsMutation } from 'services/private/payments/checkout';
import {
  useFreelancerFeedbackMutation,
  useUpdateChangeTermsRequestMutation,
} from 'services/private/task-details';
import { useAcceptChatOfferMutation } from 'services/private/chat/offer';

// STYLES
import styles from 'styles/public-pages/gig-checkout.module.scss';

// UTILITIES
import { ACCEPTED, ACCEPT_CUSTOM_OFFER, CHANGE_TERMS, MONTHLY_BASED, PAYPAL, TIP } from 'utilities/constants';
import { formatTimeline } from 'utilities/helpers';

function OrderSummaryGridItem({
  orderDetails,
  selectedPaymentMethod,
  btnLoading,
  btnDisabeld,
  handleCheckout,
  setPaymentDone,
  changeTermsData,
  setLoading,
}) {
  const { state } = useLocation();
  const { checkoutState } = state;
  const paypalCardButton = useRef();

  // API HOOKS
  const [sendPaypalOrderDetails] = useSendPaypalOrderDetailsMutation();
  const [freelancerFeedback] = useFreelancerFeedbackMutation();
  const [updateStatus] = useUpdateChangeTermsRequestMutation();
  const [acceptChatOffer] = useAcceptChatOfferMutation();

  const orderAmount = useMemo(() => {
    // RETURNING AMOUNT ACCORDING TO CHECKOUT TYPES
    if (checkoutState?.type === CHANGE_TERMS) {
      return changeTermsData?.rates;
    }
    if (checkoutState?.type === TIP) {
      return checkoutState?.payload?.tip;
    }
    if (checkoutState?.type === ACCEPT_CUSTOM_OFFER) {
      return checkoutState?.payload?.amount;
    }

    return orderDetails?.rates;
  }, [checkoutState, changeTermsData, orderDetails]);

  const handleCreatePaypalOrder = async (data, actions) => {
    const createOrder = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: orderAmount,
            currency_code: 'USD',
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        billing_preference: 'NO_BILLING',
      },
      intent: 'CAPTURE',
    });

    return createOrder;
  };

  const handleOnApprove = async (data, actions) => {
    setLoading(true);
    const captureOrder = await actions.order.capture();

    // GENERAL PAYLOAD
    const payload = {
      paypal_payment_id: captureOrder?.id,
      job_offer_id: checkoutState?.taskId,
      task_via: checkoutState?.taskVia,
    };

    // CHECKING CHECKOUT TYPES
    if (checkoutState?.type === TIP) {
      await freelancerFeedback(checkoutState?.payload);
      payload.type = TIP;
    } else if (checkoutState?.type === CHANGE_TERMS) {
      payload.type = CHANGE_TERMS;
      const body = { status: ACCEPTED, id: checkoutState?.changeTermsId };

      await updateStatus(body);
    } else if (checkoutState?.type === ACCEPT_CUSTOM_OFFER) {
      await acceptChatOffer(checkoutState?.payload);
    }

    // SENDING ORDER DETAILS TO BACKEND
    await sendPaypalOrderDetails(payload);

    if (captureOrder?.id) {
      setLoading(false);
      setPaymentDone(true);
    }
  };

  useLayoutEffect(() => {
    if (paypalCardButton.current) {
      window?.paypal
        ?.Buttons({
          createOrder: handleCreatePaypalOrder,
          application_context: {
            shipping_preference: 'NO_SHIPPING',
            billing_preference: 'NO_BILLING',
          },
          fundingSource: 'card',
          onApprove: handleOnApprove,
        })
        .render(paypalCardButton.current);
    }
  }, []);

  // CONSTANTS
  const packagePrice = useMemo(() => {
    if (orderDetails?.budget_type === MONTHLY_BASED) {
      return orderDetails.rates / orderDetails.timeline;
    }

    return orderDetails?.rates;
  }, [orderDetails]);
  const serviceFee = 0;
  const gigOrderTimeline = formatTimeline(orderDetails?.timeline, orderDetails?.budget_type);
  const changedTermsTimeline = formatTimeline(changeTermsData?.timeline, orderDetails?.budget_type);

  return (
    <Grid item xs={12} sm={12} md={4} className="border-start">
      <Box className={`${styles.orderGridItemBox} px-4 py-4`}>
        <Typography variant="h6" className="fw-500">
          Order Summary
        </Typography>

        {/* GIG INFO */}
        <Box className="my-3 d-flex align-items-center justify-content-start">
          {orderDetails?.main_image && (
            <img className={`${styles.gigImage} me-2`} src={orderDetails?.main_image} alt="gig-img" />
          )}

          {orderDetails?.gig_title && (
            <Typography variant="body1" className="text-capitalize fw-500">
              {orderDetails?.gig_title}
            </Typography>
          )}
        </Box>

        {/* STARTER BOX */}
        <Box className="d-flex flex-column align-items-start justify-content-center border-bottom pb-3">
          {changeTermsData ? (
            <>
              <Box className="d-flex align-items-center w-100 mb-2">
                <Box className="col">
                  <Typography variant="body1">New Delivery</Typography>
                </Box>

                <Typography variant="body1 fw-500">
                  {changeTermsData ? changedTermsTimeline : gigOrderTimeline}
                </Typography>
              </Box>

              <Box className="d-flex align-items-center w-100 mb-2">
                <Box className="col">
                  <Typography variant="body1">New Budget</Typography>
                </Box>

                <Typography variant="body1 fw-500">{changeTermsData?.rates}</Typography>
              </Box>
            </>
          ) : (
            <Box className="w-100">
              {checkoutState?.type === TIP ? (
                <Box className="d-flex align-items-center w-100 mb-2">
                  <Box className="col">
                    <Typography className="fw-500 text-capitalize" variant="body1">
                      Tip
                    </Typography>
                  </Box>

                  <Typography className="fw-500" variant="body1">
                    {`$${checkoutState?.payload?.tip}`}
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box className="d-flex align-items-center w-100 mb-2">
                    <Box className="col">
                      <Typography className="fw-500 text-capitalize" variant="body1">
                        {orderDetails?.gig_package || 'Basic'}
                      </Typography>
                    </Box>

                    {packagePrice && (
                      <Box>
                        <Typography className="fw-500" variant="body1">
                          {`$${packagePrice}`}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Box className="d-flex align-items-center w-100 mb-2">
                    <Box className="col">
                      <Typography variant="body1">Delivery Time</Typography>
                    </Box>

                    <Typography variant="body1 fw-500">{gigOrderTimeline}</Typography>
                  </Box>

                  {orderDetails?.number_of_revisions && (
                    <Box className="d-flex align-items-center w-100 mb-2">
                      <Box className="col">
                        <Typography variant="body1">No of Revisions</Typography>
                      </Box>

                      <Typography variant="body1 fw-500">{orderDetails?.number_of_revisions}</Typography>
                    </Box>
                  )}

                  {orderDetails?.number_of_concepts && (
                    <Box className="d-flex align-items-center w-100 mb-2">
                      <Box className="col">
                        <Typography variant="body1">No of Initial Concepts</Typography>
                      </Box>

                      <Typography variant="body1 fw-500">{orderDetails?.number_of_concepts}</Typography>
                    </Box>
                  )}

                  {orderDetails?.number_of_pages && (
                    <Box className="d-flex align-items-center w-100 mb-2">
                      <Box className="col">
                        <Typography variant="body1">No of Pages</Typography>
                      </Box>

                      <Typography variant="body1 fw-500">{orderDetails?.number_of_pages}</Typography>
                    </Box>
                  )}
                </>
              )}
            </Box>
          )}
        </Box>

        {/* SUBTOTAL BOX */}
        <Box className="d-flex flex-column align-items-center border-bottom py-3">
          <Box className="d-flex align-items-center w-100 mb-2">
            <Box className="col">
              <Typography variant="body1">Subtotal</Typography>
            </Box>

            <Typography className="fw-500" variant="body1">
              {`$${orderAmount + serviceFee}`}
            </Typography>
          </Box>

          <Box className="d-flex align-items-center w-100 mb-2">
            <Box className="col">
              <Typography variant="body1">Service fee</Typography>
            </Box>

            <Typography className="fw-500" variant="body1">
              {`$${serviceFee}`}
            </Typography>
          </Box>
        </Box>

        {/* TOTAL BOX */}
        <Box className="d-flex flex-column align-items-center border-bottom py-3">
          <Box className="d-flex align-items-center w-100 mb-2">
            <Box className="col">
              <Typography className="fw-600" variant="body1">
                Total
              </Typography>
            </Box>

            <Typography className="fw-600" variant="body1">
              {`$${orderAmount + serviceFee}`}
            </Typography>
          </Box>
        </Box>

        {/* SUBMIT BUTTON */}
        <Box className="text-center my-3">
          {selectedPaymentMethod !== PAYPAL && (
            <Button
              variant="contained"
              color="secondary"
              className="py-2 px-4"
              onClick={handleCheckout}
              disabled={btnDisabeld}
              startIcon={btnLoading ? <CircularProgress size={20} /> : undefined}
            >
              Confirm & Pay
            </Button>
          )}

          {selectedPaymentMethod === PAYPAL && (
            <PayPalButtons
              createOrder={(data, actions) => handleCreatePaypalOrder(data, actions)}
              onApprove={(data, actions) => handleOnApprove(data, actions)}
              fundingSource="paypal"
            />
          )}

          <div ref={paypalCardButton} />
        </Box>

        <Box className="text-center">
          <Typography variant="body2">SSL SECURED PAYMENT</Typography>

          <Typography variant="body2" className="text-muted">
            Your information is protected by 256-bit SSL encryption
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

OrderSummaryGridItem.propTypes = {
  orderDetails: propTypes.object,
  selectedPaymentMethod: propTypes.string,
  handleCheckout: propTypes.func,
  setLoading: propTypes.func.isRequired,
  btnLoading: propTypes.bool,
  btnDisabeld: propTypes.bool,
  setPaymentDone: propTypes.func.isRequired,
  changeTermsData: propTypes.object,
};

OrderSummaryGridItem.defaultProps = {
  orderDetails: {},
  selectedPaymentMethod: '',
  handleCheckout: () => {},
  btnLoading: false,
  btnDisabeld: true,
  changeTermsData: null,
};

export default OrderSummaryGridItem;
