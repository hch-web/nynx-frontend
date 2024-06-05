import React from 'react';
import { Modal, Box, Typography, Stack, Button, Divider } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// API HOOKS
import { useGetWorkspaceQuery, useUpdateWorkspaceMutation } from 'services/private/workspace/workspace';

// COMPONENTS
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';

// STYLES
import { workspaceTitleModalStyles } from 'styles/mui/portal/workspace-styles';
import { workspaceTitleModalValSchema } from '../utilities/validationSchema';

function WorkspaceTitleModalForm({ isOpen, handleToggle }) {
  const { workspaceId } = useParams();

  // API HOOOKS
  const { data: workspaceData } = useGetWorkspaceQuery(workspaceId, { skip: !workspaceId });
  const [updateWorkspace, { isLoading }] = useUpdateWorkspaceMutation();

  const initValues = {
    title: workspaceData?.title || '',
  };

  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box sx={workspaceTitleModalStyles}>
        <Formik
          enableReinitialize
          initialValues={initValues}
          validationSchema={workspaceTitleModalValSchema}
          onSubmit={async values => {
            const body = { ...values, id: workspaceId };
            await updateWorkspace(body);
            handleToggle();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* HEADER */}
              <Box className="d-flex align-items-center justify-content-between px-4 py-2">
                <Typography variant="h6">Title</Typography>

                <Stack direction="row" spacing={1}>
                  <Button onClick={handleToggle}>Cancel</Button>

                  <SubmitButton
                    variant="contained"
                    color="secondary"
                    className="px-4 py-2"
                    title="Update"
                    isLoading={isSubmitting || isLoading}
                  />
                </Stack>
              </Box>

              <Divider light />

              {/* BODY */}
              <Box className="px-4 py-3">
                <FormikField name="title" fullWidth wordsCounter maxWords={80} />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

WorkspaceTitleModalForm.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleToggle: propTypes.func.isRequired,
};

export default WorkspaceTitleModalForm;
