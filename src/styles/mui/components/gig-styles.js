export const gigContainerStyles = { width: '98%', position: 'relative' };

export const gigDummyCardStyles = {
  width: '100%',
  maxWidth: '100%',
  background: '#fff6ec',
  cursor: 'pointer',
  '@media screen and (max-width: 450px)': { maxWidth: '330px' },
};

export const recomendedProjectCardStyles = {
  width: '100%',
  maxWidth: '100%',
  cursor: 'pointer',
  '@media screen and (max-width: 450px)': { maxWidth: '330px' },
};

export const gigCardStyles = {
  width: '100%',
  maxWidth: '100%',
  cursor: 'pointer',
  '@media screen and (max-width: 450px)': { maxWidth: '330px' },
};

export const gigTitlteStyles = {
  paddingBottom: '5px',
  whiteSpace: 'pre-line',
  overflowWrap: 'break-word',
  height: '53px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',

  '@media screen and (max-width: 768px)': {
    height: '45px',
  },
};

export const delectIconStyles = {
  background: '#F2F0F2',
  '&:hover': {
    background: '#FFFFFF',
  },
};

export const kebabMenuIconStyles = {
  background: '#F2F0F2',
  '&:hover': {
    background: '#fff1e2',
  },
};

export const deleteButtonStyles = { position: 'absolute', right: '10px', top: '12px', zIndex: 10 };

export const DraftLabelStyles = {
  position: 'absolute',
  left: '10px',
  top: '12px',
  backgroundColor: '#fff',
  padding: '5px',
  zIndex: 10,
};

export const gigAvatarStyles = {
  width: '40px',
  height: '40px',
};

export const gigCoverImageStyles = {
  backgroundSize: 'cover',
  width: '100%',
  height: '200px',
  clipPath: 'ellipse(100% 65% at 51% 35%)',
};

export const gigNotReviewAvailableStyles = {
  visibility: 'hidden',
};
