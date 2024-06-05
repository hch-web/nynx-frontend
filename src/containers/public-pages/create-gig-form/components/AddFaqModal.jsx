import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import { Formik, Form, useFormikContext } from 'formik';
import { v4 as uuidv4 } from 'uuid';

// styles
import { addRequirementModalStyles } from 'styles/mui/public-pages/create-gig/requirement-styles';

// common
import FormikField from 'shared/components/form/FormikField';

// utilities
import { addFaqInitialValues } from '../utilities/initialValues';
import { faqValidationSchema } from '../utilities/validationSchema';

function AddFaqModal({ name, isAddFaqModalOpen, toggleFaqModal }) {
  const { values, setFieldValue } = useFormikContext();
  return (
    <Modal open={isAddFaqModalOpen} onClose={toggleFaqModal}>
      <Box sx={addRequirementModalStyles}>
        <Formik
          initialValues={addFaqInitialValues}
          onSubmit={(submittedValues, { resetForm }) => {
            setFieldValue(name, [
              ...values[name],
              { question: submittedValues.question, answer: submittedValues.answer, id: uuidv4() },
            ]);
            resetForm();
            toggleFaqModal();
          }}
          validationSchema={faqValidationSchema}
        >
          <Form>
            <Box className="border-bottom d-flex flex-row align-items-center justify-content-between py-2 px-3">
              <Typography variant="h6" className="text-start">
                Add Frequently Asked Question
              </Typography>
              <Box className="d-flex align-items-center">
                <Button className="me-2 rounded-pill px-3 py-2" onClick={toggleFaqModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="secondary" className="px-4 py-2">
                  Save
                </Button>
              </Box>
            </Box>

            <Box className="py-4 px-3">
              <FormikField name="question" placeholder="Add a Question" type="text" fullWidth />
            </Box>
            <Box className="pb-4 px-3">
              <FormikField name="answer" placeholder="Add an Answer" type="textarea" fullWidth />
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
}

AddFaqModal.propTypes = {
  name: PropTypes.string.isRequired,
  isAddFaqModalOpen: PropTypes.bool.isRequired,
  toggleFaqModal: PropTypes.func.isRequired,
};

export default AddFaqModal;
