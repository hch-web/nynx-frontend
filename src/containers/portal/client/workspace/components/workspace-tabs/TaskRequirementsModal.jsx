import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Card, Divider, IconButton, Modal, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { FieldArray, Form, Formik } from 'formik';

// API HOOKS
import {
  useLazyGetSingleRequirementQuery,
  useUpdateSingleRequirementMutation,
} from 'services/private/requirements';

// STYLES
import { modalBoxWrapperStyles } from 'styles/mui/components/task-requirements-modal-styles';

// FORMIK FIELD
import FormikField from 'shared/components/form/FormikField';
import SubmitButton from 'containers/common/components/SubmitButton';
import { convertURLToFile, formatFileSize, setIconByFileType } from 'utilities/helpers';
import { Close } from '@mui/icons-material';
import { v4 } from 'uuid';

function TaskRequirementsModal({ isOpen, handleClose, isEdit, setIsEdit, selected }) {
  const inputRef = useRef();
  const formikRef = useRef();

  const [initialValues, setInitValues] = useState({ description: '', attachments: [] });

  // API HOOKS
  const [updateRequirement, { isLoading }] = useUpdateSingleRequirementMutation();
  const [requirementData, { data: requirmentData }] = useLazyGetSingleRequirementQuery();

  useEffect(() => {
    if (isEdit) {
      if (formikRef && requirmentData?.attachments?.length > 0) {
        Promise.all(
          requirmentData?.attachments?.map(async item => {
            const convertedFiles = await convertURLToFile(item?.attachment);

            return convertedFiles;
          })
        ).then(convertedFiles => {
          formikRef?.current?.setFieldValue('attachments', convertedFiles);
        });
      }

      setInitValues({ description: requirmentData?.description });
    }
  }, [requirmentData, isOpen]);

  useEffect(() => {
    const getRequirementData = async () => {
      if (selected) {
        await requirementData(selected);
      }
    };

    getRequirementData();
  }, [selected, isOpen]);

  // HANDLERS
  const handleFileUpload = (e, setFieldValue) => {
    const files = [...e.target.files];

    const modifiedFiles = files?.map(item => {
      const fileObj = item;

      fileObj.fileUrl = URL.createObjectURL(item);
      fileObj.id = v4();
      return fileObj;
    });

    const prevArray = formikRef?.current?.values?.attachments;

    if (prevArray?.length > 0) {
      setFieldValue('attachments', [...modifiedFiles, ...prevArray]);
    } else {
      setFieldValue('attachments', modifiedFiles);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={modalBoxWrapperStyles}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          innerRef={formikRef}
          onSubmit={async (values, { resetForm }) => {
            await updateRequirement({ ...values, requirement: requirmentData?.requirement, id: selected });

            if (isEdit) {
              setIsEdit(false);
            }

            handleClose();
            resetForm();
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              {/* HEADER */}
              <Box className="d-flex align-items-center justify-content-between px-4 py-2">
                <Typography variant="h6" className="fw-500">
                  Requirements
                </Typography>

                <Box className="d-flex align-items-center gap-4">
                  <Button onClick={handleClose}>Cancel</Button>

                  <SubmitButton title="Save" className="px-4 py-2" isLoading={isSubmitting || isLoading} />
                </Box>
              </Box>

              <Divider light />

              {/* BODY */}
              <Box className="px-4 py-3">
                <Typography variant="body1" className="fw-500">
                  {requirmentData?.requirement_description}
                </Typography>

                <FormikField
                  name="description"
                  placeholder="Type description..."
                  className="my-3"
                  fullWidth
                />

                <FieldArray name="attachments">
                  {({ remove }) => (
                    <Box className="d-flex align-items-center gap-3 flex-wrap">
                      {values?.attachments?.length > 0
                        && values?.attachments?.map((item, idx) => (
                          <Card className="d-flex align-items-center p-2 gap-2" key={item?.id}>
                            <img src={setIconByFileType(item?.type || item?.file_type)} alt={item?.name} />

                            <Box className="d-flex align-items-center">
                              <Box>
                                <Typography sx={{ fontSize: '12px' }}>
                                  {(item?.name || item?.file_name)?.slice(0, 10)}
                                </Typography>

                                <Typography sx={{ fontSize: '12px' }}>
                                  {formatFileSize(item?.size || item?.file_size)}
                                </Typography>
                              </Box>

                              <IconButton color="red" onClick={() => remove(idx)}>
                                <Close sx={{ fontSize: 15 }} />
                              </IconButton>
                            </Box>
                          </Card>
                        ))}
                    </Box>
                  )}
                </FieldArray>

                <Button variant="file" className="my-3" onClick={() => inputRef?.current?.click()}>
                  Attachments
                </Button>

                <input
                  type="file"
                  hidden
                  multiple
                  ref={inputRef}
                  onChange={e => handleFileUpload(e, setFieldValue)}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

TaskRequirementsModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  isEdit: propTypes.bool,
  handleClose: propTypes.func.isRequired,
  setIsEdit: propTypes.func.isRequired,
  selected: propTypes.number,
};

TaskRequirementsModal.defaultProps = {
  isEdit: false,
  selected: null,
};

export default TaskRequirementsModal;
