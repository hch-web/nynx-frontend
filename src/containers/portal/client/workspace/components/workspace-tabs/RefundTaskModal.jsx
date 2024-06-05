import React from 'react';
import { Box, Button, Divider, Modal, Stack, Typography, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';
import * as yup from 'yup';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

// API HOOKS
import { useRequestRefundMutation } from 'services/private/payments/refund-task';
import { useListTaskDetailsQuery } from 'services/private/task-details';

// COMPONENTS, UTILITIES & STYLES
import FormikField from 'shared/components/form/FormikField';
import { taskDetailsGeneralModalStyles } from 'styles/mui/portal/workspace-styles';
import SubmitButton from 'containers/common/components/SubmitButton';
import { CLIENT_ORDER, DIRECT_HIRE, JOB_OFFER } from 'utilities/constants';
import PreviousNewCards from '../../common/PreviousNewCards';
import { taskDetailsRefundModalInitVal } from '../../utilities/initialValues';

function RefundTaskModal({ isOpen, handleToggle }) {
  const theme = useTheme();
  const { taskId, taskVia } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const orderVia = taskVia === DIRECT_HIRE ? CLIENT_ORDER : JOB_OFFER;

  // API HOOKS
  const [requestRefund, { isLoading }] = useRequestRefundMutation();
  const { data: taskDetails } = useListTaskDetailsQuery({ taskVia, taskId }, { skip: !(taskVia && taskId) });

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // CONSTANTS
  const taskBudget = taskDetails?.initial_rates || 0;

  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box sx={taskDetailsGeneralModalStyles}>
        <Formik
          initialValues={taskDetailsRefundModalInitVal}
          validationSchema={yup.object({
            amount: yup.number().max(taskBudget, 'Refund amount cannot be greater than total budget.'),
          })}
          onSubmit={async values => {
            const payload = { job_offer_id: taskId, task_via: orderVia, ...values };

            const refundResp = await requestRefund(payload);

            if (refundResp.data) {
              enqueueSnackbar('Refund requested successfully!', { variant: 'success' });
            }
            handleToggle();
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              {/* HEADER WITH BUTTONS */}
              <Box className="px-4 py-2 d-flex align-items-start justify-content-between">
                <Typography variant="h6" className="fw-600" color={darkPurple}>
                  Refund
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Button onClick={handleToggle}>Cancel</Button>

                  <SubmitButton
                    title="Refund"
                    variant="contained"
                    color="secondary"
                    className="px-4 py-2"
                    isLoading={isSubmitting || isLoading}
                  />
                </Stack>
              </Box>

              <Divider light />

              <Box className="px-4 py-3">
                <PreviousNewCards
                  headingLabel="Budget"
                  subHeadingLabel="Refund"
                  prevHeadValue={`$${taskBudget}`}
                  newHeadValue={`$${taskBudget - values.amount}`}
                  newSubHeadValue={`$${values.amount || 0}`}
                />

                <Box>
                  <Typography variant="body1">Refund amount (USD)</Typography>
                  <FormikField name="amount" type="number" fullWidth />
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

RefundTaskModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleToggle: propTypes.func.isRequired,
};

export default RefundTaskModal;
