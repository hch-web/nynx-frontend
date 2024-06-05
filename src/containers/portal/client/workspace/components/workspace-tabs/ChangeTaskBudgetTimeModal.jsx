import React from 'react';
import { Box, Button, Divider, Modal, Stack, Typography, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import moment from 'moment';
import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// API HOOKS
import { useChangeTermsMutation, useTaskDetailsQuery } from 'services/private/task-details';

// STYLES
import { taskDetailsGeneralModalStyles } from 'styles/mui/portal/workspace-styles';

// COMPONENTS & UTILITIES
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';
import { DIRECT_HIRE, JOB_OFFER, MONTHLY_BASED } from 'utilities/constants';
import PreviousNewCards from '../../common/PreviousNewCards';
import { taskDetailsBudgetTimeModalInitVal } from '../../utilities/initialValues';
import { changeBudgetTimeModalValSchema } from '../../utilities/validationSchema';

function ChangeTaskBudgetTimeModal({ isOpen, handleToggle }) {
  const theme = useTheme();
  const { taskId, taskVia } = useParams();

  // API HOOKS
  const [changeTerms] = useChangeTermsMutation();
  const { data: taskDetails } = useTaskDetailsQuery({ id: taskId, taskVia }, { skip: !(taskId && taskVia) });

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // CONSTANTS
  const isMonthlyBudgetType = taskDetails?.budget_type === MONTHLY_BASED;
  const cardHeading = isMonthlyBudgetType ? 'Budget Per Month:' : 'Budget:';
  const cardSubHeading = isMonthlyBudgetType ? 'End Date:' : 'Delivery:';
  const taskBudget = Number(taskDetails?.rates);
  const hiringDate = taskDetails?.delivery_date;
  const formatedGigCreatedAt = moment(hiringDate).format('DD MMM, YYYY');

  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box sx={taskDetailsGeneralModalStyles}>
        <Formik
          initialValues={taskDetailsBudgetTimeModalInitVal}
          validationSchema={changeBudgetTimeModalValSchema}
          onSubmit={async values => {
            const payload = {
              ...values,
              timeline: values.timeline || undefined,
              rates: values.rates || undefined,
            };

            if (taskVia === JOB_OFFER) {
              payload.job_offer_task = taskDetails.id;
            } else if (taskVia === DIRECT_HIRE) {
              payload.client_order_task = taskDetails.id;
            }
            await changeTerms(payload);
            handleToggle();
          }}
        >
          {({ isSubmitting, values }) => {
            const taskNewDate = moment(hiringDate)
              .add(values.timeline, isMonthlyBudgetType ? 'months' : 'days')
              .format('DD MMM, YYYY');

            return (
              <Form>
                {/* HEADER WITH BUTTONS */}
                <Box className="px-4 py-2 d-flex align-items-center justify-content-between">
                  <Typography variant="h6" className="fw-600" color={darkPurple}>
                    Change Terms
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
                <Box className="px-4 py-2 pb-4">
                  <PreviousNewCards
                    headingLabel={cardHeading}
                    subHeadingLabel={cardSubHeading}
                    prevHeadValue={`$${taskBudget}`}
                    prevSubHeadValue={formatedGigCreatedAt}
                    newHeadValue={`$${taskBudget + values.rates}`}
                    newSubHeadValue={taskNewDate}
                  />

                  {/* FORM INPUT ROW */}
                  <Box className="d-flex align-items-start gap-4">
                    <Box className="col">
                      <Typography variant="body1" className="fw-500 mb-2">
                        Add budget (USD)
                      </Typography>

                      <FormikField name="rates" type="number" fullWidth />
                    </Box>

                    <Box className="col">
                      <Typography variant="body1" className="fw-500 mb-2">
                        Add Days
                      </Typography>

                      <FormikField name="timeline" type={isMonthlyBudgetType ? 'months' : 'days'} fullWidth />
                    </Box>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
}

ChangeTaskBudgetTimeModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleToggle: propTypes.func.isRequired,
};

export default ChangeTaskBudgetTimeModal;
