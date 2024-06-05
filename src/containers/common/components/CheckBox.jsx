import React from 'react';
import { Checkbox, styled } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const BpIcon = styled('span')(() => ({
  borderRadius: 3,
  width: '22px',
  height: '22px',
  backgroundColor: '#f6f4f5',
}));

const CheckedIcon = styled(CheckBoxIcon)(({ theme }) => ({
  color: theme.palette.red.main,
  fontSize: '22px',
}));

function CheckBox(props) {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      icon={<BpIcon />}
      checkedIcon={<CheckedIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

export default CheckBox;
