import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

// services
import { useFreelancerTasksListQuery } from 'services/private/workspace/tasks';

// CUSTOM HOOK
import useApiServices from 'custom-hooks/useApiServices';

// styles
import {
  tasksListMainTableWrapperStyles,
  tasksMainTableBodyStyles,
} from 'styles/mui/portal/task-detail-styles';
import { sectionLoaderStyles } from 'styles/mui/components/section-loader-styles';

// UTILITIES & COMPONENTS
import SectionLoader from 'containers/common/loaders/SectionLoader';
import TaskDetailsRow from 'containers/portal/common/TaskDetailsRow';

function TasksTabPanel() {
  const { workspaceId } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  const {
    data: taskList,
    isLoading,
    isFetching,
    refetch,
  } = useFreelancerTasksListQuery(workspaceId, { skip: !workspaceId });

  useEffect(() => {
    if (workspaceId) {
      invalidatePrivateTags(['GetWorkspace', 'GetFreelancerWorkspace']);
      refetch();
    }
  }, []);

  return (
    <Box className="mt-2">
      <Box className="bg-white p-3" sx={{ borderRadius: '10px 10px 0px 0px' }}>
        <Typography variant="h6" sx={{ fontWeight: '500' }}>
          Details
        </Typography>
      </Box>

      <Box sx={tasksListMainTableWrapperStyles}>
        <Box className="pb-5" sx={tasksMainTableBodyStyles}>
          {/* TASKS CONTAINER HEADER */}
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

          {/* TASKS CONTAINER HEADER */}
          <Box className="d-flex flex-column align-items-start py-3 bg-white p-0 w-100">
            {isLoading || isFetching ? (
              <Box className="w-100" sx={sectionLoaderStyles}>
                <SectionLoader />
              </Box>
            ) : (
              <TaskDetailsRow tasksData={taskList} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TasksTabPanel;
