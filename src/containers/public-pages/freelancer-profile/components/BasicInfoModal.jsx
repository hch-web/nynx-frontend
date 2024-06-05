import React, { useRef, useState } from 'react';
import { Box, Modal, Typography, Stack, Button } from '@mui/material';
import {
  basicInfoModalAvatarStyles,
  modalBoxContainer,
} from 'styles/mui/public-pages/freelancer-profile/freelancer-profile-styles';
import propTypes from 'prop-types';
import { useAddProfileAboutInfoMutation } from 'services/private/profile';
import { Form, Formik } from 'formik';

// IMAGES
import profileDummyImg from 'assets/dummy-profile.png';

// CUSTOM HOOK
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// SHARED
import SubmitButton from 'containers/common/components/SubmitButton';
import { convertURLToFile } from 'utilities/helpers';
import { useSnackbar } from 'notistack';
import FormikField from 'shared/components/form/FormikField';
import { aboutInfoValidationSchema } from '../utilities/validationSchema';
import ImageCropperModal from './ImageCropperModal';

function BasicInfoModal({ openBasicInfoModal, handleBasicInfoModal, user }) {
  // STATE HOOKS
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isImageCropperModalOpen, setIsImageCropperModalOpen] = useState(false);

  // REFERENCING
  const inputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  // API HOOKS
  const [uploadProfileInfo, { isLoading, isSuccess, error: profileApiError }] = useAddProfileAboutInfoMutation();
  useHandleApiResponse(profileApiError, isSuccess, 'Profile Updated!');

  // HANDLER FUNCTION
  const handleChange = e => {
    const file = e.target.files[0];

    if (file?.size > 1024 * 1024) {
      enqueueSnackbar("Image size shouldn't be more than 1MB", { variant: 'error' });
    } else {
      if (!file.type.includes('image')) {
        enqueueSnackbar('Unsupported Format. Please upload image file!', { variant: 'error' });
        setUploadedImage(null);
        return;
      }
      const createImgUrl = URL.createObjectURL(file);
      setUploadedImage(createImgUrl);
      setIsImageCropperModalOpen(true);
    }
  };

  const toggleImageCroperModal = () => {
    setIsImageCropperModalOpen(!isImageCropperModalOpen);
  };

  // CONSTANTS
  const initValues = {
    image: '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
  };

  return (
    <>
      <Modal open={openBasicInfoModal} onClose={handleBasicInfoModal}>
        <Box sx={modalBoxContainer}>
          <Formik
            initialValues={initValues}
            validationSchema={aboutInfoValidationSchema}
            onSubmit={async values => {
              const formData = new FormData();
              if (croppedImage) {
                const convertedFile = await convertURLToFile(croppedImage);
                formData.append('image', convertedFile);
              }
              formData.append('first_name', values.firstName);
              formData.append('last_name', values.lastName);
              await uploadProfileInfo(formData);
              handleBasicInfoModal();
              setUploadedImage(null);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Box className="modal-box-header px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
                  <Typography variant="h6">Profile</Typography>

                  <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 2 }}>
                    <Button
                      sx={{ borderRadius: '25px' }}
                      className="px-3 py-2"
                      onClick={handleBasicInfoModal}
                    >
                      Cancel
                    </Button>

                    <SubmitButton
                      color="secondary"
                      variant="contained"
                      className="px-4 py-2"
                      isLoading={isSubmitting || isLoading}
                      title="Save"
                    />
                  </Stack>
                </Box>

                <Box className="modal-box-body pb-3">
                  <Stack direction="column" className="px-3" spacing={2}>
                    <input
                      name="image"
                      hidden
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      onChange={e => handleChange(e)}
                    />

                    <Box className="text-center">
                      <Box className="d-flex align-items-center justify-content-center">
                        <Box
                          sx={{
                            background: `url(${
                              croppedImage || user?.image || profileDummyImg
                            }) center no-repeat`,
                            ...basicInfoModalAvatarStyles,
                          }}
                          onClick={() => {
                            inputRef?.current.click();
                          }}
                        />
                      </Box>
                      {errors.image && touched.image && (
                        <Typography variant="body1" className="text-danger">
                          {errors.image}
                        </Typography>
                      )}
                    </Box>

                    <FormikField name="firstName" placeholder="FirstName" fullWidth />
                    <FormikField name="lastName" placeholder="LastName" fullWidth />
                  </Stack>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ImageCropperModal
        isOpenImageCropperModal={isImageCropperModalOpen}
        imageToCrop={uploadedImage}
        toggleImageCroperModal={toggleImageCroperModal}
        setCroppedImage={setCroppedImage}
      />
    </>
  );
}

BasicInfoModal.propTypes = {
  openBasicInfoModal: propTypes.bool.isRequired,
  handleBasicInfoModal: propTypes.func.isRequired,
  user: propTypes.object,
};

BasicInfoModal.defaultProps = {
  user: null,
};

export default BasicInfoModal;
