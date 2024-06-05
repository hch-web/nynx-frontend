export const mainHomePageStyles = {
  backgroundSize: 'contain',
  height: '100%',
  width: '100%',
};

export const mainContainerTextStyles = {
  '@media screen and (min-width: 1950px)': { padding: '0 !important' },
};

export const valueSectionImageStyles = {
  width: '100%',
  height: '310px',
  backgroundSize: 'contain',
};

export const chipContainerStyles = {
  background: 'white',
  border: '1px solid #E3D6D1',
  '&:hover': {
    background: '#FFF2D0',
    boxShadow: '1px 1px 3px grey',
  },
};

export const pillStyles = {
  '@media screen and (max-width: 570px)': {
    fontSize: '14px',
  },
};

export const indexContainerStyles = { background: 'white', width: '40px', height: '40px' };

export const fontStyles = { opacity: '80%' };

export const valuesContainerFontStyles = { fontSize: '18px', opacity: '0.8' };

export const aboutNynxContainerImageStyles = {
  width: '100%',
  height: '500px',
  backgroundSize: 'cover',
  borderRadius: '15px',
};

export const whyNynxContainerImageStyles = {
  width: '100%',
  height: '300px',
  backgroundSize: 'cover',
  borderRadius: '15px',
  '@media screen and (max-width: 450px)': { height: '200px' },
};
