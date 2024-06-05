import React, { useEffect } from 'react';
import { Box, Divider, Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

// API HOOKS
import { useListFreelancerWSDeliverablesQuery } from 'services/private/workspace/deliverables';
import useApiServices from 'custom-hooks/useApiServices';

// component
import Deliverable from '../Deliverable';

function DeliverableTabPanel() {
  const { workspaceId } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  const { data: deliverables, refetch: deliverablesRefetch } = useListFreelancerWSDeliverablesQuery(
    workspaceId,
    { skip: !workspaceId }
  );

  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace', 'GetFreelancerWorkspace']);
    deliverablesRefetch();
  }, []);

  return (
    <Box className="bg-white common-border">
      {/* HEADER */}
      <Box className="py-3 px-4">
        <Typography variant="h6" className="fw-500">
          Deliverable
        </Typography>
      </Box>

      <Divider light />

      {/* BODY */}
      <Box className="px-4 py-3">
        <Grid container spacing={4}>
          {deliverables?.length ? (
            deliverables?.map(item => item?.deliverables[0]?.attachments?.map(attachment => (
              <Deliverable key={attachment?.id} attachment={attachment} />
            )))
          ) : (
            <Typography variant="body1" className="mb-2 mt-4 px-4 fw-500">
              No Record Found!
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default DeliverableTabPanel;
