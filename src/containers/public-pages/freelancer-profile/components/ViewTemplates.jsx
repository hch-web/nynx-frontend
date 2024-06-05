import React, { useState } from 'react';
import { Container, Box, Typography, useTheme, Stack, IconButton } from '@mui/material';
import { ArrowBackIos, Delete, Edit } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  viewTemplateImgItemStyles,
  viewTemplateImgWrapperStyles,
} from 'styles/mui/public-pages/freelancer-profile/user-templates-styles';
import styles from 'styles/public-pages/freelancer-profile/templates-view.module.scss';
import { useDeleteTemplateMutation, useGetUserTemplatesQuery } from 'services/private/profile';
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import TemplateViewModal from './TemplateViewModal';

function ViewTemplates() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();

  // STATE HOOKS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const userId = useSelector(state => state?.auth?.userInfo?.id);

  // API HOOKS
  const { data: templatesData } = useGetUserTemplatesQuery(id, { skip: !id });
  const [deleteTemplate, { error, isSuccess }] = useDeleteTemplateMutation();

  // CUSTOM HOOKS
  useHandleApiResponse(error, isSuccess, 'Template Deleted Successfully!');

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const yellow = colors.yellow.main;

  // GO TO PREVIOUS PAGE HANDLER
  const goBack = () => navigate(-1);

  const handleClick = tempId => {
    setIsModalOpen(!isModalOpen);
    setSelectedTemplateId(tempId);
  };

  // HANDER FUNCTIONS
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async tempId => {
    await deleteTemplate(tempId);
  };

  // CONSTANTS
  const canUserEdit = userId === +id;

  return (
    <Container variant="public">
      <Box className="d-flex align-items-center my-4 mt-5">
        <Box className="d-flex align-items-center" sx={{ cursor: 'pointer' }} onClick={goBack}>
          <ArrowBackIos color={darkPurple} sx={{ fontSize: '17px' }} />
          <Typography variant="body1" color={darkPurple}>
            Back to Profile
          </Typography>
        </Box>

        <Box className="flex-grow-1 d-flex justify-content-center align-items-center">
          <Typography variant="h3" color={darkPurple}>
            Templates
          </Typography>
        </Box>
      </Box>

      <Box className="template-box-body">
        <Box className="d-flex align-items-center justify-content-start flex-wrap" sx={{ gap: '1.5vw' }}>
          {Array.isArray(templatesData) ? (
            templatesData?.map(template => template?.images?.slice(0, 1).map(imageItem => (
              <Box sx={viewTemplateImgWrapperStyles} className={styles.imgItemWrapper} key={imageItem.id}>
                <Box
                  sx={{
                    background: `url(${imageItem.image}) center top no-repeat`,
                    ...viewTemplateImgItemStyles,
                  }}
                  onClick={() => handleClick(template?.id)}
                  className={styles.imgItemBox}
                />

                {canUserEdit && (
                <Stack
                  direction="column"
                  spacing={1}
                  bgcolor={yellow}
                  sx={{ position: 'absolute', top: '5px', right: '5px', borderRadius: '10px' }}
                >
                  <Link to={`/template/${id}/edit/${template?.id}`}>
                    <IconButton className="p-1">
                      <Edit sx={{ fontSize: '18px', color: darkPurple }} />
                    </IconButton>
                  </Link>

                  <IconButton className="p-1" onClick={() => handleDelete(template?.id)}>
                    <Delete sx={{ fontSize: '18px', color: darkPurple }} />
                  </IconButton>
                </Stack>
                )}
              </Box>
            )))
          ) : (
            <Box
              className="flex-grow-1 text-center d-flex align-items-center justify-content-center"
              sx={{ minHeight: '40vh' }}
            >
              <Typography variant="body1">No Record Found</Typography>
            </Box>
          )}
        </Box>

        <TemplateViewModal
          setSelected={setSelectedTemplateId}
          userId={id}
          templateId={selectedTemplateId}
          isOpen={isModalOpen}
          handleOpenModal={handleOpenModal}
        />
      </Box>
    </Container>
  );
}

export default ViewTemplates;
