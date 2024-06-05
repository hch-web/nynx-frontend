import womenReview from 'assets/womenReview.png';

export const personReviewContainerStyles = {
  '@media screen and (max-width: 768px)': {
    padding: '30px 0px',
    '& .person-review-container': {
      borderRadius: '0px',
    },
  },
};

export const heroSectionBecomeAnExpertStyles = { textTransform: 'initial' };

export const popularCategoriesStyles = {
  '@media only screen and (min-width: 1950px)': {
    padding: '0px 70px',
  },
};

export const aboutMainContainersStyles = {
  '@media only screen and (min-width: 1950px)': {
    padding: '0px 70px !important',
  },
};

export const gridItemImgWrapperSimpleStyles = {
  background: 'none',
  maxWidth: '350px',
  height: '100%',
  borderRadius: '20px',
  overflow: 'hidden',
  '@media screen and (max-width: 1100px)': {
    background: 'none',
    bottom: '0',
    left: '0',
    transform: 'translate(0)',
  },
};

export const gridItemImgWrapperHomeStyles = {
  position: 'absolute',
  background: '#fea87e',
  maxWidth: '350px',
  top: '-30px',
  bottom: '-30px',
  left: '50%',
  transform: 'translate(-50%)',
  borderRadius: '20px',
  overflow: 'hidden',
  '@media screen and (max-width: 1100px)': {
    background: 'none',
    bottom: '0',
    left: '0',
    transform: 'translate(0)',
  },
};

export const gridItemImgStyles = {
  background: `url(${womenReview}) no-repeat left bottom`,
  backgroundSize: 'contain',
  height: '100%',
  width: '100%',
};

export const heroMainImage = {
  width: '500px',
  height: '550px',
  backgroundSize: 'cover',
};

export const buildTeamCardImagesStyles = {
  backgroundSize: 'cover',
  height: '370px',
  width: '100%',
  borderRadius: '10px 0px 0px 10px',
};

export const findWorkContainerImageStyles = {
  backgroundSize: 'cover',
  width: '100%',
  height: '100%',
};

export const freelancerReviewImageStyles = {
  width: '100%',
  height: '100%',
  backgroundSize: 'contain',
};

export const sliderArrowStyles = { color: '#D9CCC8' };
