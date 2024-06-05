import { HOVER_PEACH_COLOR } from 'utilities/constants';

export const proposalMainContainerStyles = { overflowX: 'auto', width: '100%' };

export const proposalBodyStyles = {
  width: '100%',
  color: 'initial',
  '@media screen and (max-width: 1100px)': { width: '1100px' },
  '&:hover': {
    background: HOVER_PEACH_COLOR,
    color: 'initial',
  },
};

export const proposalGigImageStyles = { width: '90px', height: '50px', backgroundSize: 'cover' };

export const ClientProfileImageStyles = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundSize: 'cover',
};
