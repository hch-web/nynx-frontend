export const galleryMainContainerStyles = {
  minHeight: '32vw',
};

export const uploadImageGuideCardStyles = {
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  borderRadius: '5px',
};

export const GalleryImagesStyles = {
  borderRadius: '10px',
  maxWidth: '100%',
  backgroundSize: 'cover',
  height: '210px',
  flex: '0 0 auto',
  margin: '5px',
  width: '32%',
  '@media screen and (max-width: 768px)': {
    width: '100%',
    height: '200px',
  },
};

export const infoBoxIconStyles = {
  borderRadius: '50%',
  padding: '5px',
  position: 'relative',
  top: '17px',
};

export const infoCardStyles = {
  width: '90%',
};

export const addImageButtonContainerStyles = {
  borderRadius: '10px',
  width: '32%',
  height: '210px',
  margin: '5px',
  '@media screen and (max-width: 768px)': {
    height: '130px',
    marginBottom: '10px',
  },
};

export const addImageButtonStyles = {
  backgroundColor: '#FbF9Fa',
  borderRadius: '10px',
  height: '100%',
  maxWidth: '100%',
  border: '1px dashed #E8E4E7',
  '@media screen and (min-width: 1200px)': {
    minHeight: '100%',
  },
};

export const delectIconStyles = {
  background: '#F2F0F2',
  '&:hover': {
    background: '#FFFFFF',
  },
};
