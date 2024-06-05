import React, { useEffect, useMemo } from 'react';
import { Box, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

// API HOOKS
import { useGetCategoriesAndSubCatgoriesListQuery } from 'services/public/gig/services';

// COMPONENTS & UTILITIES
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import SliderContainer from './SliderContainer';

function Categories() {
  const { state } = useLocation();
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesAndSubCatgoriesListQuery();
  const selectedCategoryId = useMemo(() => state?.categoriesDetails?.selectedCategory, [state]);

  useEffect(() => {
    if (state && categoriesData?.length) {
      const selectCategoryDomElement = document.getElementById(`category-${selectedCategoryId}`);
      selectCategoryDomElement?.scrollIntoView();
    }
  }, [state, categoriesData]);

  return categoriesLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public">
      {categoriesData?.map(element => (
        <SliderContainer
          key={element.id}
          title={element.name}
          subCategories={element.sub_catagories}
          id={element?.id}
        />
      ))}
    </Container>
  );
}

export default Categories;
