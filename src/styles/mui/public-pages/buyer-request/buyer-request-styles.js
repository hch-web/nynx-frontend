export const buyerRequestContainerStyles = { backgroundColor: '#fff', borderRadius: '10px' };

export const requestDescriptionStyles = { textAlign: 'justify' };

export const taskContainerStyles = { border: '1px solid #ECE9EB' };

export const chipStyles = { fontSize: '12px', height: '22px' };

export const buyerRequestOfferModalStyles = {
  width: '1200px',
  position: 'absolute',
  maxWidth: '100%',
  top: '50%',
  left: '50%',
  translate: '-50% -50%',
  outline: 'none',
  border: 'none',
  borderRadius: '10px',
  height: '80vh',
  overflow: 'hidden',
  '@media screen and (max-width: 991px)': {
    width: '100vw',
  },
};

export const formToggleButtonsStyles = {
  borderRadius: '10px !important',
  borderColor: 'rgb(204, 207, 205) !important',
  background: '#fbf9fa',
  width: '100%',
  '&:hover': { background: '#fbf9fa' },
  '&.Mui-selected': {
    background: '#fff6f2',
    borderColor: '#FEA87E !important',
    '&:hover': { background: '#fff6f2', borderColor: '#FEA87E !important' },
  },
};

export const buyerRequestGigSelectFieldStyles = {
  backgroundSize: 'cover !important',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '80px',
  height: '60px',
  borderRadius: '10px',
  '@media screen and (max-width: 580px)': { width: '300px', height: '150px', maxWidth: '100%' },
};
