import tip from 'assets/tip2.svg';
import prevousTip from 'assets/prevoiusTip.svg';

export const tabsStyles = {
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
    '@media screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 30px',
    },
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
};

export const sectionLoaderStyles = {
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const tabStyles = {
  '&.Mui-selected': {
    opacity: '1',
  },
  background: 'white',
  border: '1px solid #e3dee1',
  borderRadius: '8px',
  padding: '0 16px',
  minHeight: '60px',
  opacity: '0.6',
  textTransform: 'capitalize',
  marginRight: '10px',
  overflow: 'visible',

  '&::after': {
    content: `url(${tip})`,
    position: 'absolute',
    right: '-11px',
    top: '25%',
  },

  '@media screen and (max-width: 768px)': {
    margin: '7px',
    width: '100%',
    maxWidth: '100%',

    '&::after': {
      content: `url(${tip})`,
      position: 'absolute',
      right: '52%',
      bottom: '-47px',
      transform: 'rotate(90deg)',
    },
  },
};

export const previousTabStyles = {
  '&.Mui-selected': {
    opacity: '1',
  },
  background: '#FFE3C5',
  border: '1px solid #e3dee1',
  borderRadius: '8px',
  padding: '0 16px',
  minHeight: '60px',
  textTransform: 'capitalize',
  marginRight: '10px',
  overflow: 'visible',
  color: 'black !important',
  opacity: '1 !important',

  '&::after': {
    content: `url(${prevousTip})`,
    position: 'absolute',
    right: '-11px',
    top: '25%',
  },

  '@media screen and (max-width: 768px)': {
    margin: '7px',
    width: '100%',
    maxWidth: '100%',

    '&::after': {
      content: `url(${prevousTip})`,
      position: 'absolute',
      right: '52%',
      bottom: '-47px',
      transform: 'rotate(90deg)',
    },
  },
};

export const addCuatomButtonStyles = {
  background: '#fbf9fa',
  border: '1px dashed #e8e4e7',
  borderRadius: '5px',
  fontSize: '12px',
  color: '#9c8c96',
  cursor: 'pointer',
};
