/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid, Typography, useTheme, Box, Card, CardContent } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

// services
import { useGetGigListQuery } from 'services/private/gig';
import {
  addGigIconStyle,
  freelancerAddGigStyles,
  freelancerAddText,
} from 'styles/mui/public-pages/freelancer-profile/freelancer-profile-styles';

// styles
import styles from 'styles/public-pages/freelancer-profile/freelancer-profile.module.scss';
import { title } from 'styles/mui/components/freelancer-profile-styles';

// common
import GigCard from 'containers/public-pages/common/components/GigCards';

// utilities
import { createGigBaseRoute } from 'utilities/routing-links';
import { formatName } from 'utilities/helpers';
import { checkLimitOfArrayList } from 'shared/helpers/utility-functions';

function Gigs({ canUserEdit: isOwnProfile }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPuple = colors.darkPurple.main;
  const { id } = useParams();

  const gigListParams = isOwnProfile ? { id } : { id, status: 'completed' };

  const { data: gigsData } = useGetGigListQuery(gigListParams, { skip: !id });
  const { userInfo } = useSelector(state => state.auth);

  // constants
  const hideGigs = userInfo?.is_buyer && isOwnProfile;
  const gigList = gigsData?.results;
  const completedGigs = checkLimitOfArrayList(gigList, 'gig_counter');
  const isGigMaxLimit = completedGigs > 10;
  const isUserAddGig = isOwnProfile && !userInfo?.is_buyer && !isGigMaxLimit;

  return (
    <Grid container className="mt-3">
      {!hideGigs && (
        <>
          <Grid item xs={12} className="mt-3">
            <Typography variant="title" color={darkPuple} className="weight-500" sx={title}>
              Gigs
            </Typography>
          </Grid>
          {gigsData?.results?.map(item => (
            <Grid
              item
              xl={2.7}
              lg={4}
              md={6}
              sm={6}
              xs={12}
              key={item.id}
              className="mt-3 d-flex justify-content-center gap-2"
            >
              <GigCard
                title={item?.title}
                image={item?.image}
                name={formatName(item?.first_name, item?.last_name, item?.username)}
                profileImage={item?.profile_image}
                gigId={item?.id}
                profileId={item?.profile_id}
                status={item?.status}
                rating={item?.rating}
                reviews={item?.review_count}
                sellerLevel={item?.seller_level}
                isDummy={false}
              />
            </Grid>
          ))}
        </>
      )}

      {isUserAddGig && (
        <Grid item xs={12} sm={6} md={4} lg={2.7} className="mt-3 d-flex justify-content-center ">
          <Box
            component={Link}
            to={createGigBaseRoute}
            sx={{ width: '95%', height: gigsData?.count === 0 ? '230px' : 'auto' }}
            className="text-decoration-none"
          >
            <Card
              className={`${styles.addGig} d-flex justify-content-center align-items-center h-100`}
              sx={freelancerAddGigStyles}
            >
              <CardContent className="p-4 services-card-content ">
                <Box className="text-center">
                  <Add sx={addGigIconStyle} />
                </Box>

                <Box className="text-center" sx={freelancerAddText}>
                  <Typography variant="caption" className="weight-600 " color={darkPuple}>
                    Create a New Skillset
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

Gigs.propTypes = {
  canUserEdit: propTypes.bool.isRequired,
};

export default Gigs;
