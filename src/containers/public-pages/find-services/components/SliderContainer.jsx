import React, { useRef } from 'react';
import { Box, Typography, useTheme, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Styles
import styles from 'styles/public-pages/find-services/find-services.module.scss';
import { sliderArrowStyles } from 'styles/mui/public-pages/homepage/home-styles';

// Components
import CategoryCard from '../../common/components/CategoryCard';
import { graphicServiceSlider } from '../utils/slider-utils';

function SliderContainer({ title, subCategories, id }) {
  const sliderRef = useRef();
  const { palette } = useTheme();
  const navigate = useNavigate();
  const darkPurple = palette.darkPurple.main;

  const handleNavigateToSubCategory = subcategory => {
    navigate(`/services/${subcategory?.id}`, {
      state: {
        category: {
          title,
          id,
        },
        subcategory,
      },
    });
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <Box className="my-5" id={`category-${id}`}>
      <Container variant="public" className="py-0 mt-2 mb-3 mb-md-5">
        <Box className="d-flex justify-content-between">
          <Typography variant="h2" color={darkPurple}>
            {title}
          </Typography>

          <Box className="d-flex gap-3 align-items-center">
            <ArrowBackIosIcon sx={sliderArrowStyles} className="pointer" onClick={handlePrevious} />
            <ArrowForwardIosIcon sx={sliderArrowStyles} className="pointer" onClick={handleNext} />
          </Box>
        </Box>
      </Container>

      <Slider ref={sliderRef} className={`${styles.findServicesSliderContainer}`} {...graphicServiceSlider}>
        {subCategories?.map(item => (
          <Box
            onClick={() => handleNavigateToSubCategory(item)}
            className="text-decoration-none"
            key={item.id}
          >
            <CategoryCard image={item.image} title={item.name} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

SliderContainer.propTypes = {
  title: PropTypes.string,
  subCategories: PropTypes.array,
  id: PropTypes.number,
};

SliderContainer.defaultProps = {
  title: '',
  subCategories: [],
  id: 0,
};
export default SliderContainer;
