import React from 'react';
import {
  Grid,
  useTheme,
  Typography,
  Card,
  CardMedia,
  Box,
  Container,
} from '@mui/material';

import { KeyboardArrowRight } from '@mui/icons-material';

import helpImage1 from 'assets/help-image-1.png';
import helpImage2 from 'assets/help-image-2.png';
import helpImage3 from 'assets/help-image-3.png';

const cardsData = [
  {
    id: Math.random(),
    image: helpImage1,
    date: 'August 16, 2021',
    title:
      'The “Work Unlocked” Podcast Aims to Change the Way You Think of Work',
    description:
      'Lorem ipsum dolor sit amthsk amet, consectetur adipiscing elit.',
  },
  {
    id: Math.random(),
    image: helpImage2,
    date: 'August 16, 2021',
    title:
      'Improve Your Project Catalog Listings With New Ways to Promote Your Work',
    description:
      'Lorem ipsum dolor sit amthsk amet, consectetur adipiscing elit.',
  },
  {
    id: Math.random(),
    image: helpImage3,
    date: 'August 16, 2021',
    title:
      'Connecting Leading Businesses and Top-Tier Independent Professionals',
    description:
      'Lorem ipsum dolor sit amthsk amet, consectetur adipiscing elit.',
  },
];

function FindHelpContainer() {
  const theme = useTheme();
  const colors = theme.palette;
  return (
    <Container variant="public" className="pt-3 pt-sm-5">
      <Typography
        variant="h2"
        align="center"
        className="mb-3 mb-sm-5"
        sx={{ textTransform: 'none' }}
      >
        Find out how Nynx has helped
        <br className="d-none d-sm-block" /> others like you
      </Typography>

      <Grid container className="justify-content-center" spacing={2}>
        {cardsData.map(item => (
          <Grid item xs={12} sm={6} md={4} className="my-2" key={item.id}>
            <Card
              sx={{
                border: 'none',
                background: 'transparent',
              }}
              className="mx-auto"
            >
              <CardMedia
                image={item.image}
                sx={{ height: '250px', borderRadius: '10px' }}
              />
              <Box>
                <Typography variant="body2" my={2} color={colors.grey[500]}>
                  {item.date}
                </Typography>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="h6" my={2} color={colors.grey[600]}>
                  {item.description}
                </Typography>

                <Typography variant="body1">
                  Read more <KeyboardArrowRight />
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FindHelpContainer;
