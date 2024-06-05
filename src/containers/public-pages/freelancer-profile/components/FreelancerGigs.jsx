import React from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { addGigIconStyle, freelancerGigStyles, freelancerAddGigStyles, gigDescriptionStyles, freelancerAddText } from 'styles/mui/public-pages/freelancer-profile/freelancer-profile-styles';
import propTypes from 'prop-types';
import styles from 'styles/public-pages/freelancer-profile/freelancer-profile.module.scss';
import AddIcon from '@mui/icons-material/Add';

function FreelancerGigs({
  image,
  name,
  description,
  profileLevel,
  reviews,
  fixedPrice,
  fixedFrom,
  monthlyFrom,
  priceSection,
  last,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPuple = colors.darkPurple.main;

  return (
    <Box className="flex-grow-1">
      {!last ? (
        <Link to="/gig-details/132" className="text-decoration-none">
          <Box className="mx-1">
            <Card
              className="mx-auto"
              sx={freelancerGigStyles}
            >
              <CardMedia component="img" className="team-card-cardMedia" image={image} />
              <CardContent className="p-0 services-card-content">
                <Box className="p-2 px-3 p-sm-2 px-sm-3 p-md-4 services-cardContent-box">
                  <div className="avatar-container d-flex align-items-center justify-content-start mb-3">
                    <Avatar sx={{ width: 40, height: 40 }} />
                    <div className="px-2">
                      <Typography variant="body2" className="fw-bold">
                        {name}
                      </Typography>
                      <Typography variant="body2">{profileLevel}</Typography>
                    </div>
                  </div>

                  <Typography
                    className="fw-bold"
                    variant="body1"
                    color={darkPuple}
                    sx={gigDescriptionStyles}
                  >
                    {description}
                  </Typography>
                  <Typography variant="body2">{reviews}</Typography>
                </Box>

                {priceSection && (
                  <Grid
                    container
                    sx={{ borderTop: `1px solid ${colors.lightGrey.main}` }}
                    className="align-items-center"
                  >
                    <Grid item xs={4} sm={4} md={4} align="center" className="py-2 px-1">
                      <Typography variant="body2">Fixed rate</Typography>
                      <Typography variant="body1" className="fw-bold">
                        {fixedPrice}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={4}
                      align="center"
                      className="py-2 px-1"
                      sx={{
                        borderLeft: `1px solid ${colors.lightGrey.main}`,
                        borderRight: `1px solid ${colors.lightGrey.main}`,
                      }}
                    >
                      <Typography variant="body2">Fixed from</Typography>
                      <Typography variant="body1" className="fw-bold">
                        {fixedFrom}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} align="center" className="py-2 px-1">
                      <Typography variant="body2">Monthly from</Typography>
                      <Typography variant="body1" className="fw-bold">
                        {monthlyFrom}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Box>
        </Link>
      ) : (
        <Card
          className={`${styles.addGig} d-flex justify-content-center align-items-center h-100 mx-1`}
          sx={freelancerAddGigStyles}
        >
          <Link to="/profile/12/create-gig" className="text-decoration-none">
            <CardContent className="p-4 services-card-content ">
              <Box className="text-center">
                <AddIcon sx={addGigIconStyle} />
              </Box>
              <Box sx={freelancerAddText}>
                <Typography variant="caption" className="text-center weight-600 " color={darkPuple}>
                  Create a New Skillset
                </Typography>
              </Box>
            </CardContent>
          </Link>
        </Card>
      )}
    </Box>
  );
}

FreelancerGigs.propTypes = {
  image: propTypes.string,
  name: propTypes.string,
  description: propTypes.string,
  profileLevel: propTypes.string,
  reviews: propTypes.string,
  fixedPrice: propTypes.string,
  fixedFrom: propTypes.string,
  monthlyFrom: propTypes.string,
  priceSection: propTypes.bool,
  last: propTypes.bool,
};

FreelancerGigs.defaultProps = {
  image: '',
  name: '',
  description: '',
  profileLevel: '',
  reviews: '',
  fixedPrice: '',
  fixedFrom: '',
  monthlyFrom: '',
  priceSection: false,
  last: false,
};

export default FreelancerGigs;
