import React from 'react';
import { Typography, Container } from '@mui/material';
import WorkspaceDetails from './components/WorkspaceDetails';

function index() {
  return (
    <Container variant="portal">
      <Typography variant="h3" className="mb-3 mb-sm-0">
        Workspace
      </Typography>
      <WorkspaceDetails />
    </Container>
  );
}

export default index;
