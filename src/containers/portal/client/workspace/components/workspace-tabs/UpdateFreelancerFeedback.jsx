/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Modal, Stack, Typography, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';

// STYLES
import { taskDetailsGeneralModalStyles } from 'styles/mui/portal/workspace-styles';

// Api
import { useUpdateFeedbackMutation } from 'services/private/task-details';

// COMPONENTS & UTILITIES
import SubmitButton from 'containers/common/components/SubmitButton';
import FormikField from 'shared/components/form/FormikField';
import { updateFeedbackInitialValues } from 'containers/portal/client/workspace/utilities/initialValues';
import Rating from '../../common/Rating';
import { feedbackModalValSchema } from '../../utilities/validationSchema';

function FeedbackModal({ handleToggle, isOpen, feedback }) {
  const theme = useTheme();
  const [modalState, setModalState] = useState(updateFeedbackInitialValues);

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // Api Hook
  const [updateFeedback, { isLoading: updateFeedbackLoading }] = useUpdateFeedbackMutation();

  // HANDLER FUNCTIONS
  const handleRatingChange = (e, newVal) => {
    if (newVal !== null) {
      setModalState({ ...modalState, rating: newVal });
    }
  };

  useEffect(() => {
    setModalState({ ...modalState, rating: feedback?.rating, description: feedback?.description });
  }, [feedback]);

  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box sx={taskDetailsGeneralModalStyles}>
        <Formik
          enableReinitialize
          initialValues={modalState}
          validationSchema={feedbackModalValSchema}
          onSubmit={async values => {
            const payload = {
              ...values,
              rating: values.rating || null,
              id: feedback?.id,
            };
            await updateFeedback(payload);
            handleToggle();
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              {/* HEADER WITH BUTTONS */}
              <Box className="px-4 py-2 d-flex align-items-center justify-content-between">
                <Typography variant="h6" className="fw-600" color={darkPurple}>
                  Feedback
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Button onClick={handleToggle}>Cancel</Button>

                  <SubmitButton
                    title="Send"
                    variant="contained"
                    color="secondary"
                    className="px-4 py-2"
                    isLoading={updateFeedbackLoading}
                  />
                </Stack>
              </Box>

              <Divider light />

              {/* BODY */}
              <Box className="px-4 py-2">
                {/* RATING & TIP BOX WRAPPER */}
                <Box className="d-flex align-items-start gap-3 mt-3">
                  <Box className="col">
                    <Typography variant="body1" className="fw-500">
                      Rating
                    </Typography>

                    <Box className="d-flex align-items-center">
                      <Rating value={values.rating} onChange={handleRatingChange} />
                      <Typography variant="h4">{parseFloat(values.rating).toFixed(1) || 0}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="mt-2">
                  <Typography className="mb-2 fw-500" variant="body2">
                    Description
                  </Typography>

                  <FormikField type="textarea" name="description" fullWidth />
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

FeedbackModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleToggle: propTypes.func.isRequired,
  feedback: propTypes.object,
};

FeedbackModal.defaultProps = {
  feedback: {},
};
export default FeedbackModal;
