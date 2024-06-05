import React, { useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

// SERVICES
import { useAcceptChatOfferMutation } from 'services/private/chat/offer';

// STYLES
import {
  chatDisableButtonStyles,
  ChatMessageBoxStyles,
  chatOfferBorderStyles,
  chatOfferContainerStyles,
} from 'styles/mui/portal/chat-box-styles';

// UTILITIES
import { formatFileSize, setIconByFileType } from 'utilities/helpers';
import {
  COMPLETED,
  FIXED,
  IN_PROGRESS,
  IN_REVISION,
  MONTHLY,
  PROJECT_BASED,
  WITHDRAW,
  REJECTED,
  CANCELED,
} from 'utilities/constants';
import { checkIsMessageSentByMe } from './utilities/helpers';

function ChatOffer({ offerDetail, handleToggleAcceptOfferModal, setOfferDetail, handleGetChatMessages }) {
  const { userInfo } = useSelector(state => state.auth);

  const [withdrawOffer, { isSuccess: withdrawOfferSuccess, isLoading: withdrawOfferLoading }] = useAcceptChatOfferMutation();

  useEffect(() => {
    if (withdrawOfferSuccess) {
      handleGetChatMessages();
    }
  }, [withdrawOfferSuccess]);

  const handleAcceptOffer = offer => {
    setOfferDetail(offer);
    handleToggleAcceptOfferModal();
  };

  const handleWithdrawOffer = offerData => {
    withdrawOffer({ status: 'withdraw', offerId: offerData?.offer?.id });
  };

  const isOfferAccepted = status => {
    switch (status) {
      case IN_PROGRESS:
        return true;
      case COMPLETED:
        return true;
      case IN_REVISION:
        return true;
      case REJECTED:
        return true;
      case CANCELED:
        return true;
      default:
        return false;
    }
  };

  const isOfferWithdrew = status => {
    switch (status) {
      case WITHDRAW:
        return true;
      case REJECTED:
        return true;
      case CANCELED:
        return true;
      default:
        return false;
    }
  };

  // Constants
  const budgetType = offerDetail?.offer?.budget_type === PROJECT_BASED ? FIXED : MONTHLY;
  const loggedUserId = userInfo?.id;
  const isBuyer = userInfo?.is_buyer;
  const isAcceptedStatus = isOfferAccepted(offerDetail?.offer?.status);
  const isOfferWithdraw = isOfferWithdrew(offerDetail?.offer?.status);

  const handleDisplayBudgetofJob = status => {
    if (status === REJECTED) return 'Payment has been refunded';
    if (status === CANCELED) return 'Task has been canceled';
    return `${budgetType}: ${offerDetail?.offer?.rates}`;
  };

  return (
    <Box
      className={`d-flex flex-column w-100 ${
        checkIsMessageSentByMe(loggedUserId, offerDetail?.owner) ? 'align-items-end' : 'align-items-start'
      }`}
      sx={chatOfferContainerStyles}
    >
      <Box>
        <Typography variant="body1">sent an offer</Typography>
      </Box>
      <Box
        className="py-2 px-3 w-100"
        sx={{
          background: checkIsMessageSentByMe(loggedUserId, offerDetail?.owner) ? '#f6f4f5' : '#D9E8FA',
          ...ChatMessageBoxStyles,
        }}
      >
        <Typography variant="body1">{offerDetail?.offer?.description}</Typography>

        <Box className="d-flex flex-wrap gap-2 mt-2 pointer">
          {offerDetail?.offer?.job_offer_attachments?.map(deliverable => {
            const fileName = `${deliverable.file_name?.split('/')[1]?.slice(0, 15)}...`;

            return (
              <Box className="d-flex flex-wrap gap-2" key={deliverable?.id}>
                <Box>
                  <img
                    src={setIconByFileType(deliverable?.file_name)}
                    alt="file"
                    className="file-icon-color"
                  />
                </Box>
                <Box>
                  <Typography variant="dashboardBody" className=" weight-500 d-block">
                    {fileName}
                  </Typography>
                  <Typography variant="dashboardBody" sx={{ opacity: '0.5' }}>
                    {formatFileSize(deliverable?.file_size)}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box sx={chatOfferBorderStyles}>
          <Typography variant="dashboardh6" className="weight-500">
            {offerDetail?.offer?.gig_title}
          </Typography>
          <Box className="mt-2">
            <Typography variant="dashboardh6" className="weight-400 d-block">
              {handleDisplayBudgetofJob(offerDetail?.offer?.status)}
            </Typography>
          </Box>
        </Box>
        {isBuyer && (
          <Box>
            {!isOfferWithdraw && (
              <Button
                className="px-3 py-2 mt-3"
                variant="containedPurple"
                color="primary"
                sx={isAcceptedStatus ? chatDisableButtonStyles : undefined}
                disabled={isAcceptedStatus}
                onClick={() => handleAcceptOffer(offerDetail)}
              >
                {isAcceptedStatus ? 'Accepted' : 'Accept Offer'}
              </Button>
            )}
            {!isAcceptedStatus && (
              <Button
                className="px-3 py-2 mt-3 ms-2"
                variant="containedPurple"
                color="primary"
                startIcon={withdrawOfferLoading && <CircularProgress className="text-light" size={20} />}
                sx={isOfferWithdraw ? chatDisableButtonStyles : undefined}
                disabled={isOfferWithdraw}
                onClick={() => handleWithdrawOffer(offerDetail)}
              >
                {isOfferWithdraw ? 'Withdrawn' : 'Withdraw offer'}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

ChatOffer.propTypes = {
  offerDetail: propTypes.object,
  handleToggleAcceptOfferModal: propTypes.func.isRequired,
  setOfferDetail: propTypes.func,
  handleGetChatMessages: propTypes.func,
};

ChatOffer.defaultProps = {
  handleGetChatMessages: () => {},
  offerDetail: {},
  setOfferDetail: () => {},
};

export default ChatOffer;
