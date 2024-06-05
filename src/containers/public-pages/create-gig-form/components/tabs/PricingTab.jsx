import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { roundedBoxWrapperStyles } from 'styles/mui/components/create-gig-styles';
import propTypes from 'prop-types';

// styles
import { pricingTabTitleStyles } from 'styles/mui/public-pages/create-gig/pricing-tab-styles';

// common
import PricingTabMainWrapper from '../PricingTabMainWrapper';

// context
import PricingContext from '../../context/PricingContext';

function PricingTab({ setCurrentTab }) {
  return (
    <PricingContext setCurrentTab={setCurrentTab}>
      <Container variant="public">
        <Box sx={roundedBoxWrapperStyles}>
          <Box className="border-bottom py-3 px-4">
            <Typography variant="h5" sx={pricingTabTitleStyles}>
              Price & scope
            </Typography>
          </Box>
          <PricingTabMainWrapper />
        </Box>
      </Container>
    </PricingContext>
  );
}

PricingTab.propTypes = {
  setCurrentTab: propTypes.func,
};

PricingTab.defaultProps = {
  setCurrentTab: () => {},
};

export default PricingTab;
