import React, { useRef } from 'react';
import { Container, Typography, Box, useTheme } from '@mui/material';
import Slider from 'react-slick';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// styles
import { historyCardStyles, historyCardTextStyles } from 'styles/mui/components/browser-history-styles';
import { sliderArrowStyles } from 'styles/mui/public-pages/homepage/home-styles';

// components
import GigCard from './GigCards';
import { graphicServiceSlider, servicesSliderData } from '../utils/utils';

function BrowserHistory() {
  const theme = useTheme();
  const slider = useRef();

  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const lightYellow = colors.lightYellow.main;

  const next = () => {
    slider.current.slickNext();
  };

  const previous = () => {
    slider.current.slickPrev();
  };

  return (
    <Box sx={{ background: lightYellow }} className="d-flex justify-content-center">
      <Box className="py-5 w-100 container-max-width" sx={historyCardStyles}>
        <Container variant="public" className="py-0 mb-3 mb-lg-5 mb-md-5 mb-sm-3" sx={historyCardTextStyles}>
          <Box className="d-flex align-items-center justify-content-between">
            <Typography variant="h3" color={darkPurple}>
              Your Browsing History
            </Typography>
            <Box className="d-flex gap-3 align-items-center">
              <ArrowBackIosIcon sx={sliderArrowStyles} className="pointer" onClick={previous} />
              <ArrowForwardIosIcon sx={sliderArrowStyles} className="pointer" onClick={next} />
            </Box>
          </Box>
        </Container>
        <Slider ref={slider} {...graphicServiceSlider}>
          {servicesSliderData.map(item => (
            <GigCard
              key={item.id}
              image={item.image}
              name={item.name}
              profileLevel={item.profileLevel}
              description={item.description}
              reviews={item.reviews}
              fixedPrice={item.fixedPrice}
              fixedFrom={item.fixedFrom}
              monthlyFrom={item.monthlyFrom}
            />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default BrowserHistory;
