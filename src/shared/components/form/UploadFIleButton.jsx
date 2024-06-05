import React, { useRef } from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { buttonErrorStyles } from 'styles/mui/components/upload-file-styles';

function UploadFIleButton({ formValues, setFieldValue, fieldName }) {
  const uploadFileRef = useRef(null);

  const { errors, touched } = useFormikContext();

  const isError = Boolean(errors[fieldName]);
  const isTouched = Boolean(touched[fieldName]);

  const handleUploadFile = event => {
    const files = [...event.target.files];

    if (formValues[fieldName]?.length > 0) {
      setFieldValue(fieldName, [...formValues[fieldName], ...files]);
    } else {
      setFieldValue(fieldName, files);
    }
  };

  return (
    <>
      <input ref={uploadFileRef} type="file" multiple hidden onChange={handleUploadFile} />
      <Button
        variant="file"
        className="py-3"
        onClick={() => uploadFileRef?.current?.click()}
        sx={isError && isTouched ? buttonErrorStyles : {}}
      >
        Add File
      </Button>
    </>
  );
}

UploadFIleButton.propTypes = {
  formValues: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
};
export default UploadFIleButton;
