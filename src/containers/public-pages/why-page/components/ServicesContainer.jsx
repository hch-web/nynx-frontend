import React from 'react';
import { Grid, Typography, useTheme, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// Services
import { useWhyPageServicesSectionQuery } from 'services/public/why-page/whyPage';

// Components
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import { chipContainerStyles, fontStyles, pillStyles } from 'styles/mui/public-pages/why-page/why-page-styles';

function ServicesContainer() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { data: whyPageServicesSectionData, isLoading: whyPageServicesSectionDataLoading } = useWhyPageServicesSectionQuery();

  // Constants
  const mainHeading = whyPageServicesSectionData?.main_heading;
  const description = whyPageServicesSectionData?.description;
  const subDescription = whyPageServicesSectionData?.sub_description;
  const services = whyPageServicesSectionData?.services;

  return whyPageServicesSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Box className="d-flex justify-content-center">
      <Box className="text-center container-max-width">
        <Box className="text-center w-75 mx-auto">
          <Typography variant="h2" color={darkPurple}>
            {mainHeading}
          </Typography>
          <div className="my-4">
            <Typography variant="h6" color={darkPurple} sx={fontStyles} className="mb-2">
              {description}
            </Typography>
            <Typography variant="h6" color={darkPurple} sx={fontStyles}>
              {subDescription}
            </Typography>
          </div>
        </Box>

        <Grid
          container
          columnSpacing={1}
          rowSpacing={{ xs: 1, sm: 1, md: 2 }}
          className="align-items-center justify-content-center my-4 px-2"
        >
          {services?.map(item => (
            <Grid item key={item.id}>
              <Link
                to={`/services/${item.id}`}
                className="text-decoration-none"
                style={{ color: darkPurple }}
              >
                <Box className="rounded-pill py-2 px-4" sx={chipContainerStyles}>
                  <Typography variant="h6" sx={pillStyles}>
                    {item?.name}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default ServicesContainer;
