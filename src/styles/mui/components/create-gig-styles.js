export const fieldWidthStyles = {
  '@media screen and (min-width: 540px)': { width: '100%' },
  '@media screen and (max-width: 540px)': { minWidth: 'calc(100vw - 110px)' },
};

export const textStyles = {
  fontFamily: 'Roboto, sans-serif',
};

export const roundedBoxWrapperStyles = {
  background: 'white',
  borderRadius: '8px',
};

export const packagedToggleBoxStyles = {
  borderRadius: '8px',
  border: '1px solid #E8E4E7',
  width: '100%',
  overflowX: 'hidden',
};

export const headerBoxWrapperStyles = {
  background: '#faf9fa',
  borderRadius: '8px',
  border: '1px solid #E8E4E7',
  zIndex: -99,
};

export const bodyBoxWrapperStyles = {
  maxWidth: '100%',
  overflowX: 'scroll',
  '@media screen and (min-width: 1100px)': { overflowX: 'auto' },
};

export const bodyBoxStyles = {
  minWidth: '1200px',
  '@media screen and (min-width: 1100px)': {
    minWidth: '100%',
  },
};

export const customFieldLabelStyles = {
  background: '#fbf9fa',
  border: '1px dashed #e8e4e7',
  borderRadius: '5px',
  color: '#9c8c96',
};

export const monthlyPackagedBoxStyles = { borderRadius: '8px', border: '1px solid #E8E4E7', zIndex: -99 };
