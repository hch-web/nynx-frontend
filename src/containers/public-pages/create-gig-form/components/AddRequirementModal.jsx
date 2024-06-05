import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import { Formik, Form, useFormikContext } from 'formik';
import { v4 as uuidv4 } from 'uuid';

// styles
import { addRequirementModalStyles } from 'styles/mui/public-pages/create-gig/requirement-styles';

// common
import FormikField from 'shared/components/form/FormikField';
import Label from '../common/Label';

// utilities
import { requirementInitialValues } from '../utilities/initialValues';
import { requirementValidationSchema } from '../utilities/validationSchema';

function AddRequirementModal({ name, isRequirementModalOpen, toggleRequirementModel }) {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Modal open={isRequirementModalOpen} onClose={toggleRequirementModel}>
      <Box sx={addRequirementModalStyles}>
        <Formik
          initialValues={requirementInitialValues}
          onSubmit={(submittedValues, { resetForm }) => {
            setFieldValue(name, [...values[name], { requirement: submittedValues.requirement, id: uuidv4() }]);
            resetForm();
            toggleRequirementModel();
          }}
          validationSchema={requirementValidationSchema}
        >
          <Form>
            <Box className="border-bottom d-flex flex-row align-items-center justify-content-between py-2 px-3">
              <Typography variant="h6" className="text-start">
                Add Requirement
              </Typography>
              <Box className="d-flex align-items-center">
                <Button className="me-2 rounded-pill px-3 py-2" onClick={toggleRequirementModel}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="secondary" className="px-4 py-2">
                  Save
                </Button>
              </Box>
            </Box>

            <Box className="py-4 px-3">
              <Label className="mb-3">Requirement</Label>
              <FormikField
                name="requirement"
                placeholder="What you want to ask from buyer before start working?"
                type="textarea"
                fullWidth
              />
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
}

AddRequirementModal.propTypes = {
  name: PropTypes.string.isRequired,
  isRequirementModalOpen: PropTypes.bool.isRequired,
  toggleRequirementModel: PropTypes.func.isRequired,
};

export default AddRequirementModal;
