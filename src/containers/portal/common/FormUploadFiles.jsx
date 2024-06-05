import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import propTypes from 'prop-types';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

// STYLES
import styles from 'styles/portal/client/create-workspace.module.scss';

// UTILITIES
import { setIconByFileType } from 'utilities/helpers';
import { Close } from '@mui/icons-material';

function FormUploadFiles({ name }) {
  // REFERENCING HOOKS
  const theme = useTheme();
  const { values } = useFormikContext();

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  return (
    <FieldArray name={name}>
      {({ remove }) => (
        <Box className="col-12 col-md-4 col-lg-8 mt-2 d-flex flex-wrap my-2 w-100">
          {values.job_offer_attachments?.length > 0
            && values.job_offer_attachments.map((item, idx) => {
              const formatedFileSize = item.size >= 1024
                ? `${Math.round(item.size / 1024)}kb`
                : `${Math.round(item.size / (1024 * 1024))}mb`;

              return (
                <Box key={item.name} className={`${styles.uploadedFile} p-2 me-2 mt-2`}>
                  <Box className="d-flex justify-content-between">
                    <Box className="d-flex">
                      <img src={setIconByFileType(item?.file || item?.type)} alt="file" />

                      <Box className="d-flex flex-column">
                        <Typography variant="dashboardBody" className="weight-500 ms-2" color={darkPurple}>
                          {item.name}
                        </Typography>

                        <Typography variant="dashboardBody" className="weight-500 ms-2" color="#9F919B">
                          {formatedFileSize}
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="d-flex align-items-center ms-3">
                      <IconButton
                        onClick={() => remove(idx)}
                        aria-label="delete"
                        className={styles.cancelButton}
                      >
                        <Close className={styles.cancelBtnText} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      )}
    </FieldArray>
  );
}

FormUploadFiles.propTypes = {
  name: propTypes.string.isRequired,
};

export default FormUploadFiles;
