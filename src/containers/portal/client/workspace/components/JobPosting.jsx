import React from 'react';
import { Container, Grid, Box, Typography, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';

// STYLES
import styles from 'styles/portal/client/create-workspace.module.scss';

// COMPONENTS
import JobPostingForm from './JobPostingForm';

function CreateWorkspace() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.primary.main;

  const backToDashboard = () => {
    navigate(-1);
  };

  return (
    <Container variant="portal" className={`py-0 pt-3 ${styles.createWorkspace}`}>
      <Box className="py-4 d-flex flex-column flex-sm-row align-items-start align-items-sm-center">
        <Box className="d-flex align-items-center" onClick={backToDashboard} sx={{ cursor: 'pointer' }}>
          <ArrowBackIos sx={{ fontSize: '16px' }} />
          <Typography variant="body1" color={darkPurple}>
            Back to Dashboard
          </Typography>
        </Box>

        <Box className="text-center flex-grow-1 mx-auto mx-sm-0">
          <Typography variant="h3">Create Workspace and Post a Job</Typography>
        </Box>
      </Box>

      <Box className={`${styles.jobPosting} mt-3 mb-5`}>
        <Grid container spacing={2} className="mt-0 py-3 px-4">
          <Grid item xs={12} className="pt-0 ">
            <Box>
              <Typography variant="dashboardh2" color={darkPurple} className="weight-500">
                Job Posting
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
            <JobPostingForm />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CreateWorkspace;
