export const visitedGigCardContainerStyles = {
  width: '100%',
  maxWidth: '100%',
  cursor: 'pointer',
  '@media screen and (max-width: 450px)': { maxWidth: '330px' },
  '&:hover': {
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px',
  },
};

export const arrowStyles = {
  position: 'absolute',
  top: '20px',
  background: '#FFFFFF',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
};

export const descriptionStyles = {
  paddingBottom: '5px',
  '@media screen and (min-width: 1200px)': { height: '48px' },
  '@media screen and (min-width: 768px) and (max-width: 1200px)': { height: '72px' },
  '@media screen and (max-width: 450px)': {
    paddingBottom: '10px',
  },
};

export const avatarStyles = { width: 40, height: 40 };
