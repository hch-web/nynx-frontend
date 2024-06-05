import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

// API HOOKS & STYLES
import { useGetCategoriesListQuery } from 'services/public/asset';
import {
  arrowIconLeftStyles,
  arrowIconRightStyles,
  navbarMainContainerBoxStyles,
  scrollBodyWrapperStyles,
  arrowIconsStyles,
  navbarContainerWrapperStyles,
  navItemsTypographyStyles,
} from 'styles/mui/components/categories-navbar-styles';

function CategoriesNavbar() {
  const mainContainer = useRef(null);
  const { pathname } = useLocation();

  const [scroll, setScroll] = useState(0);
  const { palette: colors } = useTheme();
  const paleOrange = colors.paleOrange.main;
  const lightOrange = colors.lightOrange.main;
  const darkPurple = colors.darkPurple.main;
  const yellow = colors.yellow.main;

  // API HOOKS
  const { data } = useGetCategoriesListQuery();

  useEffect(() => {
    mainContainer.current?.addEventListener('scroll', () => {
      const hiddenScroll = mainContainer.current.scrollLeft;
      const totalScrollWidth = mainContainer.current.scrollWidth - mainContainer.current.clientWidth;
      setScroll(hiddenScroll / totalScrollWidth);
    });

    return () => {
      mainContainer.current?.removeEventListener('scroll', () => {});
    };
  }, [mainContainer]);

  const handleLeftClick = () => {
    mainContainer.current.scrollLeft -= 200;
  };

  const handleRightClick = () => {
    mainContainer.current.scrollLeft += 200;
  };

  // constants
  const isDesktopNavView = pathname.includes('/services-test');
  const isAboutPage = pathname === '/about';
  const arrowBoxColor = isAboutPage ? lightOrange : darkPurple;
  const arrowIconColor = isAboutPage ? darkPurple : 'white';
  const shadowColor = isAboutPage ? 'rgb(254 168 126 / 30%)' : false;

  return (
    <Box
      sx={{ ...navbarContainerWrapperStyles(isAboutPage), background: isAboutPage ? lightOrange : '#44263A' }}
    >
      <Box className={`${isDesktopNavView ? 'desktop-container mx-auto ' : 'py-1 px-3'}`}>
        <Box
          className="pe-4 ps-2 h-100"
          sx={{
            ...arrowIconLeftStyles(arrowBoxColor, shadowColor),
            display: scroll === 0 ? 'none' : 'block',
          }}
          onClick={handleLeftClick}
        >
          <ArrowBackIos sx={{ ...arrowIconsStyles(arrowIconColor) }} />
        </Box>

        <Box sx={scrollBodyWrapperStyles} ref={mainContainer} id="mainContainer">
          <Box sx={{ ...navbarMainContainerBoxStyles, background: isAboutPage ? lightOrange : '#44263A' }}>
            <Box className="d-flex align-items-center justify-content-between w-100">
              {data?.categories?.slice(0, 7)?.map(item => (
                <Link to={item?.route || '#'} className="text-decoration-none" key={item.id}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isAboutPage ? darkPurple : paleOrange,
                      ...navItemsTypographyStyles(isAboutPage ? 'white' : yellow),
                    }}
                  >
                    {item?.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          className="ps-4 pe-2 h-100"
          sx={{
            ...arrowIconRightStyles(arrowBoxColor, shadowColor),
            display: scroll === 1 ? 'none' : 'block',
          }}
          onClick={handleRightClick}
        >
          <ArrowForwardIos sx={{ ...arrowIconsStyles(arrowIconColor) }} />
        </Box>
      </Box>
    </Box>
  );
}

export default CategoriesNavbar;
