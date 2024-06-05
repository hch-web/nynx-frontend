import React, { useRef, useEffect } from 'react';
import {
  Box,
  Button,
  CardActionArea,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import StarIcon from '@mui/icons-material/Star';
import propTypes from 'prop-types';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Lightbulb } from '@mui/icons-material';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';
import useApiServices from 'custom-hooks/useApiServices';

// services
import {
  useGetGalleryImagesQuery,
  useUpdateGalleryImagesMutation,
} from 'services/private/gig/create/gallery';

// styles
import styles from 'styles/public-pages/create-gig/gallery-tab.module.scss';
import {
  GalleryImagesStyles,
  infoBoxIconStyles,
  addImageButtonStyles,
  addImageButtonContainerStyles,
  delectIconStyles,
  infoCardStyles,
  galleryMainContainerStyles,
  uploadImageGuideCardStyles,
} from 'styles/mui/public-pages/create-gig/gallery-styles';

// assets
import uploadFileIcon from 'assets/file-upload-icon.svg';

// utilities
import { convertURLToImageFile } from 'utilities/helpers';
import { galleryTabValidationSchema } from '../../utilities/validationSchema';
import { imagesInitialValues } from '../../utilities/initialValues';
import { imageFileSizeIntoMbs, transformGalleryImages } from '../../utilities/helpers';

// common
import LayoutWrapper from '../../common/LayoutWrapper';
import SubmitButton from '../../../../common/components/SubmitButton';
import Label from '../../common/Label';

