import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Button,
  Stack,
  CardActionArea,
  Chip,
  List,
  ListItemButton,
} from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';

// API HOOKS
import { useCreateJobPostMutation, useRenewJobPostMutation } from 'services/private/jobPost';

// CUSTOM HOOKS
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// STYLES
import styles from 'styles/portal/client/create-workspace.module.scss';
import { jobPostingFormAddSkillButtonStyles } from 'styles/mui/portal/workspace-styles';

// COMPONENTS
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';

// IMAGES
import uploadIcon from 'assets/uploadIcon.svg';
import Dots from 'assets/Dots.svg';
import skillsIcon from 'assets/skillsIcon.svg';

// Utils
import { jobPostInitialValues } from 'containers/portal/client/workspace/utilities/initialValues';

// COMMON & UTILITIES
import { FIXED, MONTHLY, MONTHLY_BASED } from 'utilities/constants';
import { formatTimeline } from 'utilities/helpers';
import { jobPostingFormSchema } from '../utilities/validationSchema';
import JobPostingSkillsModal from './JobPostingSkillsModal';
import JobPostingFormUploadedFiles from './JobPostingFormUploadedFiles';

function JobPostingForm() {
  // REFERENCING HOOKS
  const theme = useTheme();
  const { state } = useLocation();
  const navigate = useNavigate();

  // STATE HOOKS
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // REF HOOKS
  const fieldArrayReplaceHelperRef = useRef(null);
  const uploadFilesInputRef = useRef(null);
  const formikRef = useRef(null);

  // API HOOK
  const [createJob, { error, isSuccess: createJobSuccess, isLoading: createJobLoading }] = useCreateJobPostMutation();
  const [renewJobPost, { error: renewJobError, isSuccess: renewJobSuccess, isLoading: renewJobLoading }] = useRenewJobPostMutation();

  // CUSTOM HOOKS
  useHandleApiResponse(error, createJobSuccess, 'Job Post Created Successfully!');
  useHandleApiResponse(renewJobError, renewJobSuccess, 'Job renewed Successfully!');

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.primary.main;
  const darkGrey = colors.grey.dark;

  // HANDLER FUNCTIONS
  const toggleSkillsModal = () => {
    setIsSkillsModalOpen(!isSkillsModalOpen);
  };

  const handleUploadFiles = (e, values, setFieldValue) => {
    const files = [...e.target.files];

    if (values.attachments?.length > 0) {
      setFieldValue('attachments', [...values.attachments, ...files]);
    } else {
      setFieldValue('attachments', files);
    }
  };

  const handleEditSkill = (item, idx) => {
    setSelectedSkill({ ...item, index: idx });
    setIsSkillsModalOpen(true);
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (formikRef) {
      formikRef.current?.setFieldValue('title', state?.workspaceDetail?.title);
    }
  }, [formikRef, state]);

  // CONSTANTS
  const workspaceId = state?.workspaceDetail?.workspaceId;
  const isCreateNewJobInWorkspace = Boolean(workspaceId);

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={jobPostInitialValues}
      validationSchema={jobPostingFormSchema}
      onSubmit={async (values, { resetForm }) => {
        const body = { ...values, workspace: workspaceId };

        if (isCreateNewJobInWorkspace) {
          await renewJobPost(body);
        } else {
          await createJob(body);
        }

        goBack();
        resetForm();
      }}
    >
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
        <Form className="px-4">
          {/* JOB POSTING TITLE ROW */}
          <Box className="my-4 d-flex flex-wrap flex-md-nowrap align-items-start justify-content-between">
            <Box className="col-12 col-md-4 pt-0">
              <Typography variant="dashboardCaption" className="weight-500">
                Workspace Title
              </Typography>
            </Box>

            <Box className="col-12 col-md-8 pt-0">
              <FormikField
                name="title"
                placeholder="Title"
                fullWidth
                wordsCounter
                maxWords={80}
                disabled={isCreateNewJobInWorkspace}
              />
            </Box>
          </Box>

          {/* SKILLS ROW */}
          <Box className="my-4">
            <Box className="d-flex flex-wrap flex-md-nowrap align-items-start justiy-content-between">
              <Box className="col-12 col-md-4 d-flex mt-2 pt-0">
                <Typography variant="dashboardCaption" className="weight-500">
                  Tasks
                </Typography>

                <img src={skillsIcon} alt="" className="ms-1" />
              </Box>

              {/* SKILLS ITEMS ROWS */}
              <FieldArray name="skills">
                {({ replace, remove }) => (
                  <Box className="col-12 col-md-8 pt-0">
                    {values.skills?.length > 0
                      && values.skills.map((item, idx) => {
                        const budgetLabel = item.budget_type === MONTHLY_BASED ? MONTHLY : FIXED;

                        fieldArrayReplaceHelperRef.current = replace;

                        return (
                          <Box
                            className={`${styles.skillsContainer} d-flex flex-wrap align-items-start py-2 mt-2 px-1 px-lg-4 px-md-4`}
                            key={item?.id || item?.uId}
                          >
                            <Box className="col-12 col-xl-7 pt-0">
                              <Typography variant="dashboardh5" className="weight-500">
                                {`I need ${item?.subCategoryLabel || item?.subcategory_label}`}
                              </Typography>

                              <Stack direction="row" className="d-flex flex-wrap">
                                {item.specializations?.map(tag => (
                                  <Chip
                                    key={tag.id}
                                    label={tag.name}
                                    variant="outlined"
                                    className="me-2 p-1 mt-1 mt-lg-0"
                                  />
                                ))}
                              </Stack>
                            </Box>

                            <Box className="col-12 col-xl-5 d-flex justify-content-between mt-2 mt-lg-0">
                              <Box className="d-flex flex-wrap flex-sm-nowrap justify-content-between">
                                <Box className="col-12 col-sm d-flex flex-column justify-content-between me-0 me-sm-2">
                                  <Typography variant="caption" className="weight-600 " color={darkPurple}>
                                    ${item.budget_amount}
                                  </Typography>

                                  <Typography variant="caption" className="weight-600 " color={darkGrey}>
                                    {budgetLabel}
                                  </Typography>
                                </Box>

                                <Box className="col-12 col-sm-auto d-flex flex-column justify-content-between">
                                  <Typography variant="caption" className="weight-600 " color={darkPurple}>
                                    {`${formatTimeline(item.timeline, item.budget_type)}`}
                                  </Typography>

                                  <Typography variant="caption" className="weight-600 " color={darkGrey}>
                                    Time
                                  </Typography>
                                </Box>
                              </Box>

                              {/* ACTION BOX */}
                              {item?.is_open && (
                                <Box className="dropdown dropdown-menu-end">
                                  <Box
                                    className={`d-flex align-items-center h-100 dropdown-toggle ${styles.dotsIcon}`}
                                    id="skillMenu"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <img src={Dots} alt="" />
                                  </Box>

                                  <List className="dropdown-menu" aria-labelledby="skillMenu">
                                    <ListItemButton
                                      onClick={() => handleEditSkill(item, idx)}
                                      className="dropdown-item"
                                    >
                                      Edit
                                    </ListItemButton>

                                    <ListItemButton onClick={() => remove(idx)} className="dropdown-item">
                                      Delete
                                    </ListItemButton>
                                  </List>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        );
                      })}
                  </Box>
                )}
              </FieldArray>
            </Box>
          </Box>

          {/* ADD SKILLS BUTTON BOX */}
          <Box className="col-12 col-md-8 pt-0 ms-auto">
            <CardActionArea onClick={toggleSkillsModal} className="mb-3">
              <Box
                className="d-flex flex-column align-items-center justify-content-center py-3"
                sx={{
                  ...jobPostingFormAddSkillButtonStyles,
                  borderColor: errors.skills && touched.skills ? '#ff0000' : '#ebe4e7',
                }}
              >
                <Box className="text-center">
                  <Typography variant="caption" className="weight-600">
                    Add Skills
                  </Typography>
                </Box>

                <Box className="text-center">
                  <Typography variant="caption1" className="weight-500">
                    Create corporate account to mane users
                  </Typography>
                </Box>
              </Box>
            </CardActionArea>

            <JobPostingSkillsModal
              replaceHelper={fieldArrayReplaceHelperRef.current}
              selected={selectedSkill}
              setSelected={setSelectedSkill}
              isOpen={isSkillsModalOpen}
              handleToggle={toggleSkillsModal}
            />
          </Box>

          {/* DESCRIPTION ROW */}
          <Box className="my-4 d-flex align-items-start justify-content-end">
            <Box className="col-12 col-md-4 pt-0">
              <Typography variant="dashboardCaption" className="weight-500">
                Description
              </Typography>
            </Box>

            <Box className="col-12 col-md-8 pt-0">
              <FormikField
                type="textarea"
                name="description"
                className={styles.textAreaInput}
                fullWidth
                wordsCounter
                maxWords={1000}
              />
            </Box>
          </Box>

          {/* INPUT FILE BOX ROW */}
          <Box className="col-12 col-md-8 d-flex align-items-center flex-wrap my-4 ms-auto">
            <Box className="me-2">
              <input
                ref={uploadFilesInputRef}
                hidden
                multiple
                type="file"
                onChange={e => handleUploadFiles(e, values, setFieldValue)}
              />

              <Button
                sx={{ borderColor: errors.attachments && touched.attachments && '#ff0000 !important' }}
                variant="contained"
                component="span"
                className={`${styles.uploadBtn} py-2 px-5`}
                onClick={() => uploadFilesInputRef.current.click()}
              >
                <Box className="d-flex">
                  <img src={uploadIcon} alt="" className="me-2" />

                  <Typography variant="caption1" className="weight-500">
                    Attach File
                  </Typography>
                </Box>
              </Button>
            </Box>

            <Typography variant="caption2" className="weight-500" color={darkGrey}>
              Maximum Size 40mb
            </Typography>
          </Box>

          {/* UPLOADED FILES BOX */}
          <JobPostingFormUploadedFiles name="attachments" />

          <Divider className="divider mt-4" />

          {/* FOOTER WITH ACTION BUTTONS */}
          <Box className="mt-0 py-3 d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-end align-items-center">
            <Button onClick={goBack} className="px-lg-4 px-md-3 px-sm-1 py-2 me-1">
              <Typography variant="body1" color={darkPurple}>
                Cancel
              </Typography>
            </Button>

            <SubmitButton
              className="px-5 py-2"
              color="secondary"
              variant="contained"
              title="Post"
              isLoading={isSubmitting || createJobLoading || renewJobLoading}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default JobPostingForm;
