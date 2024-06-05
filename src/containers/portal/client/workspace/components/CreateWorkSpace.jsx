import React from 'react';
import { Box, Container, Divider, Grid, Typography, useTheme } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// STYLES
import styles from 'styles/portal/client/create-workspace.module.scss';

// COMPONENTS
import WorkSpaceForm from './WorkSpaceForm';

function CreateWorkSpace() {
  const navigate = useNavigate();
  const theme = useTheme();

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const backToDashboard = () => {
    navigate(-1);
  };

  return (
    <Container variant="portal" className={`py-0 pt-3 ${styles.createWorkspace}`}>
      <Box className="py-4 d-flex align-items-center">
        <Box className="d-flex align-items-center" onClick={backToDashboard} sx={{ cursor: 'pointer' }}>
          <ArrowBackIos sx={{ fontSize: '16px' }} />
          <Typography variant="body1" color={darkPurple}>
            Back to Dashboard
          </Typography>
        </Box>

        <Box className="text-center flex-grow-1">
          <Typography variant="h3">Create Workspace </Typography>
        </Box>
      </Box>

      <Box className={`${styles.jobPosting} mt-3 mb-5`}>
        <Grid container spacing={2} className="mt-0 py-3 px-4">
          <Grid item xs={12} className="pt-0 ">
            <Box>
              <Typography variant="dashboardh2" color={darkPurple} className="weight-500">
                Workspace
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} className="mt-0 ">
          <Grid item xs={12} className="pt-0 ">
            <Box>
              <Divider className="divider" />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} className="mt-0">
          <Grid item xs={12} className="pt-0">
            <WorkSpaceForm />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CreateWorkSpace;
