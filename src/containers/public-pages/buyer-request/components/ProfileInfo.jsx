import React from 'react';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';

// services
import { useGetSkillsEducationQuery } from 'services/private/profile';

// assets
import profileDummyImg from 'assets/dummy-profile.png';

// components
import Rating from 'containers/common/components/Rating';

function ProfileInfo() {
  const theme = useTheme();
  const colors = theme.palette;
  const primary = colors.primary.main;
  const darkPurple = colors.darkPurple.main;

  const {
    userInfo: {
      id,
      first_name: firstName,
      last_name: lastName,
      username,
      country_label: countryLabel,
      created_at: createdAt,
      image,
      total_earning: totalEarning,
      total_job: totalJobs,
      total_completed_job: totalCompletedJobs,
      rating: userRating,
      review: userReviews,
    },
  } = useSelector(state => state.auth);

  const { data: userSkillEducationData } = useGetSkillsEducationQuery(id, { skip: !id });

  // constants
  const userFullName = Boolean(firstName) && Boolean(lastName) ? `${firstName} ${lastName[0]}` : username;
  const profileImageUrl = image || profileDummyImg;
  const country = countryLabel || 'NA';

  return (
    <Box>
      <Box
        className="p-3 d-flex flex-column justify-content-center align-items-center"
        sx={{ border: '1px solid #ECE9EB', borderRadius: '10px' }}
      >
        <Box
          sx={{
            background: `url(${profileImageUrl}) no-repeat`,
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundSize: 'cover',
          }}
        />
        <Typography variant="h3" color={primary} className="d-block mt-3">
          {userFullName}
        </Typography>
        <Box className="d-flex justify-content-center align-items-center mt-3">
          <Rating name="rating-value" value={userRating} className="ratingIcons" size="medium" />
          <Typography variant="caption" color={darkPurple}>
            {userRating}
          </Typography>
        </Box>
        <Typography variant="caption" color={darkPurple}>
          {userReviews} reviews
        </Typography>
      </Box>

      <Box className="mt-2 p-3" sx={{ border: '1px solid #ECE9EB', borderRadius: '10px' }}>
        <Box className="d-flex justify-content-between ">
          <Typography variant="body1" color={primary}>
            From
          </Typography>
          <Typography variant="body1" color={primary} className="weight-500">
            {country}
          </Typography>
        </Box>
        <Box className="d-flex justify-content-between mt-2">
          <Typography variant="body1" color={primary}>
            Member
          </Typography>
          <Typography variant="body1" color={primary} className="weight-500">
            {moment(createdAt).format('MMM YYYY')}
          </Typography>
        </Box>
        <Box className="d-flex justify-content-between mt-2">
          <Typography variant="body1" color={primary}>
            Total Jobs
          </Typography>
          <Typography variant="body1" color={primary} className="weight-500">
            {totalJobs}
          </Typography>
        </Box>
        <Box className="d-flex justify-content-between mt-2 ">
          <Typography variant="body1" color={primary}>
            Completed Jobs
          </Typography>
          <Typography variant="p" color={primary} className="weight-500">
            {totalCompletedJobs}
          </Typography>
        </Box>
        <Box className="d-flex justify-content-between mt-2 ">
          <Typography variant="p" color={primary}>
            All-Time Earnings
          </Typography>
          <Typography variant="body1" color={primary} className="weight-500">
            ${totalEarning}
          </Typography>
        </Box>
      </Box>

      <Box className="mt-2 p-3" sx={{ border: '1px solid #ECE9EB', borderRadius: '10px' }}>
        <Typography variant="title" color={primary} className="d-block weight-500">
          Skills
        </Typography>
        {userSkillEducationData?.skills?.map(item => (
          <Chip
            label={item.name}
            variant="outlined"
            className="mt-2 me-2 p-2 align-self-start bg-white"
            key={item.id}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ProfileInfo;
