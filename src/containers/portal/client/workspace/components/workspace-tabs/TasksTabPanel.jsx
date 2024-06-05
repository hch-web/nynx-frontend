import React, { useEffect } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

// API HOOKS
import { useListTasksQuery } from 'services/private/workspace/tasks';
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import {
  taskDetailsTableContainerStyles,
  taskDetailsTableContainerWrapperStyles,
} from 'styles/mui/portal/workspace-styles';

// UTILITIES
import { findServiceRoute } from 'utilities/routing-links';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import TaskDetailsRow from 'containers/portal/common/TaskDetailsRow';

function TasksTabPanel() {
  // REFERENCING HOOKS
  const theme = useTheme();
  const { workspaceId } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  // API HOOKS
  const {
    data: tasksData,
    isLoading,
    refetch,
    isFetching,
  } = useListTasksQuery(workspaceId, { skip: !workspaceId });

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace']);
    refetch();
  }, []);

  return (
    <Box className="bg-white" sx={{ borderRadius: '10px' }}>
      {/* HEADER */}
      <Box className="d-flex align-items-center justify-content-between px-4 py-3">
        <Typography variant="h6" color={darkPurple}>
          Details
        </Typography>

        <Button
          component={Link}
          to={findServiceRoute}
          variant="contained"
          color="secondary"
          className="px-4 py-2"
        >
          Find Talent
        </Button>
      </Box>

      {/* TAB-PANEL BODY */}
      <Box sx={taskDetailsTableContainerWrapperStyles}>
        <Box sx={taskDetailsTableContainerStyles}>
          <Box className="row mx-0">
            {/* TABLE HEADER */}
            <Box className="row mx-0 px-4 py-2" sx={{ background: '#f6f4f5' }}>
              <Box className="col-2 ps-0">
                <Typography className="fw-500" variant="body2">
                  EXPERTS
                </Typography>
              </Box>

              <Box className="col-4">
                <Typography className="fw-500 text-muted" variant="body2">
                  TASKS
                </Typography>
              </Box>

              <Box className="col-2">
                <Typography className="fw-500 text-muted" variant="body2">
                  BUDGET
                </Typography>
              </Box>

              <Box className="col-2">
                <Typography className="fw-500 text-muted" variant="body2">
                  TIME
                </Typography>
              </Box>

              <Box className="col-2">
                <Typography className="fw-500 text-muted" variant="body2">
                  STATUS
                </Typography>
              </Box>
            </Box>

            {/* TABLE BODY CONTAINER */}
            {!(isLoading || isFetching) ? (
              <TaskDetailsRow tasksData={tasksData} />
            ) : (
              <Box className="my-5 py-5">
                <SectionLoader />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TasksTabPanel;
