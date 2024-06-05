import React, { useCallback, useMemo, useRef } from 'react';
import { Box, Typography, useTheme, Container } from '@mui/material';
import Slider from 'react-slick';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// COMPONENTS & STYLES & SERVICES
import { useCategoriesListQuery } from 'services/public/home/home';
import styles from 'styles/public-pages/homepage/homepage.module.scss';
import { popularCategoriesStyles, sliderArrowStyles } from 'styles/mui/public-pages/homepage/home-styles';
import 'styles/public-pages/homepage/homepage.scss';
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import { popularCategoriesSliderSettings } from '../slider-utils/slider-utils';
import CategoryCard from '../../common/components/CategoryCard';

function CategoriesContainer() {
  const sliderRef = useRef();
  const { palette } = useTheme();

  const { data: categoriesData, isLoading: categoriesLoading } = useCategoriesListQuery();

  const next = useCallback(() => {
    sliderRef.current.slickNext();
  }, [sliderRef]);

  const previous = useCallback(() => {
    sliderRef.current.slickPrev();
  }, [sliderRef]);

  // constants
  const categories = useMemo(() => categoriesData?.categories, [categoriesData]);
  const categoryMainHeading = useMemo(() => categoriesData?.category_headers?.heading, [categoriesData]);
  const categoriesSubHeading = useMemo(() => categoriesData?.category_headers?.sub_heading, [categoriesData]);

  return categoriesLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public" className="d-flex justify-content-center ">
      <Box className={`${styles.categoriesContainer}  d-flex flex-column justify-content-center w-100`}>
        <Box className="d-flex align-items-center justify-content-between">
          <Typography
            variant="h2"
            color={palette.darkPurple.main}
            className={`${styles.categoriesHeading} mb-4 mb-sm-5 mb-md-3 mb-lg-5`}
          >
            {categoryMainHeading}
            <br className="d-none d-sm-none d-md-block" /> {categoriesSubHeading}
          </Typography>

          <Box className="d-flex gap-3 align-items-center">
            <ArrowBackIosIcon sx={sliderArrowStyles} className="pointer" onClick={previous} />
            <ArrowForwardIosIcon sx={sliderArrowStyles} className="pointer" onClick={next} />
          </Box>
        </Box>

        <Box sx={popularCategoriesStyles}>
          <Slider
            className="slickSliderContainer"
            ref={c => {
              sliderRef.current = c;
            }}
            {...popularCategoriesSliderSettings}
          >
            {categories?.map(item => (
              <CategoryCard title={item?.name} image={item?.image} key={item?.id} id={item?.id} />
            ))}
          </Slider>
        </Box>
      </Box>
    </Container>
  );
}

export default CategoriesContainer;
