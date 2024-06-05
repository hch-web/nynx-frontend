import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import propTypes from 'prop-types';

function ReviewBox({
  sender,
  image,
  professionLabel,
  avatarStyles,
  senderTextColor,
  children,
  boxStyles,
}) {
  return (
    <Box className="d-flex align-items-start flex-wrap gap-2 position-relative">
      <Box className="p-3 rounded" sx={boxStyles}>
        <Box className="d-flex gap-2 align-items-center">
          <Typography variant="body2" color={senderTextColor} className="fw-500">
            {sender}
          </Typography>
          <Typography variant="professionLabel">
            {professionLabel}
          </Typography>
        </Box>

        <Box>{children}</Box>
      </Box>

      <Avatar sx={avatarStyles} src={image || ''} alt="" />
    </Box>
  );
}

ReviewBox.propTypes = {
  boxStyles: propTypes.object,
  sender: propTypes.string,
  image: propTypes.string,
  avatarStyles: propTypes.object,
  senderTextColor: propTypes.string,
  professionLabel: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};

ReviewBox.defaultProps = {
  boxStyles: { background: 'white', maxWidth: '220px' },
  sender: '',
  image: '',
  avatarStyles: { border: '1px solid white', position: 'absolute', bottom: '-20px', left: '-20px' },
  senderTextColor: 'black',
};

export default ReviewBox;
