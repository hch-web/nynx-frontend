import React from 'react';
import { Modal, Box, useTheme, Typography, Avatar, Divider } from '@mui/material';
import propTypes from 'prop-types';
import { useGetTemplateQuery, useGetUserQuery } from 'services/private/profile';
import {
  templateModalBoxBodyStyles,
  templateModalBoxStyles,
} from 'styles/mui/public-pages/freelancer-profile/user-templates-styles';
import { ArrowBackIos } from '@mui/icons-material';

function TemplateViewModal({ templateId, isOpen, handleOpenModal, userId }) {
  // BASE HOOKS
  const theme = useTheme();

  // API HOOKS
  const { data: templateData } = useGetTemplateQuery(templateId, { skip: !templateId });
  const { data: userData } = useGetUserQuery(userId, { skip: !userId });

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  return (
    <Modal open={isOpen} onClose={handleOpenModal}>
      <Box sx={templateModalBoxStyles}>
        {/* BOX HEADER BOX */}
        <Box className="modal-header p-3 d-flex align-item-center justify-content-between">
          <Box className="d-flex align-items-center" sx={{ cursor: 'pointer' }} onClick={handleOpenModal}>
            <ArrowBackIos color={darkPurple} sx={{ fontSize: '17px' }} />
            <Typography variant="body1" color={darkPurple}>
              Back to Profile
            </Typography>
          </Box>

          <Box className="d-flex align-items-center">
            <Avatar src={userData?.image} alt={userData?.user?.username || 'Profile-Img'} className="me-2" />

            <Box>
              <Typography variant="body2" className="text-capitalize" sx={{ fontWeight: '600' }}>
                {userData?.user?.username}
              </Typography>
              <Typography variant="body2" className="text-muted">
                Level 1
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider light />

        {/* BOX BODY BOX */}
        <Box className="modal-body" sx={templateModalBoxBodyStyles}>
          <Box>
            <Typography variant="h4" color={darkPurple}>
              {templateData?.title}
            </Typography>
            <Typography variant="body1" color={darkPurple} className="my-3">
              {templateData?.description}
            </Typography>
          </Box>
          {templateData?.images?.map(item => (
            <img src={item.image} alt="Template-Img" key={item.id} className="img-fluid w-100 mb-2" />
          ))}
        </Box>
      </Box>
    </Modal>
  );
}

TemplateViewModal.propTypes = {
  templateId: propTypes.number,
  isOpen: propTypes.bool.isRequired,
  handleOpenModal: propTypes.func.isRequired,
  userId: propTypes.string.isRequired,
};

TemplateViewModal.defaultProps = {
  templateId: null,
};

export default TemplateViewModal;
