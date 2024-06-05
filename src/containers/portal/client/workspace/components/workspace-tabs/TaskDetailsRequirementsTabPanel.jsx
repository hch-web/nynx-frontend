import React, { useEffect, useState } from 'react';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import propTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router';
import { Add, Edit } from '@mui/icons-material';

// API HOOKS
import { useClientRequirementsListQuery } from 'services/private/requirements';

// CUSTOM HOOKS
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import styles from 'styles/portal/client/workspace-general.module.scss';

// UTILITIES & COMPONENTS
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { formatFileSize, setIconByFileType } from 'utilities/helpers';
import { CLIENT_ORDER, DIRECT_HIRE, JOB_OFFER } from 'utilities/constants';
import TaskRequirementsModal from './TaskRequirementsModal';

function TaskDetailsRequirementsTabPanel({ gigId }) {
  const theme = useTheme();
  const { taskVia, taskId } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const yellow = colors.yellow.main;
  const orderVia = taskVia === DIRECT_HIRE ? CLIENT_ORDER : JOB_OFFER;

  // STATE HOOKS
  const [isRequirementModalOpen, setRequirementModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // API HOOKS
  const {
    data: clientRequirementsData,
    isLoading,
    isFetching,
    refetch,
  } = useClientRequirementsListQuery({ gigId, orderVia, taskId }, { skip: !(gigId && orderVia && taskId) });

  useEffect(() => {
    if (gigId) {
      invalidatePrivateTags(['GetSingleTaskDetails', 'ListChangeTerms', 'GetRequestRefundList']);
      refetch();
    }
  }, []);

  // HANDLERS
  const toggleRequirementModal = () => {
    setRequirementModalOpen(!isRequirementModalOpen);
    setIsEdit(false);
  };

  const handleEditRequirement = id => {
    setRequirementModalOpen(true);
    setSelected(id);
    setIsEdit(true);
  };

  const handleAddRequirement = id => {
    setRequirementModalOpen(true);
    setSelected(id);
  };

  return (
    <Box className="bg-white mt-2" sx={{ borderRadius: '10px' }}>
      {/* HEADER */}
      <Box className="px-4 py-3">
        <Typography variant="h6" color={darkPurple} className="fw-500">
          Requirements
        </Typography>
      </Box>

      <Divider light />

      {/* LIST ITEM */}
      <Box className={`px-3 pt-2 ${styles.listItems}`}>
        {!(isFetching || isLoading) ? (
          <ol>
            {clientRequirementsData?.length > 0 ? (
              clientRequirementsData?.map((item, idx, { length }) => (
                <li key={item.id}>
                  <Box className="d-flex align-items-center justify-content-between">
                    <Typography variant="body1" className="fw-500" color={darkPurple}>
                      {item?.requirement_description}
                    </Typography>

                    <Box className="d-flex align-items-center gap-2">
                      {(item?.description || item?.attachments?.length > 0) && (
                        <IconButton
                          className="p-1"
                          sx={{ background: yellow }}
                          onClick={() => handleEditRequirement(item?.id)}
                        >
                          <Edit sx={{ fontSize: 20 }} />
                        </IconButton>
                      )}

                      {(!item?.description && item?.attachments?.length === 0) && (
                        <IconButton
                          className="p-1"
                          sx={{ background: yellow }}
                          onClick={() => handleAddRequirement(item?.id)}
                        >
                          <Add sx={{ fontSize: 20 }} />
                        </IconButton>
                      )}
                    </Box>
                  </Box>

                  <Typography variant="body1" className="text-muted">
                    {item.description || 'No Description Added!'}
                  </Typography>

                  <Box className="d-flex flex-wrap align-items-center mt-3 gap-4">
                    {item?.attachments?.map(file => (
                      <Box
                        className="col-auto d-flex align-items-center pointer"
                        key={file?.id}
                        onClick={() => saveAs(file?.attachment)}
                      >
                        <img
                          className={styles.fileIcon}
                          src={setIconByFileType(file?.attachment || '')}
                          alt="icon"
                        />

                        <Box>
                          <Typography variant="body2" className="fw-500">
                            {`${file?.file_name?.slice(0, 10)}`}
                          </Typography>

                          <Typography variant="body2" className="text-muted">
                            {formatFileSize(file?.file_size || 0)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {idx + 1 !== length && <Divider className="my-2" light />}
                </li>
              ))
            ) : (
              <Box>No Record Found!</Box>
            )}
          </ol>
        ) : (
          <Box>
            <SectionLoader />
          </Box>
        )}

        <TaskRequirementsModal
          isOpen={isRequirementModalOpen}
          handleClose={toggleRequirementModal}
          selected={selected}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      </Box>
    </Box>
  );
}

TaskDetailsRequirementsTabPanel.propTypes = {
  gigId: propTypes.number,
};

TaskDetailsRequirementsTabPanel.defaultProps = {
  gigId: null,
};

export default TaskDetailsRequirementsTabPanel;
