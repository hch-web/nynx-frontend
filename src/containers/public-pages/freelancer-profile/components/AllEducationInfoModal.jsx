import React from 'react';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import propTypes from 'prop-types';

// STYLES
import { educationInfoModalStyles } from 'styles/mui/public-pages/freelancer-profile/freelancer-profile-styles';

function AllEducationInfoModal({ isOpen, toggle, educationData }) {
  return (
    <Modal open={isOpen} onClose={toggle}>
      <Box sx={educationInfoModalStyles}>
        <Box className="px-3 py-2 d-flex align-items-center justify-content-between gap-1">
          <Typography variant="h6" fontWeight={500}>
            Education
          </Typography>

          <Button variant="contained" color="secondary" className="px-4 py-2" onClick={toggle}>
            Cancel
          </Button>
        </Box>

        <Divider light />

        <Box className="p-3" sx={{ maxHeight: '500px', overflowY: 'auto' }}>
          <Box className="d-flex flex-column align-items-start gap-3">
            {educationData?.map(item => (
              <Box key={item?.id} className="d-flex flex-column align-items-start gap-1">
                <Typography variant="body1" fontWeight={500}>
                  {item?.title}
                </Typography>

                <Typography variant="body1" className="text-muted">
                  {item?.institute}, Graduated {item?.year}
                </Typography>
              </Box>
            ))}

            {educationData?.length === 0 && (
              <Box>
                <Typography variant="body2">No Record Found!</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

AllEducationInfoModal.propTypes = {
  toggle: propTypes.func.isRequired,
  isOpen: propTypes.bool,
  educationData: propTypes.array,
};

AllEducationInfoModal.defaultProps = {
  isOpen: false,
  educationData: [],
};

export default AllEducationInfoModal;
