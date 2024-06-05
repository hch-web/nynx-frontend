import React from 'react';
import { Modal, Box, Typography, Stack, Button } from '@mui/material';
import propTypes from 'prop-types';
import { Form, Formik } from 'formik';
import FormikField from 'shared/components/form/FormikField';
import { useAddProfileAboutInfoMutation } from 'services/private/profile';
import { useSnackbar } from 'notistack';

// UTILITIES
import { aboutBoxContainer } from 'styles/mui/public-pages/freelancer-profile/freelancer-profile-styles';
import SubmitButton from 'containers/common/components/SubmitButton';
import { aboutAddValidationSchema, aboutUpdateValidationSchema } from '../utilities/validationSchema';

function AboutModal({ isAboutModalOpen, toggleProfileAboutModal, isEditing, user, setIsEditing }) {
  // BASE HOOKS
  const { enqueueSnackbar } = useSnackbar();

  // DATA HOOKS
  const [addAboutInfo, { isLoading: addAboutInfoLoading }] = useAddProfileAboutInfoMutation();

  // CONSTANTS
  const tagLineValue = isEditing ? user?.tag_line : '';
  const descriptionValue = isEditing ? user?.description : '';

  return (
    <Modal open={isAboutModalOpen} onClose={toggleProfileAboutModal}>
      <Box className="modal-box-container" sx={aboutBoxContainer}>
        <Formik
          initialValues={{ tagLine: tagLineValue, description: descriptionValue }}
          validationSchema={isEditing ? aboutUpdateValidationSchema : aboutAddValidationSchema}
          onSubmit={async values => {
            const body = {
              tag_line: values.tagLine === '' ? null : values.tagLine,
              description: values.description === '' ? null : values.description,
            };
            await addAboutInfo(body);
            enqueueSnackbar('User Info Updated!', { variant: 'success' });
            toggleProfileAboutModal();
            if (isEditing) {
              setIsEditing(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box className="modal-box-header px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
                <Typography variant="h6">{isEditing ? 'Update Info' : 'Add Info'}</Typography>
                <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 2 }}>
                  <Button
                    sx={{ borderRadius: '25px' }}
                    className="px-3 py-2"
                    onClick={toggleProfileAboutModal}
                  >
                    Cancel
                  </Button>
                  <SubmitButton
                    color="secondary"
                    variant="contained"
                    className="px-4 py-2"
                    isLoading={isSubmitting || addAboutInfoLoading}
                    title="Save"
                  />
                </Stack>
              </Box>
              <Box className="modal-box-body py-3">
                <Stack spacing={2} direction="column" className="px-3">
                  <FormikField name="tagLine" type="text" placeholder="Title" fullWidth />
                  <FormikField name="description" type="textarea" placeholder="Description" fullWidth />
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

AboutModal.propTypes = {
  isAboutModalOpen: propTypes.bool.isRequired,
  toggleProfileAboutModal: propTypes.func.isRequired,
  isEditing: propTypes.bool,
  user: propTypes.object,
  setIsEditing: propTypes.func.isRequired,
};

AboutModal.defaultProps = {
  isEditing: false,
  user: {},
};

export default AboutModal;
