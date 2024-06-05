import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';

// components & utilities
import BrowserHistory from 'containers/public-pages/common/components/BrowserHistory';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';
import DummyGigCard from '../common/components/DummyGigCard';
import { servicesSliderData } from './utils/utils-data';

function FindService() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  return (
    <>
      <HeroSection />

      <Categories />

      <Container variant="public">
        <Box className="mb-3 mb-sm-5">
          <Typography variant="h2" color={darkPurple}>
            Get inspired with projects like these
          </Typography>
        </Box>

        <Grid container rowSpacing={2}>
          {servicesSliderData.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
              <DummyGigCard
                image={item.image}
                profile={item.profile}
                name={item.name}
                profileLevel={item.profileLevel}
                description={item.description}
                reviews={item.reviews}
                fixedPrice={item.fixedPrice}
                fixedFrom={item.fixedFrom}
                monthlyFrom={item.monthlyFrom}
                profileId={item.id}
                priceSection
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <BrowserHistory />
    </>
  );
}

export default FindService;
