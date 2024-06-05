import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useField } from 'formik';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import propTypes from 'prop-types';

// UTILITIES & STYLES
import 'styles/components/text-editor.scss';
import { textEditorConfig } from 'utilities/config';

function FormikTextEditor({ name, disabled }) {
  const [innerValue, setInnerValue] = useState('');

  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  useEffect(() => {
    if (value !== null || value !== undefined) {
      setInnerValue(value);
    }
  }, [value]);

  const handleChange = useCallback(
    (e, editor) => {
      const data = editor?.data?.get();
      setValue(data);
    },
    [value]
  );

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, [value]);

  return (
    <Box>
      <CKEditor
        editor={ClassicEditor}
        config={textEditorConfig}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        data={innerValue}
      />

      {error && touched && (
        <Typography variant="caption" className="text-danger">
          {error}
        </Typography>
      )}
    </Box>
  );
}

FormikTextEditor.propTypes = {
  name: propTypes.string.isRequired,
  disabled: propTypes.bool,
};

FormikTextEditor.defaultProps = {
  disabled: false,
};

export default FormikTextEditor;
