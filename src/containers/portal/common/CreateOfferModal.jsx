import React from 'react';
import { Modal, Box, Divider } from '@mui/material';
import propTypes from 'prop-types';

// STYLES
import { createOfferModalStyles } from 'styles/mui/portal/chat-box-styles';

// COMPONENTS
import CreateOfferForm from './CreateOfferForm';

function CreateOfferModal({ isOfferModalOpen, handleToggleOfferModal, handleSentOffer, selectedUser }) {
  return (
    <Modal open={isOfferModalOpen} onClose={handleToggleOfferModal}>
      <Box className="bg-white" sx={createOfferModalStyles}>
        <Divider light />
        <CreateOfferForm
          handleToggleOfferModal={handleToggleOfferModal}
          handleSentOffer={handleSentOffer}
          selectedUser={selectedUser}
        />
      </Box>
    </Modal>
  );
}

CreateOfferModal.propTypes = {
  isOfferModalOpen: propTypes.bool.isRequired,
  handleToggleOfferModal: propTypes.func,
  handleSentOffer: propTypes.func,
  selectedUser: propTypes.object,
};

CreateOfferModal.defaultProps = {
  selectedUser: {},
  handleToggleOfferModal: () => {},
  handleSentOffer: () => {},
};

export default CreateOfferModal;
