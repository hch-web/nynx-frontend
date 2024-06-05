import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router';

// STYLES
import {
  refundBudgetAmountBox,
  refundBudgetHeadBox,
  taskDetailsChangeTermsNewBoxStyles,
  taskDetailsChangeTermsPrevBoxStyles,
  taskDetailsNotifiNewBox,
  tastDetailsBudgetNotifiBox,
  changeTermRejectButtonStyles,
} from 'styles/mui/portal/workspace-styles';

// API HOOKS
import {
  useListChangeTermsQuery,
  useTaskDetailsQuery,
  useUpdateChangeTermsRequestMutation,
} from 'services/private/task-details';
import {
  useAcceptStripeRefundMutation,
  useGetRequestedRefundListQuery,
  useUpdateRequestedRefundStatusMutation,
} from 'services/private/payments/refund-task';

// CUSTOM HOOKS
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// COMPONENTS & UTILITIES
import {
  ACCEPTED,
  CHANGE_TERMS,
  CLIENT_ORDER,
  DIRECT_HIRE,
  JOB_OFFER,
  MONTHLY_BASED,
  PAYPAL,
  REJECTED,
} from 'utilities/constants';
import RefundPaymentModal from './RefundPaymentModal';
import { formatDate } from '../utilities/helper-functions';

function ChangeTermRefundTaskDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;
  const [acceptRefundPaymentDetails, setAcceptRefundPaymentDetails] = useState({
    id: null,
    isAcceptRefundModalOpen: false,
    amount: null,
  });

  const { taskId, taskVia } = useParams();
  const orderVia = taskVia === DIRECT_HIRE ? CLIENT_ORDER : JOB_OFFER;
  // API HOOKS
  const { data: changeTermsData } = useListChangeTermsQuery(
    { taskId, taskVia },
    { skip: !(taskId && taskVia) }
  );
  const { data: taskDetails } = useTaskDetailsQuery({ id: taskId, taskVia }, { skip: !(taskId && taskVia) });
  const [acceptRefund, { isLoading: acceptRefundLoading }] = useAcceptStripeRefundMutation();
  const [updateTermsStatus, { error }] = useUpdateChangeTermsRequestMutation();
  const [updateRefundStatus, { isLoading: updateRefundLoading }] = useUpdateRequestedRefundStatusMutation();
  const { data: refundDetails, refetch } = useGetRequestedRefundListQuery(
    { id: taskId, taskVia },
    { skip: !(taskId && taskVia), refetchOnMountOrArgChange: true }
  );

  // CUSTOM HOOKS
  useHandleApiResponse(error);

  useEffect(() => {
    refetch();
  }, []);

  const handleToggleAcceptRefundModal = (refundId, amount = null) => {
    setAcceptRefundPaymentDetails({
      ...acceptRefundPaymentDetails,
      isAcceptRefundModalOpen: !acceptRefundPaymentDetails.isAcceptRefundModalOpen,
      amount,
      id: refundId,
    });
  };

  const handleStripeRefund = async (amount, refundId) => {
    const body = { job_offer_id: +taskId, task_via: orderVia, amount: +amount, refund_id: refundId };
    await acceptRefund(body);
  };

  const handleTermsRequest = async (status, id) => {
    if (status === ACCEPTED) {
      navigate('/payment/checkout', {
        state: {
          checkoutState: {
            from: pathname,
            taskId,
            taskVia: orderVia,
            type: CHANGE_TERMS,
            changeTermsId: id,
          },
        },
      });
    } else if (status === REJECTED) {
      const body = { status, id };
      await updateTermsStatus(body);
    }
  };

  const handleRefundRequest = async (status, id, amount) => {
    if (status === ACCEPTED) {
      if (taskDetails?.payment_via === PAYPAL) {
        handleToggleAcceptRefundModal(id, amount);
      } else {
        handleStripeRefund(amount, id);
      }
    } else if (status === REJECTED) {
      const body = { id, status };
      await updateRefundStatus(body);
    }
  };

  const { is_buyer: isBuyer } = useSelector(state => state.auth.userInfo);

  return (
    isBuyer && (
      <Box className="d-flex flex-column align-items-start gap-3">
        {changeTermsData?.map(item => {
          const isMonthlyBudget = item?.budget_type === MONTHLY_BASED;
          const cardHeading = isMonthlyBudget ? 'Budget Per Month:' : 'Budget:';
          const cardSubHeading = isMonthlyBudget ? 'End Date:' : 'Delivery:';

          return (
            <Box
              key={item.id}
              className="bg-white px-4 py-2 mt-3 w-100"
              sx={{ borderRadius: '5px', border: `1px solid ${lightOrange}` }}
            >
              <Stack className="flex-wrap flex-lg-nowrap" direction="row" justifyContent="space-between">
                <Box
                  className="col-12 col-lg-auto d-flex flex-column align-items-center align-items-lg-start justify-content-center pe-0 pe-lg-5 mb-3 mb-lg-0"
                  sx={tastDetailsBudgetNotifiBox}
                >
                  <Typography variant="body1" className="fw-500">
                    Change Terms
                  </Typography>

                  <Typography variant="body2">{formatDate(item.special_offer_date)}</Typography>
                </Box>

                {/* PREVIOUS BOX WRAPPER */}
                <Box className="col d-flex flex-column flex-xxl-row align-items-center justify-content-center border-end ms-0">
                  <Box className="p-2 me-2" sx={taskDetailsChangeTermsPrevBoxStyles}>
                    <Typography variant="body2" className="text-white text-center">
                      Previous
                    </Typography>
                  </Box>

                  <Box>
                    <Box className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                      <Typography variant="body1" className="text-muted text-center me-1 fw-500">
                        {cardHeading}
                      </Typography>

                      <Typography variant="body1">{`$${item.old_budget}`}</Typography>
                    </Box>

                    <Box className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                      <Typography variant="body2" className="text-muted me-1">
                        {cardSubHeading}
                      </Typography>

                      <Typography variant="body2">{formatDate(item.old_delivery_date)}</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* NEW BOX WRAPPER */}
                <Box
                  className="col d-flex flex-column flex-xxl-row align-items-center justify-content-center ms-0"
                  sx={taskDetailsNotifiNewBox}
                >
                  <Box className="p-2 me-2" sx={taskDetailsChangeTermsNewBoxStyles}>
                    <Typography variant="body2" className="text-white text-center">
                      New
                    </Typography>
                  </Box>

                  <Box>
                    <Box className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                      <Typography variant="body1" className="text-muted text-center me-1 fw-500">
                        {cardHeading}
                      </Typography>
                      <Typography variant="body1">{`$${item.new_budget}`}</Typography>
                    </Box>

                    <Box className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                      <Typography variant="body2" className="text-muted me-1">
                        {cardSubHeading}
                      </Typography>

                      <Typography variant="body2">{formatDate(item.new_delivery_date)}</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* ACTION BUTTOS BOX WRAPPER */}
                <Stack className="col-12 col-md-auto flex-row flex-md-column flex-xxl-row align-items-center justify-content-center justify-content-md-end gap-2 mt-3 mt-md-0 ms-0 ms-sm-3">
                  <Button
                    onClick={() => handleTermsRequest(REJECTED, item?.id)}
                    variant="danger"
                    sx={changeTermRejectButtonStyles}
                    className="px-4 py-2"
                  >
                    Reject
                  </Button>

                  <Button
                    onClick={() => handleTermsRequest(ACCEPTED, item?.id)}
                    variant="contained"
                    color="secondary"
                    className="px-3 py-2"
                  >
                    Accept
                  </Button>
                </Stack>
              </Stack>
            </Box>
          );
        })}

        {refundDetails?.map(item => (
          <Box
            key={item?.id}
            className="bg-white px-4 py-2 mt-3 w-100"
            sx={{ borderRadius: '5px', border: `1px solid ${lightOrange}` }}
          >
            <Stack className="flex-wrap flex-lg-nowrap" direction="row" justifyContent="space-between">
              <Box
                className="col-12 col-sm-auto d-flex flex-column align-items-center align-items-lg-start justify-content-center pe-3 pe-lg-3 mb-0"
                sx={refundBudgetHeadBox}
              >
                <Typography variant="body1" className="fw-500">
                  Requested Refund
                </Typography>

                <Typography variant="body2">{formatDate(item?.created_at)}</Typography>
              </Box>

              {/* NEW BOX WRAPPER */}
              <Box
                className="col d-flex flex-row align-items-center justify-content-center ms-0 px-2 mt-3 mt-sm-0"
                sx={refundBudgetAmountBox}
              >
                <Typography variant="body1" className="text-center me-1 fw-500">
                  Amount:
                </Typography>

                <Typography variant="body1">{`$${item?.amount}`}</Typography>
              </Box>

              {/* ACTION BUTTOS BOX WRAPPER */}
              <Stack className="col-12 col-md-auto flex-row align-items-center justify-content-center justify-content-md-end gap-2 mt-3 mt-md-0 ms-0 ms-md-3">
                <Button
                  onClick={() => handleRefundRequest(REJECTED, item?.id)}
                  variant="danger"
                  className="px-4 py-2"
                  disabled={updateRefundLoading}
                  sx={changeTermRejectButtonStyles}
                >
                  Reject
                </Button>

                <Button
                  onClick={() => handleRefundRequest(ACCEPTED, item?.id, item?.amount, refundDetails)}
                  variant="contained"
                  color="secondary"
                  className="px-3 py-2"
                  disabled={acceptRefundLoading}
                >
                  Accept
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
        <RefundPaymentModal
          isOpen={acceptRefundPaymentDetails?.isAcceptRefundModalOpen}
          handleClose={handleToggleAcceptRefundModal}
          amount={acceptRefundPaymentDetails?.amount}
          refundId={acceptRefundPaymentDetails?.id}
        />
      </Box>
    )
  );
}

export default ChangeTermRefundTaskDetails;
