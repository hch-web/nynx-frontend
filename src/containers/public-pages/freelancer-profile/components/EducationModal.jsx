import React from 'react';
import { Box, Button, CircularProgress, Modal, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import FormikField from 'shared/components/form/FormikField';
import { modalBoxContainer } from 'styles/mui/public-pages/freelancer-profile/freelancer-profile-styles';
import { useSnackbar } from 'notistack';
import propTypes from 'prop-types';
import {
  useAddEducationMutation,
  useGetEducationQuery,
  useUpdateEducationMutation,
} from 'services/private/profile';
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import { educationValidationSchema } from '../utilities/validationSchema';
import { errorHandler } from '../utilities/error-handler';

function EducationModal({ isEducationModalOpen, toggleEducationModal, userId, selected, setSelected }) {
  const { enqueueSnackbar } = useSnackbar();

  // API HOOKS
  const [addEducation, { isLoading: addEducationLoading }] = useAddEducationMutation();
  const { data: educationData } = useGetEducationQuery(selected, { skip: !selected });
  const [updateEducation, { error, isSuccess }] = useUpdateEducationMutation();

  useHandleApiResponse(error, isSuccess, 'Updated Successfully!');

  // CONSTANTS
  const initialValues = {
    institute: selected ? educationData?.institute : '',
    title: selected ? educationData?.title : '',
    year: selected ? educationData?.year : '',
  };

  return (
    <Modal open={isEducationModalOpen} onClose={toggleEducationModal}>
      <Box sx={modalBoxContainer}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={educationValidationSchema}
          onSubmit={async values => {
            const body = { ...values, profile: userId };

            if (selected) {
              await updateEducation({ ...body, id: educationData?.id });
              setSelected(false);
              toggleEducationModal();
            } else {
              const addEducationResp = await addEducation(body);
              const errorResp = errorHandler(addEducationResp);
              enqueueSnackbar(...errorResp);
              toggleEducationModal();
            }
          }}
        >
          {({ isSubmitting }) => {
            const loading = isSubmitting || addEducationLoading;
            return (
              <Form>
                <Box className="modal-box-header px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
                  <Typography variant="h6">Education</Typography>

                  <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 2 }}>
                    <Button
                      sx={{ borderRadius: '25px' }}
                      className="px-3 py-2"
                      onClick={toggleEducationModal}
                    >
                      Cancel
                    </Button>

                    <Button
                      color="secondary"
                      variant="contained"
                      className="px-4 py-2"
                      startIcon={loading ? <CircularProgress size={18} /> : undefined}
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? 'Loading' : selected && 'Update'}
                      {!loading && !selected && 'Add'}
                    </Button>
                  </Stack>
                </Box>

                <Box className="modal-box-body py-3">
                  <Stack spacing={2} direction="column" className="px-3">
                    <FormikField name="title" type="text" placeholder="Type Degree Title" fullWidth />
                    <FormikField name="institute" type="text" placeholder="Type Institute Name" fullWidth />
                    <FormikField name="year" type="number" placeholder="Type Year" fullWidth />
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

EducationModal.propTypes = {
  isEducationModalOpen: propTypes.bool.isRequired,
  toggleEducationModal: propTypes.func.isRequired,
  userId: propTypes.number,
  selected: propTypes.number,
  setSelected: propTypes.func.isRequired,
};

EducationModal.defaultProps = {
  userId: 0,
  selected: null,
};

export default EducationModal;
