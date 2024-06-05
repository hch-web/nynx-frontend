import React from 'react';
import { Container, Typography, Box, useTheme } from '@mui/material';
import Slider from 'react-slick';
import { graphicServiceSlider, servicesSliderData } from 'containers/public-pages/utilities/data';
import GigCard from '../components/GigCards';

function BrowserHistory() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const lightYellow = colors.lightYellow.main;
  return (
    <Box sx={{ background: lightYellow }} className="py-5">
      <Container variant="public" className="py-0 mb-3 mb-lg-5 mb-md-5 mb-sm-3">
        <Typography variant="h3" color={darkPurple}>
          Your Browsing History
        </Typography>
      </Container>
      <Slider
        {...graphicServiceSlider}
      >
        {servicesSliderData.map(item => (
          <GigCard
            key={item?.id}
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
  );
}
export default BrowserHistory;
