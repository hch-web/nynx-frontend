import React from 'react';
import { Grid, Typography, useTheme, Container, Box } from '@mui/material';

// Styles
import { whyNynxContainerImageStyles } from 'styles/mui/public-pages/why-page/why-page-styles';

// Services
import { useWhyPageForBothClientFreelancersQuery } from 'services/public/why-page/whyPage';

function WhyNynxContainer() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { data: whyPageForBothClientsFreelancers } = useWhyPageForBothClientFreelancersQuery();

  // Constants
  const mainHeading = whyPageForBothClientsFreelancers?.heading;
  const whypageForClientsImage = whyPageForBothClientsFreelancers?.for_client?.image;
  const whypageForClientMainHeading = whyPageForBothClientsFreelancers?.for_client?.main_heading;
  const whypageForClientHeadingOne = whyPageForBothClientsFreelancers?.for_client?.heading_one;
  const whypageForClientDescriptionOne = whyPageForBothClientsFreelancers?.for_client?.description_one;
  const whypageForClientHeadingTwo = whyPageForBothClientsFreelancers?.for_client?.heading_two;
  const whypageForClientDescriptionTwo = whyPageForBothClientsFreelancers?.for_client?.description_two;
  const whypageForClientHeadingThree = whyPageForBothClientsFreelancers?.for_client?.heading_three;
  const whypageForClientDescriptionThree = whyPageForBothClientsFreelancers?.for_client?.description_three;

  // For Freelancer
  const whypageForFreelancerImage = whyPageForBothClientsFreelancers?.for_freelancer?.image;
  const whypageForFreelancerMainHeading = whyPageForBothClientsFreelancers?.for_freelancer?.main_heading;
  const whypageForFreelancerHeadingOne = whyPageForBothClientsFreelancers?.for_freelancer?.heading_one;
  const whypageForFreelancerDescriptionOne = whyPageForBothClientsFreelancers?.for_freelancer?.description_one;
  const whypageForFreelancerHeadingTwo = whyPageForBothClientsFreelancers?.for_freelancer?.heading_two;
  const whypageForFreelancerDescriptionTwo = whyPageForBothClientsFreelancers?.for_freelancer?.description_two;
  const whypageForFreelancerHeadingThree = whyPageForBothClientsFreelancers?.for_freelancer?.heading_three;
  const whypageForFreelancerDescriptionThree = whyPageForBothClientsFreelancers?.for_freelancer?.description_three;

  return (
    <Container variant="public" className="text-center">
      <Box className="text-center mb-lg-5 mb-3">
        <Typography variant="h2" color={darkPurple}>
          {mainHeading}
        </Typography>
      </Box>
      <Grid container spacing={12} className="text-start">
        <Grid item xs={12} sm={12} md={12} lg={6} className="mx-auto">
          <Typography variant="h3" color={darkPurple} className="mb-3">
            {whypageForClientMainHeading}
          </Typography>

          <Box
            sx={{
              background: `url(${whypageForClientsImage}) center no-repeat`,
              ...whyNynxContainerImageStyles,
            }}
            className="mb-3"
          />

          <Typography variant="h5" color={darkPurple} className="mb-3 weight-500">
            {whypageForClientHeadingOne}
          </Typography>

          <Typography variant="body1" color={darkPurple} className="mt-3 mb-3">
            {whypageForClientDescriptionOne}
          </Typography>

          <Typography variant="h5" color={darkPurple} className="mb-3 weight-500">
            {whypageForClientHeadingTwo}
          </Typography>

          <Typography variant="body1" color={darkPurple} className="mt-3 mb-3">
            {whypageForClientDescriptionTwo}
          </Typography>

          <Typography variant="h5" color={darkPurple} className="mb-3 weight-500">
            {whypageForClientHeadingThree}
          </Typography>

          <Typography variant="body1" color={darkPurple} className="mt-3 mb-3">
            {whypageForClientDescriptionThree}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} className="mx-auto">
          <Typography variant="h3" color={darkPurple} className="mb-3">
            {whypageForFreelancerMainHeading}
          </Typography>

          <Box
            sx={{
              background: `url(${whypageForFreelancerImage}) center no-repeat`,
              ...whyNynxContainerImageStyles,
            }}
            className="mb-3"
          />

          <Typography variant="h5" color={darkPurple} className="mb-3 weight-500">
            {whypageForFreelancerHeadingOne}
          </Typography>

          <Typography variant="body1" color={darkPurple} className="mt-3 mb-3">
            {whypageForFreelancerDescriptionOne}
          </Typography>

          <Typography variant="h5" color={darkPurple} className="mb-3 weight-500">
            {whypageForFreelancerHeadingTwo}
          </Typography>

          <Typography variant="body1" color={darkPurple} className="mt-3 mb-3">
            {whypageForFreelancerDescriptionTwo}
          </Typography>

          <Typography variant="h5" color={darkPurple} className="mb-3 weight-500">
            {whypageForFreelancerHeadingThree}
          </Typography>

          <Typography variant="body1" color={darkPurple} className="mt-3 mb-3">
            {whypageForFreelancerDescriptionThree}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default WhyNynxContainer;
