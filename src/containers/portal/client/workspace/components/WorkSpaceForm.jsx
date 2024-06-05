import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// API & CUSTOM HOOKS
import {
  useCreateWorkspaceMutation,
  useGetWorkspaceQuery,
  useUpdateWorkspaceMutation,
} from 'services/private/workspace/workspace';
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// COMPONENTS
import SubmitButton from 'containers/common/components/SubmitButton';
import FormikField from 'shared/components/form/FormikField';
import { createWorkspaceValSchema } from '../utilities/validationSchema';
import { workspaceFormInitialValues } from '../utilities/initialValues';

function WorkSpaceForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  // STATES HOOKS
  const [initValues, setInitValues] = useState(workspaceFormInitialValues);

  // EDITING CONSTANT
  const isEditing = pathname.includes('edit');

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.primary.main;

  // API HOOKS
  const [createWorkspace, { isLoading, isSuccess: workspaceCreated, error: workspaceCreateError }] = useCreateWorkspaceMutation();
  const { data: workspaceData } = useGetWorkspaceQuery(id, { skip: !id });
  const [updateWorkspace] = useUpdateWorkspaceMutation();

  // ERROR HANDLER CUSTOM HOOK
  useHandleApiResponse(workspaceCreateError, workspaceCreated, 'Workspace created successfully!');

  // EFFECT
  useEffect(() => {
    if (isEditing) {
      setInitValues({
        title: workspaceData?.title || '',
        description: workspaceData?.description || '',
        budget: workspaceData?.budget || '',
      });
    }
  }, [isEditing]);

  // HANDLER FUNCTIONS
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      validationSchema={createWorkspaceValSchema}
      onSubmit={async (values, { resetForm }) => {
        const body = { ...values, id };
        if (isEditing) {
          await updateWorkspace(body);
          goBack();
        } else {
          await createWorkspace(values);
          resetForm(values);
          goBack();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="px-4">
          {/* JOB POSTING TITLE ROW */}
          <Box className="my-4 d-flex align-items-start justify-content-between">
            <Box className="col-3 col-md-4 pt-0">
              <Typography variant="dashboardCaption" className="weight-500">
                Workspace Title
              </Typography>
            </Box>

            <Box className="col-9 col-md-8 pt-0">
              <FormikField name="title" placeholder="Title" fullWidth wordsCounter maxWords={80} />
            </Box>
          </Box>

          {/* DESCRIPTION ROW */}
          <Box className="my-4 d-flex align-items-start justify-content-end">
            <Box className="col-3 col-md-4 pt-0">
              <Typography variant="dashboardCaption" className="weight-500">
                Description
              </Typography>
            </Box>

            <Box className="col-9 col-md-8 pt-0">
              <FormikField
                type="textarea"
                name="description"
                placeholder="Description"
                fullWidth
                wordsCounter
                maxWords={1000}
              />
            </Box>
          </Box>

          {/* BUDGET ROW */}
          <Box className="my-4 d-flex align-items-start justify-content-end">
            <Box className="col-3 col-md-4 pt-0">
              <Typography variant="dashboardCaption" className="weight-500">
                Budget
              </Typography>
            </Box>

            <Box className="col-9 col-md-8 pt-0">
              <FormikField type="price" name="budget" placeholder="0" fullWidth />
            </Box>
          </Box>

          <Divider className="divider mt-4" />

          <Box className="mt-0 py-3 d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-end align-items-center">
            <Button className="px-lg-4 px-md-3 px-sm-1 py-2 me-1" onClick={goBack}>
              <Typography variant="body1" color={darkPurple}>
                Cancel
              </Typography>
            </Button>

            <SubmitButton
              color="secondary"
              variant="contained"
              title={isEditing ? 'Update' : 'Create'}
              isLoading={isLoading || isSubmitting}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default WorkSpaceForm;
