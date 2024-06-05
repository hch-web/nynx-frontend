import React from 'react';
import { Grid, Typography, useTheme, Box, Card, Avatar } from '@mui/material';
import { Star } from '@mui/icons-material';
import PropTypes from 'prop-types';

// Styles
import { freelancerImageStyles } from 'styles/mui/public-pages/how-it-works/for-freelancer-styles';

function FreelancerCard({ freelancer }) {
  const theme = useTheme();
  const colors = theme.palette;
  const lightYellow = colors.lightYellow.main;
  const lightOrange = colors.lightOrange.main;

  return (
    <Card sx={{ background: lightYellow }} className="p-3">
      <Grid container className="gap-3 justify-content-start align-items-center justify-content-center">
        <Grid item>
          <Avatar
            sx={freelancerImageStyles}
            src={freelancer?.user_image || ''}
            alt={freelancer?.user_name?.toUpperCase() || ''}
          />
        </Grid>

        <Grid item className="p-2 text-center text-sm-center text-md-start" xs sm md>
          <Typography variant="h5" className="text-capitalize">
            {freelancer?.user_name?.slice(0, 9)}
          </Typography>

          <Typography variant="body2" className="mb-1 text-capitalize">
            {freelancer?.user_designation}
          </Typography>

          <Box className="d-flex justify-content-center justify-content-md-start align-items-center align-items-md-start">
            <Star sx={{ fontSize: 15, color: lightOrange }} />
            <Star sx={{ fontSize: 15, color: lightOrange }} />
            <Star sx={{ fontSize: 15, color: lightOrange }} />
            <Star sx={{ fontSize: 15, color: lightOrange }} />
            <Star sx={{ fontSize: 15, color: lightOrange }} />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

FreelancerCard.propTypes = {
  freelancer: PropTypes.object.isRequired,
};

export default FreelancerCard;
