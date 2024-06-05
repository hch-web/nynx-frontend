import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Container, Backdrop, CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// API HOOKS
import { useListCardsQuery } from 'services/private/payments/cards';
import { useGetChangeTermsByIdQuery, useGetOrderDetailsQuery } from 'services/private/payments/checkout';
import { useGetGigRequirementsQuery } from 'services/private/task-details';
import { useSendRequirementsMutation } from 'services/private/requirements';
import { useUpdateProposalMutation } from 'services/private/workspace/freelancers';

// UTILITIES & COMPONENTS
// import CardDetailsModal from 'containers/portal/common/sections/CardDetailsModal';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { CHANGE_TERMS, JOB_OFFER, PAYPAL, TIP } from 'utilities/constants';
import PaymentMethodGridItem from './components/PaymentMethodGridItem';
import OrderSummaryGridItem from './components/OrderSummaryGridItem';

function GigCheckout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { checkoutState } = state;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(PAYPAL);
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [isPaymentDone, setPaymentDone] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // API HOOKS
  const { data: cardsList, isLoading: cardsListLoading } = useListCardsQuery();
  const { data: orderDetails, isLoading: gigDetailsLoading } = useGetOrderDetailsQuery(
    { id: checkoutState?.taskId, taskVia: checkoutState?.taskVia },
    { skip: !(checkoutState?.taskVia && checkoutState?.taskId) }
  );

  const { data: changeTermsData } = useGetChangeTermsByIdQuery(checkoutState?.changeTermsId, {
    skip: !checkoutState?.changeTermsId,
  });
  const { data: gigRequirements } = useGetGigRequirementsQuery(orderDetails?.gig, {
    skip: !orderDetails?.gig,
  });
  const [sendRequirements] = useSendRequirementsMutation();
  const [updateProposal] = useUpdateProposalMutation();

  const sendGigRequirements = async () => {
    await sendRequirements({
      gigRequirements,
      taskVia: checkoutState?.taskVia,
      taskId: checkoutState?.taskId,
    });
  };

  const updateJobOfferStatus = async () => {
    await updateProposal(checkoutState?.payload);
  };

  useEffect(() => {
    if (isPaymentDone) {
      if (checkoutState.from) {
        navigate(checkoutState.from, { replace: true });
      } else {
        navigate('/portal/client/dashboard', { replace: true });
      }

      if (!checkoutState?.type || checkoutState?.type !== (CHANGE_TERMS || TIP)) {
        sendGigRequirements();
      }

      if (checkoutState?.type === JOB_OFFER) {
        updateJobOfferStatus();
      }
    }
  }, [isPaymentDone]);

  // HANDLERS
  const toggleCardModal = () => {
    setCardModalOpen(!isCardModalOpen);
  };

  const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  return (
    <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID }}>
      <Container variant="public">
        {!(gigDetailsLoading || cardsListLoading) ? (
          <Box>
            <Typography variant="h3" className="mb-3">
              Checkout
            </Typography>

            <Grid container className="bg-white" sx={{ borderRadius: '10px' }}>
              <PaymentMethodGridItem
                cardsList={cardsList}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
                selectedPaymentMethod={selectedPaymentMethod}
                toggleCardModal={toggleCardModal}
              />

              <OrderSummaryGridItem
                orderDetails={orderDetails}
                changeTermsData={changeTermsData}
                btnDisabeld={!selectedPaymentMethod || isPaymentDone}
                setPaymentDone={setPaymentDone}
                selectedPaymentMethod={selectedPaymentMethod}
                setLoading={setLoading}
                isLoading={isLoading}
              />
            </Grid>

            <Backdrop sx={{ zIndex: 9999 }} open={isLoading}>
              <CircularProgress size={70} color="yellow" />
            </Backdrop>
          </Box>
        ) : (
          <Box
            className="d-flex align-items-center justify-content-center bg-white rounded-3"
            sx={{ height: '40vh' }}
          >
            <SectionLoader />
          </Box>
        )}

        {/* <CardDetailsModal isOpen={isCardModalOpen} handleClose={toggleCardModal} /> */}
      </Container>
    </PayPalScriptProvider>
  );
}

export default GigCheckout;
