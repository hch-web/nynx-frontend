export const navbarContainerWrapperStyles = isAbout => {
  const borderColor = isAbout ? 'transparent' : '#553947';

  return {
    width: '100%',
    borderTop: `1px solid ${borderColor}`,
    borderBottom: `1px solid ${borderColor}`,
    position: 'relative',
  };
};

export const navbarMainContainerBoxStyles = {
  width: '1400px',
  // background: '#44263A',
  overflow: 'hidden',
  margin: '0 auto',
  '@media screen and (min-width: 1200px)': {
    overflow: 'auto',
    width: '100%',
  },
};

export const scrollBodyWrapperStyles = {
  width: '100%',
  overflowX: 'hidden',
  scrollBehavior: 'smooth',
};

export const arrowIconLeftStyles = (color, shadowColor) => ({
  position: 'absolute',
  top: '50%',
  zIndex: '5',
  left: '0%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  background: `linear-gradient(90deg, ${color}, ${shadowColor || 'rgba(68,38,58,0.3)'})`,
  '@media screen and (min-width: 1200px)': {
    display: 'none',
  },
});

export const arrowIconRightStyles = (color, shadowColor) => ({
  position: 'absolute',
  top: '50%',
  zIndex: '5',
  right: '0%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  background: `linear-gradient(90deg, ${shadowColor || 'rgba(68,38,58,0.3)'}, ${color})`,
  '@media screen and (min-width: 1200px)': {
    display: 'none',
  },
});

export const arrowIconsStyles = color => ({
  fontSize: '18px',
  color,
});

export const navItemsTypographyStyles = () => ({
  // '&:hover': { color },
  userSelect: 'none',
});
