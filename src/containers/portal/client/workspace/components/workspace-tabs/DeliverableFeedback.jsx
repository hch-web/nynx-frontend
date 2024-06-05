import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// API HOOKS
import {
  useAcceptDeliveryMutation,
  useListDeliverablesQuery,
  useTaskDetailsQuery,
} from 'services/private/task-details';

// CUSTOM HOOKS
import useApiServices from 'custom-hooks/useApiServices';

// STYLES
import styles from 'styles/portal/client/workspace-general.module.scss';

// UTILITIES & COMPONENTS
import {
  COMPLETED,
  IN_PROGRESS,
  CLIENT_ORDER,
  JOB_OFFER,
  DIRECT_HIRE,
  IN_REVISION,
} from 'utilities/constants';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import DeliverFilesModal from './DeliverFilesModal';
import RevisionsModal from './RevisionsModal';
import FeedbackModal from './FeedbackModal';
import UpdateFreelancerFeedback from './UpdateFreelancerFeedback';
import DeliverableList from '../DeliverableList';
import Rating from '../../common/Rating';

function DeliverableFeedback() {
  const theme = useTheme();
  const { taskVia, taskId } = useParams();
  const { invalidatePrivateTags } = useApiServices();

  // STATE HOOKS
  const [isDeliverFileModalOpen, setDeliverFileModalOpen] = useState(false);
  const [isRevisionModalOpen, setRevisionModalOpen] = useState(false);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [isUpdateFeedbackModalOpen, setIsUpdateFeedbackModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // REDUX STATE
  const { is_buyer: isBuyer } = useSelector(state => state.auth.userInfo);

  // API HOOKS
  const {
    data: taskDeliverables,
    isLoading,
    refetch,
    isFetching,
  } = useListDeliverablesQuery({ taskVia, taskId }, { skip: !(taskVia && taskId) });
  const { data: taskDetails } = useTaskDetailsQuery({ id: taskId, taskVia }, { skip: !(taskId && taskVia) });
  const [acceptDelivery] = useAcceptDeliveryMutation();

  useEffect(() => {
    refetch();
    invalidatePrivateTags(['GetSingleTaskDetails', 'ListChangeTerms', 'GetRequestRefundList']);
  }, []);

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // HANDLER FUNCTIONS
  const toggleDeliverFileModal = () => {
    setDeliverFileModalOpen(!isDeliverFileModalOpen);
  };

  const handleOpenRevisionsModal = selectedDeliveryId => {
    setRevisionModalOpen(true);
    setSelectedDelivery(selectedDeliveryId);
  };

  const handleCloseRevisionsModal = () => {
    setRevisionModalOpen(false);
  };

  const toggleFeedbackModal = () => {
    setFeedbackModalOpen(!isFeedbackModalOpen);
  };

  const handleToggleUpdateFeedbackModal = () => {
    setIsUpdateFeedbackModalOpen(() => !isUpdateFeedbackModalOpen);
  };

  const handleAcceptDelivery = async id => {
    const payload = { taskId: id, taskVia };

    await acceptDelivery(payload);

    toggleFeedbackModal();
  };

  // CONSTANTS
  const clientRating = taskDeliverables?.client_feedback?.rating;
  const clientDescription = taskDeliverables?.client_feedback?.description;
  const freelancerRating = taskDeliverables?.freelancer_feedback?.rating;
  const freelancerDescription = taskDeliverables?.freelancer_feedback?.description;
  const deliveryVia = taskVia === DIRECT_HIRE ? CLIENT_ORDER : JOB_OFFER;
  const deliveryDeadlineTime = taskDeliverables?.[deliveryVia]?.delivery_date;

  const handleDisableFeedback = status => {
    switch (status) {
      case IN_PROGRESS:
        return true;
      case IN_REVISION:
        return true;
      default:
        return false;
    }
  };

  return (
    <Box className="bg-white mt-2" sx={{ borderRadius: '10px' }}>
      <Box className="px-4 py-3 d-flex justify-content-between">
        <Typography variant="h6" color={darkPurple} className="fw-500">
          Delivery & Feedback
        </Typography>

        {!isBuyer ? (
          <Button
            onClick={toggleDeliverFileModal}
            variant="contained"
            color="secondary"
            disabled={taskDetails?.status === COMPLETED}
            className="px-3 py-2"
          >
            Deliver Work
          </Button>
        ) : (
          <Box>
            <Typography variant="body1" className="fw-500">
              Feedback to Client
            </Typography>

            <Box className="d-flex align-items-center">
              <Rating readOnly value={clientRating || 0} />

              {clientRating && <Typography variant="h4">{parseFloat(clientRating).toFixed(1)}</Typography>}
            </Box>

            {clientDescription && <Typography variant="body2">{clientDescription}</Typography>}
          </Box>
        )}

        <DeliverFilesModal isOpen={isDeliverFileModalOpen} handleToggle={toggleDeliverFileModal} />
      </Box>

      <Divider />

      <Box className={`py-3 ${styles.listItems}`}>
        {!(isLoading || isFetching) ? (
          <DeliverableList
            deliveryDeadlineTime={deliveryDeadlineTime}
            deliverables={taskDeliverables?.deliverables}
            taskDetails={taskDetails}
            handleOpenRevisionsModal={handleOpenRevisionsModal}
            handleAcceptDelivery={handleAcceptDelivery}
          />
        ) : (
          <Box className="my-5 py-5">
            <SectionLoader />
          </Box>
        )}

        <Divider />

        {/* FEEDBACK BOX WRAPPER */}
        <Box className="mt-2 px-4 d-flex flex-wrap flex-md-nowrap align-items-center gap-4">
          {/* CLIENT FEEDBACK BOX */}
          {!isBuyer && (
            <Box className="col-12 col-md">
              <Typography variant="body1" className="fw-500">
                Feedback to Client
              </Typography>

              <Box className="d-flex align-items-center">
                <Rating readOnly value={clientRating || 0} />

                {clientRating && <Typography variant="h4">{parseFloat(clientRating).toFixed(1)}</Typography>}
              </Box>

              {clientDescription && <Typography variant="body2">{clientDescription}</Typography>}
            </Box>
          )}
          {/* FREELANCER FEEDBACK BOX */}
          {isBuyer && (
            <Box className="col-12 col-md">
              <Typography variant="body1" className="fw-500">
                Feedback to Freelancer
              </Typography>

              <Box className="d-flex align-items-center">
                <Rating readOnly value={freelancerRating || 0} />

                {freelancerRating && (
                  <Typography variant="h4">{parseFloat(freelancerRating).toFixed(1)}</Typography>
                )}
              </Box>

              {freelancerDescription && <Typography variant="body2">{freelancerDescription}</Typography>}
            </Box>
          )}
          {!isBuyer ? (
            <Box className="ms-auto">
              <Button
                onClick={toggleFeedbackModal}
                variant="contained"
                color="secondary"
                className="px-4 py-2"
                disabled={handleDisableFeedback(taskDetails?.status)}
              >
                Give Feedback to Client
              </Button>
            </Box>
          ) : (
            <Box className="ms-auto">
              <Button
                onClick={handleToggleUpdateFeedbackModal}
                variant="contained"
                color="secondary"
                className="px-4 py-2"
                disabled={handleDisableFeedback(taskDetails?.status)}
              >
                Give Feedback to Freelancer
              </Button>
            </Box>
          )}
        </Box>

        <RevisionsModal
          isOpen={isRevisionModalOpen}
          handleToggle={handleCloseRevisionsModal}
          selectedDeliverable={selectedDelivery}
          setSelected={setSelectedDelivery}
        />

        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          handleToggle={toggleFeedbackModal}
          feedback={taskDeliverables?.client_feedback}
        />

        <UpdateFreelancerFeedback
          isOpen={isUpdateFeedbackModalOpen}
          handleToggle={handleToggleUpdateFeedbackModal}
          feedback={taskDeliverables?.freelancer_feedback}
        />
      </Box>
    </Box>
  );
}

export default DeliverableFeedback;
