import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

// COMPONENTS & UTILITIES
import { COMPLETED } from 'utilities/constants';
import FeedbackModal from './workspace-tabs/FeedbackModal';

function CompletedTaskDetail({ taskDetails }) {
  const theme = useTheme();
  const colors = theme.palette;
  const lightOrange = colors.lightOrange.main;

  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const toggleFeedbackModal = () => {
    setFeedbackModalOpen(!isFeedbackModalOpen);
  };

  return (
    taskDetails?.status === COMPLETED && (
      <>
        <Box
          className="bg-white px-4 py-2 mt-3 w-100 d-flex flex-wrap align-items-center justify-content-center justify-content-xl-between gap-4"
          sx={{ borderRadius: '5px', border: `1px solid ${lightOrange}` }}
        >
          <Box className="text-center">
            <Typography variant="h5" sx={{ fontSize: '22px' }}>
              Congratulations Task is Complete
            </Typography>
          </Box>

          {/* {!taskDetails?.client_rating && !isBuyer && (
            <Button onClick={toggleFeedbackModal} className="px-4 py-2" variant="contained" color="secondary">
              Give feedback to client
            </Button>
          )} */}
        </Box>
        <FeedbackModal isOpen={isFeedbackModalOpen} handleToggle={toggleFeedbackModal} />
      </>
    )
  );
}
CompletedTaskDetail.propTypes = {
  taskDetails: PropTypes.object,
};

CompletedTaskDetail.defaultProps = {
  taskDetails: {},
};

export default CompletedTaskDetail;
