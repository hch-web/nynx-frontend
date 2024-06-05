import React, { useEffect } from 'react';
import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

// API HOOKS
import {
  useGetSubCategoryByIdQuery,
  useSingleServicesFaqQuery,
} from 'services/public/single-services/singleServices';
import { useLazyGetSubCategoryGigListQuery } from 'services/public/gig/services';

// COMPONENTS & UTILITIES
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import GigCard from 'containers/public-pages/common/components/GigCards';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import FaqContainer from 'containers/public-pages/common/components/FaqContainer';
import ServiceFilters from './components/ServiceFilters';
import { formatName } from './utililites/helper';

function SingleService() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { subCategoryId } = useParams();
  const userId = useSelector(authState => authState?.auth?.userInfo?.id);

  const [getSingleServiceGigs, { data: gigList, isLoading, isFetching }] = useLazyGetSubCategoryGigListQuery();
  const { data: faqsSectionData, isLoading: faqsSectionDataLoading } = useSingleServicesFaqQuery();
  const { data: serviceData } = useGetSubCategoryByIdQuery(subCategoryId, { skip: !subCategoryId });

  useEffect(() => {
    const getAsyncSingleServiceGigs = async () => {
      await getSingleServiceGigs({ subCategoryId, profile_id: userId });
    };

    getAsyncSingleServiceGigs();
  }, []);

  // Constants
  const category = serviceData?.category_name;
  const serviceName = serviceData?.name || '';
  const mainHeading = faqsSectionData?.main_heading;
  const subHeading = faqsSectionData?.sub_heading;
  const faqTitle = `${serviceName} ${mainHeading}`;
  const faqs = faqsSectionData?.sub_categories_frequently_asked_questions;

  return isLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public">
      <Typography colors={darkPurple} variant="body2">
        {category} &gt; {serviceName}
      </Typography>

      <Typography colors={darkPurple} variant="h1" className="my-2">
        {serviceName}
      </Typography>

      <Typography colors={darkPurple} variant="body1">
        Build a Team of Experts. Grow your Brand. Boost your career Efficiently.
      </Typography>

      <ServiceFilters handler={getSingleServiceGigs} subCategoryId={subCategoryId} userId={userId} />

      {!isFetching ? (
        <Box>
          <Box className="d-flex my-4">
            <Typography className="me-1 weight-600">{gigList?.results?.length || 0}</Typography>
            <Typography variant="body2">services available</Typography>
          </Box>

          <Grid container rowSpacing={2.5}>
            {gigList?.results?.map(item => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} key={item.id}>
                <GigCard
                  image={item?.gig_main_image}
                  name={formatName(item?.first_name, item?.last_name, item?.username)}
                  title={item?.title}
                  profileId={item?.profile_id}
                  gigId={item?.id}
                  profileImage={item?.profile_image}
                  monthlyPrice={item?.gig_monthly_price_basic}
                  fixedPrice={item?.gig_adhoc_price_basic}
                  sellerLevel={item?.seller_level}
                  rating={item?.rating}
                  reviews={item?.review_count}
                  priceSection
                  isDummy={false}
                />
              </Grid>
            ))}
          </Grid>

          {gigList?.results?.length ? (
            <Box className="text-center mt-5">
              <Button className="py-2" variant="outlined" color="primary">
                Load More
              </Button>
            </Box>
          ) : (
            <Typography colors={darkPurple} variant="body1">
              No Services Available In this Category
            </Typography>
          )}
        </Box>
      ) : (
        <SectionLoader height="30vh" />
      )}

      <FaqContainer
        heading={faqTitle}
        subHeading={subHeading}
        isLoading={faqsSectionDataLoading}
        faqs={faqs}
      />
    </Container>
  );
}

export default SingleService;
