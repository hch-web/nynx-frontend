import React, { useRef } from 'react';
import { Box, Button, Divider, Modal, Stack, Typography, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// STYLES
import { taskDetailsGeneralModalStyles } from 'styles/mui/portal/workspace-styles';

// API HOOKS
import {
  useClientFeedbackMutation,
  useFreelancerFeedbackMutation,
  useUpdateClientFeedbackMutation,
} from 'services/private/task-details';

// COMPONENTS & UTILITIES
import SubmitButton from 'containers/common/components/SubmitButton';
import FormikField from 'shared/components/form/FormikField';
import { CLIENT_ORDER, DIRECT_HIRE, JOB_OFFER, TIP } from 'utilities/constants';
import Rating from '../../common/Rating';
import { feedbackModalValSchema } from '../../utilities/validationSchema';

function FeedbackModal({ handleToggle, isOpen, feedback }) {
  const theme = useTheme();
  const formikRef = useRef(null);
  const { taskVia, taskId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // REDUX STATE
  const { is_buyer: isBuyer } = useSelector(state => state.auth.userInfo);

  // API HOOKS
  const [clientFeedback] = useClientFeedbackMutation();
  const [freelancerFeedback] = useFreelancerFeedbackMutation();
  const [updateClientFeedback] = useUpdateClientFeedbackMutation();

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // HANDLER FUNCTIONS
  const handleRatingChange = (e, newVal) => {
    if (newVal !== null) {
      formikRef.current?.setFieldValue('rating', newVal);
    }
  };

  const commonInitVal = {
    rating: 0,
    description: '',
  };

  const clientInitVal = {
    tip: 0,
  };

  const handleInitialValue = () => {
    if (isBuyer) return { ...clientInitVal, ...commonInitVal };
    return { rating: feedback?.rating || 0, description: feedback?.description || '' };
  };

  // Constants
  const isEdit = Boolean(feedback);

  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box sx={taskDetailsGeneralModalStyles}>
        <Formik
          innerRef={formikRef}
          validationSchema={feedbackModalValSchema}
          initialValues={handleInitialValue()}
          onSubmit={async values => {
            const payload = {
              ...values,
              tip: isBuyer ? values.tip || 0 : undefined,
              rating: values.rating || null,
            };

            if (isEdit) {
              await updateClientFeedback({
                id: feedback?.id,
                rating: values?.rating,
                description: values?.description,
              });
            } else {
              if (taskVia === DIRECT_HIRE) {
                payload.client_order_task = +taskId;
              } else if (taskVia === JOB_OFFER) {
                payload.job_offer_task = +taskId;
              }

              if (isBuyer) {
                if (payload?.tip > 0) {
                  navigate('/payment/checkout', {
                    state: {
                      checkoutState: { from: pathname, taskId, taskVia: CLIENT_ORDER, type: TIP, payload },
                    },
                  });
                } else {
                  await freelancerFeedback(payload);
                }
              } else {
                await clientFeedback(payload);
              }
            }
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
                    isLoading={isSubmitting}
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

                      <Typography variant="h4">{values?.rating ? parseFloat(values?.rating || 0)?.toFixed(1) : 0}</Typography>
                    </Box>
                  </Box>

                  {isBuyer && (
                    <Box className="col">
                      <Typography className="fw-500" variant="body1">
                        Tip (USD)
                      </Typography>

                      <FormikField type="price" name="tip" fullWidth />
                    </Box>
                  )}
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
  feedback: null,
};

export default FeedbackModal;
