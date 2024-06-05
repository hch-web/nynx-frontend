import React from 'react';
import { Modal, Box, Typography, Stack, Button } from '@mui/material';
import propTypes from 'prop-types';
import { modalBoxContainer } from 'styles/mui/public-pages/freelancer-profile/freelancer-profile-styles';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import FormikField from 'shared/components/form/FormikField';
import FormikSelectField from 'shared/components/form/FormikSelectField';
import { useAddSkillMutation } from 'services/private/profile';
import SubmitButton from 'containers/common/components/SubmitButton';

// UTILITIES
import { skillValidationSchema } from '../utilities/validationSchema';
import { addSkillLevelOptions } from '../utilities/menuOptions';
import { errorHandler } from '../utilities/error-handler';

function SkillsModal({ isSkillModalOpen, toggleSkillModal, userId }) {
  const [addSkill, { isLoading: addSkillIsLoading }] = useAddSkillMutation();

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Modal open={isSkillModalOpen} onClose={toggleSkillModal}>
      <Box className="modal-box-container" sx={modalBoxContainer}>
        <Formik
          initialValues={{ name: '', level: '' }}
          validationSchema={skillValidationSchema}
          onSubmit={async values => {
            const body = { ...values, profile: userId };
            const addSkillResp = await addSkill(body);
            const errorResp = errorHandler(addSkillResp);
            enqueueSnackbar(...errorResp);
            toggleSkillModal();
          }}
        >
          {({ isSubmitting }) => {
            const loading = isSubmitting || addSkillIsLoading;
            return (
              <Form>
                <Box className="modal-box-header px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
                  <Typography variant="h6">Add Skill</Typography>

                  <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 2 }}>
                    <Button sx={{ borderRadius: '25px' }} className="px-3 py-2" onClick={toggleSkillModal}>
                      Cancel
                    </Button>

                    <SubmitButton
                      isLoading={loading}
                      color="secondary"
                      variant="contained"
                      className="px-4 py-2"
                      title="Save"
                    />
                  </Stack>
                </Box>

                <Box className="modal-box-body py-3">
                  <Stack
                    spacing={{ xs: 1, sm: 1, md: 2 }}
                    direction={{ xs: 'column', sm: 'column', md: 'row' }}
                    className="px-3"
                  >
                    <Box className="col-6 p-0">
                      <FormikField name="name" type="text" placeholder="Type Skill" fullWidth />
                    </Box>
                    <Box className="col p-0">
                      <FormikSelectField options={addSkillLevelOptions} name="level" />
                    </Box>
                  </Stack>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
}

SkillsModal.propTypes = {
  isSkillModalOpen: propTypes.bool.isRequired,
  toggleSkillModal: propTypes.func.isRequired,
  userId: propTypes.number,
};

SkillsModal.defaultProps = {
  userId: 0,
};

export default SkillsModal;
