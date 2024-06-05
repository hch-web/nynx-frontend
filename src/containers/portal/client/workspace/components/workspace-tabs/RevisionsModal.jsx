import React, { useRef } from 'react';
import { Box, Modal, Typography, Stack, Button, Divider, useTheme, Card, IconButton } from '@mui/material';
import { FieldArray, Form, Formik } from 'formik';
import propTypes from 'prop-types';
import { Close } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

// API HOOKS
import { useRequestRevisionMutation } from 'services/private/task-details';

// STYLES
import { taskDetailsGeneralModalStyles } from 'styles/mui/portal/workspace-styles';

// UTILITIES & COMPONENTS
import SubmitButton from 'containers/common/components/SubmitButton';
import FormikField from 'shared/components/form/FormikField';
import { setIconByFileType } from 'utilities/helpers';
import { taskDeliveryModalInitVal } from '../../utilities/initialValues';
import { taskDeliveryModalValSchema } from '../../utilities/validationSchema';

function RevisionsModal({ isOpen, handleToggle, selectedDeliverable, setSelected }) {
  const theme = useTheme();
  const inputRef = useRef(null);
  const formikRef = useRef(null);

  // API HOOKS
  const [requestRevision, { isLoading }] = useRequestRevisionMutation();

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // HANDLER FUNCTIONS
  const handleUploadFiles = e => {
    const files = [...e.target.files];
    const { setFieldValue, values } = formikRef.current;

    const modifiedFiles = files.map(file => {
      // eslint-disable-next-line no-param-reassign
      file.id = uuidv4();

      return {
        file,
      };
    });

    if (values.attachments?.length > 0) {
      setFieldValue('attachments', [...values.attachments, ...modifiedFiles]);
    } else {
      setFieldValue('attachments', modifiedFiles);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleToggle}>
      <Box sx={taskDetailsGeneralModalStyles}>
        <Formik
          innerRef={formikRef}
          initialValues={taskDeliveryModalInitVal}
          validationSchema={taskDeliveryModalValSchema}
          onSubmit={async values => {
            const payload = { ...values, task_deliverable: selectedDeliverable };

            await requestRevision(payload);

            handleToggle();

            setSelected(null);
          }}
        >
          {({ isSubmitting, values, errors }) => (
            <Form>
              {/* HEADER WITH BUTTONS */}
              <Box className="px-4 py-2 d-flex align-items-center justify-content-between">
                <Typography variant="h6" className="fw-600" color={darkPurple}>
                  Revisions
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Button onClick={handleToggle}>Cancel</Button>

                  <SubmitButton
                    title="Send"
                    variant="contained"
                    color="secondary"
                    className="px-4 py-2"
                    isLoading={isSubmitting || isLoading}
                  />
                </Stack>
              </Box>

              <Divider light />

              {/* BODY */}
              <Box className="px-4 py-2">
                {/* REMARKS INPUT FIELD */}
                <Box>
                  <Typography variant="body1">Remarks</Typography>

                  <FormikField type="textarea" name="remarks" fullWidth />
                </Box>

                {/* UPLOAD FILE ACTION BUTTON */}
                <Box className="d-flex align-items-center gap-3">
                  <Button
                    sx={{ borderColor: errors.attachments ? 'red !important' : '#ebe4e7' }}
                    onClick={() => inputRef.current?.click()}
                    variant="attachFile"
                  >
                    Attach Files
                  </Button>

                  <Typography variant="body2" className="text-muted">
                    Maximum Size 40mb
                  </Typography>

                  <input multiple onChange={handleUploadFiles} type="file" hidden ref={inputRef} />
                </Box>

                {/* FILES LIST BOX WRAPPER */}
                <FieldArray name="attachments">
                  {({ remove }) => (
                    <Box className="d-flex flex-wrap align-items-center gap-3 py-3">
                      {values.attachments?.map((item, index) => (
                        <Card key={item.file.id} className="d-flex align-items-center p-2 gap-2">
                          <img src={setIconByFileType(item?.file?.type)} alt="file-icon" />

                          <Box className="d-flex align-items-center gap-2">
                            <Box>
                              <Typography variant="body2" className="fw-500">
                                {item.file.name}
                              </Typography>

                              <Typography variant="body2" className="text-muted">
                                {item.file.size}
                              </Typography>
                            </Box>

                            <Box>
                              <IconButton onClick={() => remove(index)} className="p-1 rounded">
                                <Close sx={{ fontSize: '13px', color: 'red' }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </Card>
                      ))}
                    </Box>
                  )}
                </FieldArray>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

RevisionsModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleToggle: propTypes.func.isRequired,
  selectedDeliverable: propTypes.number,
  setSelected: propTypes.func.isRequired,
};

RevisionsModal.defaultProps = {
  selectedDeliverable: null,
};

export default RevisionsModal;
