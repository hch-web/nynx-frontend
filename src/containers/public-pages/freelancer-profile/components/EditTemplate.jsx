import React from 'react';
import { Box, Container, Divider, Typography, useTheme } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EditTemplateForm from './EditTemplateForm';

function EditTemplate() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  return (
    <Container variant="public" className="pt-0">
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
      <Box sx={{ background: 'white', borderRadius: '20px' }}>
        <Box className="template-box-header px-3 py-2">
          <Typography variant="label" sx={{ fontSize: '20px', fontWeight: '600' }}>
            Edit Template
          </Typography>
        </Box>
        <Divider light />
        <Box className="template-box-body">
          <EditTemplateForm />
        </Box>
      </Box>
    </Container>
  );
}

export default EditTemplate;
