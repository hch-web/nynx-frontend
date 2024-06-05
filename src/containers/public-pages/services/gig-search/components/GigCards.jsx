import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';

// COMPONENTS & UTILITIES
import GigCard from 'containers/public-pages/common/components/GigCards';
import { formatName } from 'utilities/helpers';
import SectionLoader from 'containers/common/loaders/SectionLoader';

function GigCards({ gigsData, isLoading }) {
  return (
    <Box>
      <Typography variant="">{gigsData?.length} gigs available</Typography>

      <Box className="my-4">
        {!isLoading ? (
          <Grid container rowSpacing={2.5}>
            {gigsData?.length > 0 ? (
              gigsData?.map(item => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                  xxl={4}
                  laptop={3}
                  desktop={2.4}
                  key={item.id}
                >
                  <GigCard
                    image={item?.image}
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
              ))
            ) : (
              <Stack justifyContent="center" alignItems="center" minHeight="30vh" width={1}>
                <Typography variant="h3">No record found!</Typography>
              </Stack>
            )}
          </Grid>
        ) : (
          <SectionLoader height="30vh" />
        )}
      </Box>
    </Box>
  );
}

GigCards.propTypes = {
  gigsData: propTypes.array,
  isLoading: propTypes.bool,
};

GigCards.defaultProps = {
  gigsData: [],
  isLoading: false,
};

export default GigCards;
