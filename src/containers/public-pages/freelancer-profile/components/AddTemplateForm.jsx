import React, { useRef } from 'react';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import FileUploadIcon from 'assets/file-upload-icon.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

// SHARED COMPONENTS
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';

// API HOOKS
import { useAddTemplateMutation } from 'services/private/profile';

// CUSTOM ERROR HOOKS
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// STYLES
import {
  addImageButtonStyles,
  addTemplateCancelButtonStyles,
  addTemplateDeleteIconButtonStyles,
  addTemplateDeleteIconStyles,
  templatesImagesStyles,
  templatesImageWrapperStyles,
} from 'styles/mui/public-pages/freelancer-profile/user-templates-styles';

// UTILITIES
import { addTemplateValidationSchema } from '../utilities/validationSchema';

function AddTemplateForm() {
  // RENAMING HOOKS
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // BASE HOOKS
  const inputRef = useRef(null);
  const { userInfo } = useSelector(state => state.auth);

  // CUSTOM HOOKS
  const [addTemplate, { error, isLoading, isSuccess }] = useAddTemplateMutation();
  useHandleApiResponse(error, isSuccess, 'Template Created Successfully!');

  // HANDLER FUNCTIONS
  const handleUploadFileChange = (e, values, setFieldValue) => {
    const files = [...e.target.files];

    const hasUnSupportedFiles = files.find(item => !item.type.includes('image'));

    if (hasUnSupportedFiles) enqueueSnackbar('File(s) not supported!', { variant: 'error' });

    const filteredImageFiles = files.filter(item => item.type.includes('image'));

    const modifiedImages = filteredImageFiles.map(imageFile => {
      // eslint-disable-next-line no-param-reassign
      imageFile.imgSrc = URL.createObjectURL(imageFile);
      // eslint-disable-next-line no-param-reassign
      imageFile.uid = uuidv4();
      return {
        image: imageFile,
      };
    });

    if (values.images === null) {
      setFieldValue('images', modifiedImages);
    } else {
      setFieldValue('images', [...modifiedImages, ...values.images]);
    }
  };

  const handleDeleteImage = (image, values, setFieldValue) => {
    const filteredData = values.filter(item => item !== image);
    setFieldValue('images', filteredData);
  };

  const goBack = () => {
    navigate(-1);
  };

  // CONSTANTS
  const userId = userInfo?.id || null;

  return (
    <Formik
      initialValues={{ jobTitle: '', jobDescription: '', images: null }}
      validationSchema={addTemplateValidationSchema}
      onSubmit={async values => {
        const body = { ...values, profile: userId };
        await addTemplate(body);
        goBack();
      }}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched }) => (
        <Form>
          <Box className="d-flex align-items-start justify-content-center flex-column p-3">
            {/* JOB TITLE */}
            <Box className="form-group-row d-flex align-items-start w-100 mb-3">
              <Box className="col-3">
                <Typography variant="label">Job Title</Typography>
              </Box>
              <Box className="col-9">
                <FormikField name="jobTitle" placeholder="Title" fullWidth />
              </Box>
            </Box>

            {/* JOB DESCRIPTION */}
            <Box className="form-group-row d-flex align-items-start w-100 mb-3">
              <Box className="col-3">
                <Typography variant="label">Job Description</Typography>
              </Box>
              <Box className="col-9">
                <FormikField
                  type="textarea"
                  name="jobDescription"
                  placeholder="Description"
                  fullWidth
                  wordsCounter
                />
              </Box>
            </Box>

            {/* IMAGES */}
            <Box className="form-group-row d-flex align-items-start w-100 mb-3">
              <Box className="col-3">
                <Typography variant="label">Images</Typography>
              </Box>
              <Box className="col-9">
                <Box
                  className="w-100 d-flex align-items-center justify-content-start flex-column flex-sm-column flex-md-row flex-wrap"
                  sx={{ gap: '10px 10px' }}
                >
                  {values?.images?.map(item => (
                    <Box key={item?.image.uid} sx={templatesImageWrapperStyles}>
                      <Box
                        sx={{
                          background: `url(${item?.image?.imgSrc}) center no-repeat`,
                          ...templatesImagesStyles,
                        }}
                      />
                      <IconButton
                        sx={addTemplateDeleteIconButtonStyles}
                        onClick={() => handleDeleteImage(item, values.images, setFieldValue)}
                      >
                        <Delete sx={addTemplateDeleteIconStyles} />
                      </IconButton>
                    </Box>
                  ))}

                  <ButtonBase
                    sx={{
                      ...addImageButtonStyles,
                      borderColor: errors.images && touched.images ? 'rgba(255,0,0,1)' : '#e8e4e7',
                    }}
                    onClick={() => inputRef?.current.click()}
                  >
                    <Box className="d-flex align-items-center justify-content-center flex-column p-2 w-100 h-100">
                      <Box className="text-center flex-grow-1 d-flex align-items-center justify-content-center flex-column">
                        <img src={FileUploadIcon} alt="file-upload-icon" />
                        <Typography variant="body2" className="my-2">
                          Drag image here or
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          Browse
                        </Typography>
                      </Box>

                      <Typography variant="body2" className="text-muted" sx={{ fontSize: '12px' }}>
                        png, jpg, jpge
                      </Typography>
                    </Box>
                  </ButtonBase>
                </Box>

                <input
                  type="file"
                  ref={inputRef}
                  hidden
                  onChange={e => handleUploadFileChange(e, values, setFieldValue)}
                  multiple
                  accept="image/*"
                />
              </Box>
            </Box>
          </Box>

          <Divider />

          <Box className="box-footer p-3 d-flex align-items-center justify-content-end">
            <Button onClick={goBack} sx={addTemplateCancelButtonStyles} className="me-2 py-2 px-3">
              Cancel
            </Button>
            <SubmitButton
              variant="contained"
              color="secondary"
              title="Save"
              isLoading={isSubmitting || isLoading}
              className="py-2 px-5"
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default AddTemplateForm;
