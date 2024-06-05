import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// API HOOKS
import { useLazyGetWorkspacesQuery } from 'services/private/workspace/workspace';

// STYLES
import {
  workspaceMainTableBodyStyles,
  workspaceMainTableWrapperStyles,
  workspaceTableHeadStyles,
  worskpaceListContainerLoader,
} from 'styles/mui/portal/workspace-styles';

// COMPONENTS
import WorkSpaceMainHead from 'containers/portal/freelancer/workspace/components/WorkSpaceMainHead';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { workSpaceTableHeadData } from './utilities/data';
import WorkSpaceListItem from './components/WorkSpaceListItem';

function WorkSpaceMain() {
  const [
    getWorkspaces,
    { data: workspaces, isFetching: workspaceDataFetching, },
  ] = useLazyGetWorkspacesQuery();

  useEffect(() => {
    getWorkspaces({ status: '' });
  }, []);

  return (
    <Container variant="portal">
      <Box className="title-header d-flex flex-column flex-sm-row align-item-center justify-content-between mb-4">
        <Typography variant="h3" className="mb-3 mb-sm-0">
          Workspace
        </Typography>

        <Button
          component={Link}
          to="/portal/client/workspace/create"
          variant="contained"
          color="secondary"
          className="py-2 px-4"
        >
          Create Workspace
        </Button>
      </Box>

      <WorkSpaceMainHead handleFunc={getWorkspaces} />

      {workspaceDataFetching ? (
        <Box sx={worskpaceListContainerLoader}>
          <SectionLoader />
        </Box>
      ) : (
        <Box sx={workspaceMainTableWrapperStyles}>
          {workspaces?.length > 0 ? (
            <Box className="pb-5" sx={workspaceMainTableBodyStyles}>
              {/* WORKSPACE CONTAINER HEADER */}
              <Box
                className="p-3 d-flex align-items-center justify-content-start"
                sx={workspaceTableHeadStyles}
              >
                {workSpaceTableHeadData.map(item => (
                  <Box className={`col-${item.colSpan} pe-3`} key={item.title}>
                    <Typography variant="body2" sx={item.styles}>
                      {item.title}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* WORKSPACE CONTAINER BODY */}
              <Box className="d-flex flex-column align-items-start pb-5">
                {workspaces?.map(item => (
                  <WorkSpaceListItem item={item} key={item?.id} />
                ))}
              </Box>
            </Box>
          ) : (
            <Box className="py-3 d-flex flex-column align-items-center justify-content-center">
              <Typography variant="body1">No Record Found</Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}

export default WorkSpaceMain;
