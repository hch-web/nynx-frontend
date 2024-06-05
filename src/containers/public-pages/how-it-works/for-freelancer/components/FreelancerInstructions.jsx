import React from 'react';
import { Grid, Typography, useTheme, Container, Box } from '@mui/material';

// Services
import { useHowItWorksExpertInstructionsQuery } from 'services/public/how-it-works/forExperts';

// Components
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import { freelancerCardIndexContainerStyles } from 'styles/mui/public-pages/how-it-works/for-freelancer-styles';

function FreelancerInstructions() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const {
    data: howItWorksEpertsInstructionsSectionData,
    isLoading: howItWorksEpertsInstructionsSectionDataLoading,
  } = useHowItWorksExpertInstructionsQuery();

  // freelancer instruction
  const howItWorksExpertInstructionMainHeading = howItWorksEpertsInstructionsSectionData?.main_heading;
  const howItWorksExpertInstructionDescription = howItWorksEpertsInstructionsSectionData?.description;
  const howItWorksExpertInstructionInstructions = howItWorksEpertsInstructionsSectionData?.how_it_works_public_details_component;

  return howItWorksEpertsInstructionsSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public">
      <Box className="text-center">
        <Typography variant="h2" color={darkPurple}>
          {howItWorksExpertInstructionMainHeading}
        </Typography>
        <Typography variant="h6" color={darkPurple} className="mt-2 mb-4 col-12 col-md-10 col-lg-10 mx-auto">
          {howItWorksExpertInstructionDescription}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {howItWorksExpertInstructionInstructions?.map((item, index) => (
          <Grid item xs={6} sm={6} md={3} key={item?.id} className="d-flex flex-column align-items-start">
            <Box
              sx={freelancerCardIndexContainerStyles}
              className="mb-3 rounded-circle d-flex align-items-center justify-content-center"
            >
              <Typography variant="h6" className="weight-500" color={darkPurple}>
                {index + 1}
              </Typography>
            </Box>

            <Typography variant="h6" color={darkPurple} className="mb-2">
              {item?.heading}
            </Typography>
            <Typography variant="body2" color={darkPurple}>
              {item?.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FreelancerInstructions;
