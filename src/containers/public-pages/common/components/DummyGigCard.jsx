import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { StarRounded } from '@mui/icons-material';

// styles
import {
  gigTitlteStyles,
  gigCardStyles,
  gigCoverImageStyles,
} from 'styles/mui/components/gig-styles';

function DummyGigCard({
  image,
  profile,
  name,
  description,
  profileLevel,
  reviews,
  fixedPrice,
  priceSection,
  monthlyFrom,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const lightOrange = colors.lightOrange.main;

  return (
    <div className="mx-1">
      <Card className="mx-auto" sx={gigCardStyles}>
        <Box
          className="team-card-cardMedia"
          sx={{
            background: `url(${image}) center no-repeat`,
            ...gigCoverImageStyles,
          }}
        />
        <CardContent className="p-0 services-card-content">
          <Box className="px-3 px-sm-2 px-sm-3 px-md-4 pb-3 pb-sm-2 pb-sm-3 pb-md-4 services-cardContent-box">
            <div className="avatar-container d-flex align-items-center justify-content-start mb-3">
              <Avatar src={profile} sx={{ width: 40, height: 40 }} />
              <div className="px-2">
                <Typography variant="body2" className="fw-bold">
                  {name}
                </Typography>
                <img src={profileLevel} alt="profileLevel" />
              </div>
            </div>

            <Typography className="fw-bold" variant="body1" color={darkPurple} sx={gigTitlteStyles}>
              {description}
            </Typography>
            <Box className="d-flex align-items-center gap-1">
              <StarRounded sx={{ color: lightOrange }} />
              <Typography variant="body2">{reviews}</Typography>
            </Box>
          </Box>

          {priceSection && (
            <Grid container sx={{ borderTop: `1px solid ${colors.lightGrey.main}` }} className="px-3">
              <Grid item xs={6} sm={6} md={6} align="start" className="py-2 px-1">
                <Typography variant="body2">Fixed From</Typography>
                <Typography variant="body1" className="fw-bold">
                  {fixedPrice}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} align="end" className="py-2 px-1">
                <Typography variant="body2">Monthly from</Typography>
                <Typography variant="body1" className="fw-bold">
                  {monthlyFrom}
                </Typography>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

DummyGigCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  profileLevel: PropTypes.string,
  profile: PropTypes.string,
  reviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fixedPrice: PropTypes.string,
  priceSection: PropTypes.bool,
  monthlyFrom: PropTypes.string,
};

DummyGigCard.defaultProps = {
  image: '',
  profile: '',
  name: '',
  description: '',
  profileLevel: '',
  reviews: '',
  fixedPrice: '',
  monthlyFrom: '',
  priceSection: false,
};

export default DummyGigCard;