function GalleryTab({ setCurrentTab }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const inputRef = useRef(null);
  const formikRef = useRef(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { invalidatePrivateTags } = useApiServices();

  const { userInfo } = useSelector(state => state.auth);

  // QUERY PARAMS
  const [searchParams] = useSearchParams();
  const gigId = searchParams.get('id');

  const [updateGalleryImages, { error, isSuccess, isLoading: updateGalleryLoading }] = useUpdateGalleryImagesMutation();
  const { data: galleryImages } = useGetGalleryImagesQuery(gigId, { skip: !gigId });

  const convertAndSetTemplateImages = () => {
    Promise.all(
      // eslint-disable-next-line no-return-await
      galleryImages?.images.map(async item => await convertURLToImageFile(item.image))
    ).then(convertedGigImages => {
      formikRef.current.setFieldValue('images', transformGalleryImages(convertedGigImages));
    });
  };

  const successMessage = 'Data has been Saved Successfully';
  useHandleApiResponse(error, isSuccess, successMessage);

  // HANDLER FUNCTIONS
  const handleUploadFileChange = (e, setFieldValue, values) => {
    const files = [...e.target.files];

    const hasLargeSizeFiles = files.find(item => imageFileSizeIntoMbs(item) > 5); // 5 digit represent to mb;

    if (hasLargeSizeFiles) enqueueSnackbar('File(s) exeed maximum size of 5mb', { variant: 'error' });

    const hasUnSupportedFiles = files.find(item => !item.type.includes('image'));

    if (hasUnSupportedFiles) enqueueSnackbar('File(s) not supported!', { variant: 'error' });

    const filteredImageFiles = files.filter(
      item => item.type.includes('image') && imageFileSizeIntoMbs(item) < 5 // digit represent to mb
    );

    const modifiedImages = filteredImageFiles.map(imageFile => {
      // eslint-disable-next-line no-param-reassign
      imageFile.imgSrc = URL.createObjectURL(imageFile);
      return {
        image: imageFile,
        id: uuidv4(),
      };
    });

    setFieldValue('images', [...values.images, ...modifiedImages]);
  };

  const nextStep = () => {
    setCurrentTab(prevState => prevState + 1);
  };

  useEffect(() => {
    if (isSuccess) nextStep();
  }, [isSuccess]);

  useEffect(() => {
    if (formikRef && galleryImages?.images.length > 0) {
      convertAndSetTemplateImages();
    }
  }, [galleryImages, formikRef]);

  const handleDeleteImage = (image, values, setFieldValue) => {
    const filteredData = values.filter(item => item !== image);
    setFieldValue('images', filteredData);
  };

  const handleCancel = () => {
    invalidatePrivateTags(['GetGigList']);
    navigate(`/profile/${userInfo?.id}`);
  };

  return (
    <LayoutWrapper title="Gallery">
      <Formik
        initialValues={imagesInitialValues}
        innerRef={formikRef}
        validationSchema={galleryTabValidationSchema}
        onSubmit={values => {
          const galleryPayload = { ...values, gig: gigId };
          updateGalleryImages(galleryPayload);
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <Box className="py-3 px-4">
              <Box sx={galleryMainContainerStyles}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={3}
                    className="text-center text-md-start mb-3 mb-sm-3 mb-md-0"
                  >
                    <Label>Project Images</Label>
                    <Box className="d-flex justify-content-lg-start justify-content-center align-items-lg-start align-items-center mb-2">
                      <Box className="mt-3" sx={infoCardStyles}>
                        <Box className="d-flex align-items-center justify-content-center">
                          <Box
                            sx={{
                              background: `${darkPurple}`,
                              ...infoBoxIconStyles,
                            }}
                          >
                            <Lightbulb sx={{ color: '#fff' }} />
                          </Box>
                        </Box>
                        <Card sx={uploadImageGuideCardStyles}>
                          <CardContent>
                            <Typography variant="body2" className="fw-bold">
                              Best Image Size
                            </Typography>
                            <ul>
                              <li>
                                <Typography variant="body2">Recommended 1280 x 769 px.</Typography>
                              </li>
                              <li>
                                <Typography variant="body2">Minimum 712 x 430 px.</Typography>
                              </li>
                              <li>
                                <Typography variant="body2">Max size 5 Mb</Typography>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item lg={9} md={12} xs={12} sm={12} className="d-flex align-items-center flex-wrap">
                    {values.images.map((item, index) => (
                      <Box
                        key={item.id}
                        sx={{
                          background: `url(${item?.image?.imgSrc}) center no-repeat`,
                          ...GalleryImagesStyles,
                        }}
                      >
                        <Box className="d-flex flex-column justify-content-between h-100">
                          <Box
                            className="d-flex justify-content-end"
                            onClick={() => handleDeleteImage(item, values.images, setFieldValue)}
                          >
                            <IconButton aria-label="delete" className="mt-2 me-2" sx={delectIconStyles}>
                              <DeleteIcon sx={{ fontSize: 17 }} />
                            </IconButton>
                          </Box>
                          {index === 0 && (
                            <Box className="d-flex align-items-center mb-2">
                              <StarIcon className="text-light ms-1" />
                              <Typography className="text-light" variant="caption">
                                Primary
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    ))}
                    <CardActionArea
                      sx={addImageButtonContainerStyles}
                      onClick={() => inputRef?.current.click()}
                    >
                      <Box
                        className="d-flex flex-column align-items-center justify-content-center justify-content-md-end p-2"
                        sx={addImageButtonStyles}
                      >
                        <Box className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                          <img src={uploadFileIcon} alt="file-icon" />
                          <Box className="d-none d-sm-none d-md-block px-3">
                            <Typography variant="body2" className="text-center">
                              Drag image here or
                              <br className="d-none d-lg-block" /> Browse
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="mt-3 text-center">
                          <Typography variant="body2" sx={{ fontSize: '12px', color: '#9f8f99' }}>
                            png, jpg, jpeg
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        {errors.images && touched.images && (
                          <div className={`${styles.fieldError} text-danger`}>{errors.images}</div>
                        )}
                      </Box>
                      <input
                        type="file"
                        ref={inputRef}
                        hidden
                        onChange={e => handleUploadFileChange(e, setFieldValue, values)}
                        multiple
                        accept="images/*"
                      />
                    </CardActionArea>
                  </Grid>
                </Grid>
              </Box>

              <Box className="border-top py-3 px-4 d-flex justify-content-end">
                <Button className="me-3" onClick={handleCancel}>
                  Cancel
                </Button>
                <SubmitButton
                  title="Save & Continue"
                  className="px-lg-5 px-md-3 px-sm-1 py-2"
                  isLoading={updateGalleryLoading}
                />
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </LayoutWrapper>
  );
}

GalleryTab.propTypes = {
  setCurrentTab: propTypes.func,
};

GalleryTab.defaultProps = {
  setCurrentTab: () => {},
};

export default GalleryTab;
