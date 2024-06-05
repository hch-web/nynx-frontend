import { linearProgressClasses } from '@mui/material';
import { colors } from 'styles/common/colors';

const { lightOrange, lightYellow } = colors;

export const linearProgressBarStyles = {
  height: '10px',
  width: '100%',
  borderRadius: '5px',
  background: lightYellow,
  [`& .${linearProgressClasses.bar}`]: { background: lightOrange, borderRadius: '5px' },
};

export const test = '';
