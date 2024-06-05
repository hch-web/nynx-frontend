export const requirementMainContainerStyles = { minHeight: '30vw' };
export const addRequirementModalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'white',
  border: 'none',
  borderRadius: '20px',
  '@media screen and (max-width: 768px)': {
    width: '80vw',
  },
  '@media screen and (max-width: 440px)': {
    width: '100vw',
  },
};

export const addRequirmentButtonStyles = {
  background: '#fbf9fa',
  border: '1px dashed #ebe4e7',
  borderRadius: '5px',
};
