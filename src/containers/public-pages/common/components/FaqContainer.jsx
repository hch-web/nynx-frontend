import React, { memo } from 'react';
import { Grid, Typography, useTheme, Container, Box } from '@mui/material';
import PropTypes from 'prop-types';

// COMPONENTS
import FaqsComponent from 'containers/public-pages/common/components/FaqsComponent';
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';

function FaqContainer({ faqs, heading, subHeading, isLoading }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  return isLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public">
      <Grid container columnSpacing={2}>
        <Grid item md={6}>
          <Typography variant="h2">{`${heading} ${subHeading}`}</Typography>
        </Grid>

        <Grid item md={6}>
          {faqs?.map(item => (
            <FaqsComponent
              key={item?.id}
              question={item?.question}
              answer={item?.answer}
              questionTypoVariant="h6"
              answerTypoVariant="body1"
              questionColor={darkPurple}
              answerColor={darkPurple}
              questionClassName="weight-500"
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

FaqContainer.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  isLoading: PropTypes.bool,
  faqs: PropTypes.array,
};

FaqContainer.defaultProps = {
  heading: '',
  subHeading: '',
  isLoading: false,
  faqs: [],
};

export default memo(FaqContainer);
