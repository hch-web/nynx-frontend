import React, { useCallback, useRef } from 'react';
import { useTheme, Typography, Box, Container } from '@mui/material';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// styles
import styles from 'styles/public-pages/homepage/homepage.module.scss';
import { sliderArrowStyles } from 'styles/mui/public-pages/homepage/home-styles';
import { servicesSliderSettings, servicesSliderData } from '../slider-utils/slider-utils';

// Components
import GigCard from '../../common/components/GigCards';

function ServicesProjectContainer() {
  const sliderRef = useRef();
  const { palette } = useTheme();
  const lightYellow = palette.lightYellow.main;

  const handleNext = useCallback(() => {
    sliderRef.current.slickNext();
  }, [sliderRef]);

  const handlePrevious = useCallback(() => {
    sliderRef.current.slickPrev();
  }, [sliderRef]);

  return (
    <Box className="d-flex justify-content-center" sx={{ background: lightYellow }}>
      <Container variant="public">
        <Box className="d-flex align-items-center justify-content-between">
          <Typography
            variant="h2"
            color={palette.darkPurple.main}
            className={`${styles.categoriesHeading} mb-4 mb-sm-5 mb-md-3 mb-lg-5`}
          >
            Get inspired with projects made by our
            <br className="d-none d-sm-none d-md-block" />
            freelancers
          </Typography>

          <Box className="d-flex gap-3 align-items-center">
            <ArrowBackIos sx={sliderArrowStyles} className="pointer" onClick={handlePrevious} />

            <ArrowForwardIos sx={sliderArrowStyles} className="pointer" onClick={handleNext} />
          </Box>
        </Box>

        <Box>
          <Slider ref={sliderRef} {...servicesSliderSettings}>
            {servicesSliderData.map(item => (
              <GigCard
                key={item.name}
                name={item.name}
                image={item.image}
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
      </Container>
    </Box>
  );
}

export default ServicesProjectContainer;
