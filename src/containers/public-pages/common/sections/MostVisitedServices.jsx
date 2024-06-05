import React from 'react';
import { Container, Typography, Box, useTheme } from '@mui/material';
import Slider from 'react-slick';

// styles
import { visitedCardStyles } from 'styles/mui/components/most-visited-services';

// utilites
import { graphicServiceSlider, servicesSliderData } from 'containers/public-pages/utilities/data';

// components
import VisitedGigCard from '../components/VisitedGigCard';

function MostVisitedServices() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const lightPink = colors.lightPink.main;
  return (
    <Box sx={{ background: lightPink }} className="d-flex justify-content-center">
      <Box className="py-5 w-100 container-max-width" sx={visitedCardStyles}>
        <Container variant="public" className="py-0 mb-5">
          <Typography variant="h3" color={darkPurple}>
            People who viewed this service also viewed
          </Typography>
        </Container>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Slider {...graphicServiceSlider}>
          {servicesSliderData.map(item => (
            <VisitedGigCard
              key={item.id}
              image={item.image}
              name={item.name}
              profileLevel={item.profileLevel}
              description={item.description}
              reviews={item.reviews}
              fixedPrice={item.fixedPrice}
              fixedFrom={item.fixedFrom}
              monthlyFrom={item.monthlyFrom}
              priceSection
            />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default MostVisitedServices;
