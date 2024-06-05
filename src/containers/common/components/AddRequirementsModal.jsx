import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Divider, IconButton, Modal, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { FieldArray, Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import { Close } from '@mui/icons-material';
import { v4 } from 'uuid';

// API HOOKS
import { useGetGigRequirementsQuery } from 'services/private/task-details';
import { useSendRequirementsMutation } from 'services/private/requirements';

// STYLES
import {
  closeIconButtonStyles,
  modalBoxWrapperStyles,
} from 'styles/mui/components/requirements-modal-styles';

// COMPONENTS & UTILITIES
import FormikField from 'shared/components/form/FormikField';
import { setIconByFileType } from 'utilities/helpers';
import SubmitButton from './SubmitButton';

function AddRequirementsModal({ isOpen, handleClose, gigId, isPaymentDone }) {
  const fileInputRef = useRef(null);
  const formikRef = useRef(null);
  const navigate = useNavigate();

  // STATE HOOKS
  const [initValues, setInitValues] = useState({ requirements: [] });
  const [selectedIndex, setSelectedIndex] = useState(null);

  // API HOOKS
  const { data: gigRequirements } = useGetGigRequirementsQuery(gigId, { skip: !gigId });
  const [sendRequirements, { isLoading }] = useSendRequirementsMutation();

  useEffect(() => {
    if (gigRequirements) {
      setInitValues({ requirements: gigRequirements });
    }
  }, [gigRequirements]);

  // HANDLERS
  const handleUploadAttachments = (e, replace) => {
    const modifiedFiles = [...e.target.files]?.map(item => ({ file: item, id: v4() }));

    const previousValues = formikRef.current?.values?.requirements[selectedIndex];

    replace(selectedIndex, { ...previousValues, attachments: modifiedFiles });

    setSelectedIndex(null);
  };

  const handleDeleteAttachments = (fileId, idx, replace) => {
    const previousValues = formikRef.current?.values?.requirements[idx];
    const filteredAttachments = previousValues?.attachments?.filter(item => item.id !== fileId);

    replace(idx, { ...previousValues, attachments: filteredAttachments });
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalBoxWrapperStyles}>
        <Formik
          enableReinitialize
          innerRef={formikRef}
          initialValues={initValues}
          onSubmit={async values => {
            const sendResp = await sendRequirements(values || []);

            if (sendResp.data && isPaymentDone) {
              handleClose();

              navigate('/', { replace: true });
            }
          }}
        >
          <Form>
            {/* HEADER */}
            <Box className="d-flex align-items-center justify-content-between px-4 p-2">
              <Typography variant="h6" className="fw-500">
                Add Requirements
              </Typography>

              <Box className="d-flex align-items-center gap-3">
                <Button variant="muted" className="px-4 py-2" onClick={handleClose}>
                  Skip
                </Button>

                <SubmitButton
                  variant="contained"
                  color="secondary"
                  className="px-4 py-2"
                  title="Save"
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              </Box>
            </Box>

            <Divider light />

            <Box className="px-4 p-2 overflow-auto" sx={{ maxHeight: '500px' }}>
              <FieldArray name="requirements">
                {({ form, replace }) => (
                  <ol className="ps-3">
                    {form?.values?.requirements?.map((item, idx) => (
                      <li key={item?.id} className="ps-2 mb-4 fw-500">
                        <Box>
                          <Typography className="fw-500" variant="body1">
                            {item?.requirement}
                          </Typography>

                          <FormikField
                            name={`requirements[${idx}].description`}
                            type="text"
                            placeholder="type description..."
                            fullWidth
                          />

                          <input
                            ref={fileInputRef}
                            type="file"
                            hidden
                            multiple
                            onChange={e => handleUploadAttachments(e, replace)}
                          />

                          <Box className="d-flex gap-2 my-2">
                            {item?.attachments?.map(attachment => (
                              <Box className="position-relative" key={attachment?.id}>
                                <img
                                  src={setIconByFileType(attachment?.file?.type || '')}
                                  alt={attachment?.file?.type || ''}
                                />

                                <IconButton
                                  onClick={() => handleDeleteAttachments(attachment?.id, idx, replace)}
                                  className="bg-danger bg-opacity-75"
                                  sx={closeIconButtonStyles}
                                >
                                  <Close className="text-white" sx={{ fontSize: '10px' }} />
                                </IconButton>
                              </Box>
                            ))}
                          </Box>

                          <Button
                            onClick={() => {
                              setSelectedIndex(idx);
                              fileInputRef.current?.click();
                            }}
                            variant="file"
                          >
                            Attach
                          </Button>
                        </Box>
                      </li>
                    ))}
                  </ol>
                )}
              </FieldArray>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
}

AddRequirementsModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  isPaymentDone: propTypes.bool.isRequired,
  gigId: propTypes.number,
};

AddRequirementsModal.defaultProps = {
  gigId: null,
};

export default AddRequirementsModal;
