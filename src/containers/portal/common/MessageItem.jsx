import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Avatar, Box, Tooltip, Typography, useTheme } from '@mui/material';
import { saveAs } from 'file-saver';

// COMPONENTS & STYLES
import styles from 'styles/portal/client/create-workspace.module.scss';
import { formatName, setIconByFileType } from 'utilities/helpers';
import { ChatMessageBoxStyles } from 'styles/mui/portal/chat-box-styles';
import ChatOffer from './ChatOffer';
import { checkIsMessageSentByMe } from './utilities/helpers';
import AcceptOfferModal from './AcceptOfferModal';

function MessageItem({ msgItem, handleGetMessages, isPending }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const [offerDetail, setOfferDetail] = useState(null);
  const [isAcceptOfferModalOpen, setIsAcceptOfferModalOpen] = useState(false);
  const { userInfo } = useSelector(state => state.auth);

  const loggedUserId = userInfo?.id;
  const isBuyer = userInfo?.is_buyer;

  // HANDLERS
  const handleToggleAcceptOfferModal = () => {
    if (isBuyer) {
      setIsAcceptOfferModalOpen(!isAcceptOfferModalOpen);
    }
  };

  return (
    <>
      <AcceptOfferModal
        isAcceptOfferModalOpen={isAcceptOfferModalOpen}
        handleToggleAcceptOfferModal={handleToggleAcceptOfferModal}
        offerDetail={offerDetail}
      />

      <Box
        id={`message-${msgItem?.id}`}
        className={`d-flex ${
          checkIsMessageSentByMe(loggedUserId, msgItem?.owner) || isPending
            ? 'flex-row-reverse ms-auto'
            : 'flex-row me-auto'
        } gap-2 my-2 mw-75`}
        sx={{ opacity: isPending ? 0.5 : 1 }}
      >
        <Tooltip
          title={
            msgItem?.first_name ? formatName(msgItem?.first_name, msgItem?.last_name, msgItem?.username) : ''
          }
        >
          <Avatar src={msgItem?.image || ''} alt={msgItem?.first_name} />
        </Tooltip>

        {msgItem.offer ? (
          <ChatOffer
            offerDetail={msgItem}
            loggedUserId={loggedUserId}
            handleToggleAcceptOfferModal={handleToggleAcceptOfferModal}
            setOfferDetail={setOfferDetail}
            handleGetChatMessages={handleGetMessages}
          />
        ) : (
          <Box
            className="py-2 px-3"
            sx={{
              background: checkIsMessageSentByMe(loggedUserId, msgItem?.owner) ? '#f6f4f5' : '#ffe3c5',
              ...ChatMessageBoxStyles,
            }}
          >
            {msgItem?.attachment ? (
              <Box
                key={msgItem?.attachment?.id}
                className={`${styles.uploadedFile} pointer`}
                onClick={() => saveAs(msgItem?.attachment?.file)}
              >
                <Box className="d-flex flex-column justify-content-between">
                  <Box className="d-flex">
                    <img src={setIconByFileType(msgItem?.attachment?.file_name)} alt="file" />

                    <Box className="d-flex flex-column">
                      <Typography variant="dashboardBody" className="weight-500 ms-2" color={darkPurple}>
                        {msgItem?.attachment?.file_name?.split('/')[1]?.slice(0, 15)}...`
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="dashboardBody" className="weight-500 mt-2 d-block" color={darkPurple}>
                    {msgItem?.message}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                {msgItem?.message}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

MessageItem.propTypes = {
  handleGetMessages: propTypes.func.isRequired,
  msgItem: propTypes.object,
  isPending: propTypes.bool,
};

MessageItem.defaultProps = {
  isPending: false,
  msgItem: {},
};

export default MessageItem;
