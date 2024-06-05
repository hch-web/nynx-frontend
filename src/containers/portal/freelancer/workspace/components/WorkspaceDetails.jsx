import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

// api
import { useLazyGetFreelancerWorkspacesListQuery } from 'services/private/workspace/workspace';

// STYLES
import {
  freelancerWorkspaceMainTableBodyStyles,
  workspaceMainTableWrapperStyles,
  workspaceTableHeadStyles,
} from 'styles/mui/portal/workspace-styles';

// components
import WorkSpaceMainHead from 'containers/portal/freelancer/workspace/components/WorkSpaceMainHead';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import DetailList from './DetailList';

// utilities
import { WorkSpaceTableHeadData } from '../utilities/data';

function WorkspaceDetails() {
  const [getFreelancerWorkspaces, { data: workspaces, isLoading, isFetching }] = useLazyGetFreelancerWorkspacesListQuery();

  useEffect(() => {
    getFreelancerWorkspaces({ status: '' });
  }, []);

  return (
    <Box className="mt-2">
      <WorkSpaceMainHead handleFunc={getFreelancerWorkspaces} />
      <Box sx={workspaceMainTableWrapperStyles}>
        <Box className="pb-5" sx={freelancerWorkspaceMainTableBodyStyles}>
          {/* WORKSPACE CONTAINER HEADER */}
          <Box className="p-3 d-flex align-items-center justify-content-start" sx={workspaceTableHeadStyles}>
            {WorkSpaceTableHeadData.map(item => (
              <Box className={`col-${item.colSpan} pe-3`} key={item.title}>
                <Typography variant="body2" sx={item.styles}>
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>
          {isLoading || isFetching ? (
            <Box
              className="d-flex justify-content-center align-items-center bg-white"
              sx={{ height: '40vh' }}
            >
              <SectionLoader />
            </Box>
          ) : (
            <Box className="d-flex flex-column align-items-start py-4 bg-white">
              {workspaces?.length > 0 ? (
                workspaces?.map(workspace => <DetailList key={workspace?.id} workspace={workspace} isBottomDividerLine />)
              ) : (
                <Box className="w-100 d-flex justify-content-center">
                  <Typography className="text-center" variant="body1">
                    No Record Found!
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default WorkspaceDetails;
