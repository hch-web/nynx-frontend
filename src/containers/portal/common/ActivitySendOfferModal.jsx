import React from 'react';
import { Box, Button, Divider, Modal, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';

// styles
import { modalContainerStyles } from 'styles/mui/components/activity-tab-offer-modal-styles';

function ActivityTabSendOfferModal({ isOpen, handleToggle }) {
  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box className="bg-white" sx={modalContainerStyles}>
        {/* MODAL HEADER */}
        <Box className="d-flex align-items-center justify-content-between px-3 py-2">
          <Typography variant="h6">Offer From Lissan H</Typography>

          <Stack direction="row" spacing={1}>
            <Button onClick={handleToggle} className="py-2 px-4">
              Cancel
            </Button>

            <Button className="py-2 px-4" variant="contained" color="secondary">
              Accept
            </Button>
          </Stack>
        </Box>

        <Divider light />

        <Box className="px-3 py-2">MODAL</Box>
      </Box>
    </Modal>
  );
}

ActivityTabSendOfferModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleToggle: propTypes.func.isRequired,
};

export default ActivityTabSendOfferModal;
