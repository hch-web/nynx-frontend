import React from 'react';
import { Modal, Box } from '@mui/material';
import propTypes from 'prop-types';

// STYLES
import { buyerRequestOfferModalStyles } from 'styles/mui/public-pages/buyer-request/buyer-request-styles';

// COMPONENTS
import BuyerRequestForm from './BuyerRequestForm';

function BuyerRequestModal({ isOpen, handleToggle, jobId, taskId }) {
  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box className="bg-white" sx={buyerRequestOfferModalStyles}>
        <BuyerRequestForm id={jobId} handleToggle={handleToggle} taskId={taskId} />
      </Box>
    </Modal>
  );
}

BuyerRequestModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleToggle: propTypes.func.isRequired,
  jobId: propTypes.number,
  taskId: propTypes.number,
};

BuyerRequestModal.defaultProps = {
  taskId: null,
  jobId: null,
};

export default BuyerRequestModal;
