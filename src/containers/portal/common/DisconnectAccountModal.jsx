import React from 'react';
import { Box, Typography, Button, Modal, Stack, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// services
import { useDisconnectSocialMediaMutation } from 'services/private/profile';

// styles
import { modalBoxContainer } from 'styles/mui/portal/profile-setting-styles';

function DisconnectAccountModal({ isDisconectAccountModalOpen, toggleDisconnectAccountModal, selectedId }) {
  const [disconnectSocialMedia, { isLoading, error, isSuccess, data }] = useDisconnectSocialMediaMutation();

  const successMessage = data && data.message;

  useHandleApiResponse(error, isSuccess, successMessage);

  const handleDisconnect = () => {
    disconnectSocialMedia(selectedId);
    toggleDisconnectAccountModal();
  };

  return (
    <Modal open={isDisconectAccountModalOpen} onClose={toggleDisconnectAccountModal}>
      <Box className="modal-box-container" sx={modalBoxContainer}>
        <Box className="modal-box-header px-4 py-2 d-flex justify-content-between align-items-center">
          <Typography variant="h6" className="weight-500">
            Are you sure to disconnet
          </Typography>

          <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 2 }}>
            <Button color="secondary" variant="contained" className="px-2 py-1" onClick={handleDisconnect}>
              {isLoading ? <CircularProgress size={20} /> : 'Yes'}
            </Button>
            <Button
              sx={{ borderRadius: '25px' }}
              className="px-3 py-2"
              onClick={toggleDisconnectAccountModal}
            >
              Not
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

DisconnectAccountModal.propTypes = {
  isDisconectAccountModalOpen: propTypes.bool,
  toggleDisconnectAccountModal: propTypes.func,
  selectedId: propTypes.number,
};

DisconnectAccountModal.defaultProps = {
  isDisconectAccountModalOpen: false,
  selectedId: 0,
  toggleDisconnectAccountModal: () => {},
};

export default DisconnectAccountModal;
