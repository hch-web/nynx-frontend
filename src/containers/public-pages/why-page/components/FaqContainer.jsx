import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import FaqsComponent from 'containers/public-pages/common/components/FaqsComponent';

// Services
import { useWhyPageFaqQuery } from 'services/public/why-page/whyPage';

// Components
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function FaqContainer() {
  const { data: whyPageFaqSectionData, isLoading: whyPageFaqSectionDataLoading } = useWhyPageFaqQuery();

  // Constants
  const mainHeading = whyPageFaqSectionData?.main_heading;
  const subHeading = whyPageFaqSectionData?.sub_heading;
  const faqs = whyPageFaqSectionData?.about_page_frequently_asked_question;

  return whyPageFaqSectionDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public">
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h2">{mainHeading}</Typography> <br />{' '}
          <Typography variant="h2">{subHeading}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {faqs?.map(item => (
            <FaqsComponent question={item.question} answer={item.answer} key={item.id} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default FaqContainer;
