import React, { useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';

// API HOOKS
import { useListWSDeliverablesQuery } from 'services/private/workspace/deliverables';
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import styles from 'styles/portal/client/workspace-general.module.scss';

// UTILITIES
import { setIconByFileType } from 'utilities/helpers';
import SectionLoader from 'containers/common/loaders/SectionLoader';

function DeliverableTabPanel() {
  const { workspaceId } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  const {
    data: deliverables,
    isLoading,
    isFetching,
    refetch,
  } = useListWSDeliverablesQuery(workspaceId, { skip: !workspaceId });

  useEffect(() => {
    invalidatePrivateTags(['GetWorkspace']);
    refetch();
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
        <Box className={styles.listItems}>
          {!(isLoading || isFetching) ? (
            <ol>
              {deliverables?.map((item, idx, { length }) => (
                <li key={item.id}>
                  <Typography className="fw-600 mb-2" variant="body2">
                    {item.gig_title}
                  </Typography>

                  <Box className="d-flex align-items-center flex-wrap my-2 gap-4">
                    {item?.deliverables[0] ? (
                      item?.deliverables[0]?.attachments?.map(file => (
                        <Box
                          key={file?.id}
                          onClick={() => saveAs(file?.file)}
                          className="d-flex align-items-start pointer"
                        >
                          <img src={setIconByFileType(file?.file_type)} alt={file?.file_name} />

                          <Box className="ms-2">
                            <Typography variant="body2" className="fw-500">
                              {file?.file_name}
                            </Typography>

                            <Typography variant="body2" className="text-muted">
                              {file?.file_size}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Box>No Deliverables Added!</Box>
                    )}
                  </Box>

                  {idx + 1 !== length && <Divider className="my-3" light />}
                </li>
              ))}
            </ol>
          ) : (
            <Box className="my-5 py-5">
              <SectionLoader />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default DeliverableTabPanel;
