import React, { useEffect } from 'react';
import { Box, Button, Container, Grid, Typography, useTheme, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Rating from 'containers/common/components/Rating';
import { useSelector } from 'react-redux';

// services
import { useGetGigDetailsQuery } from 'services/private/gig';
import { useCreateRoomMutation } from 'services/private/chat';

// styles
import styles from 'styles/public-pages/gigDetails/gig-details.module.scss';
import { sectionLoaderStyles } from 'styles/mui/public-pages/gig-details/gig-details-styles';

// common utilities
import { conditionalBadgeOfExpert, formatName } from 'utilities/helpers';

// common
import SectionLoader from 'containers/common/loaders/SectionLoader';
import BrowserHistory from 'containers/public-pages/common/components/BrowserHistory';
import ImageSlider from './components/ImageSlider';
import PackageDetail from './components/PackageDetail';
import Info from './components/Info';
import MostVisitedServices from '../common/sections/MostVisitedServices';

function GigDetails() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const navigate = useNavigate();
  const { profileId, gigId } = useParams();
  const { userInfo } = useSelector(state => state.auth);

  const { isLoading, data: gigDetails } = useGetGigDetailsQuery(gigId, { skip: !gigId });
  const [createRoom, { isSuccess: roomSuccess }] = useCreateRoomMutation();

  const handleCreateRoom = async () => {
    await createRoom({ owner: userInfo?.id, partner: profileId });
  };

  // Constants
  const canUserEdit = userInfo?.id === +profileId;
  const firstName = gigDetails?.profile?.first_name;
  const lastName = gigDetails?.profile?.last_name;
  const userName = gigDetails?.profile?.username;
  const isBuyer = userInfo?.is_buyer;
  const reviewCount = gigDetails?.review_count;
  const rating = gigDetails?.rating;
  const profileLevelBadge = conditionalBadgeOfExpert(gigDetails?.seller_level);

  useEffect(() => {
    if (roomSuccess) {
      if (isBuyer) navigate('/portal/client/chat');
      else navigate('/portal/freelancer/chat');
    }
  }, [roomSuccess]);

  return isLoading ? (
    <div style={sectionLoaderStyles}>
      <SectionLoader />
    </div>
  ) : (
    <>
      <Container variant="public">
        <Grid container spacing={2} className={`${styles.gigDetail} pt-0`}>
          {canUserEdit && (
            <Grid item md={12} xs={12} className="d-flex justify-content-end pt-0">
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                component={Link}
                to={`/freelancer/gig/create?id=${gigDetails?.id}&subCategoryId=${gigDetails?.sub_category}`}
              >
                Edit Gig
              </Button>
            </Grid>
          )}
          <Grid item md={6} xs={12}>
            <Typography variant="caption" className="pointer" color={darkPurple} sx={{ lineHeight: 0 }}>
              {gigDetails?.category_label} {'>'} {gigDetails?.subcategory_label}
            </Typography>

            <Typography variant="h3" color={darkPurple} className="mt-2">
              {gigDetails?.title || ''}
            </Typography>

            <Box className="d-flex flex-wrap align-items-center mt-3">
              <Rating name="rating-value" value={rating} className={`${styles.ratingIcons}`} />

              <Typography variant="caption" color={darkPurple} className="mt-1">
                {rating} ({reviewCount} Reviews)
              </Typography>
            </Box>
          </Grid>

          <Grid item md={6} xs={12} className="d-flex justify-content-end">
            <Box className={`${styles.infoContainer}`}>
              <Box className={`${styles.freelancerInfo} px-3 py-2 d-flex flex-wrap justify-content-between`}>
                <Box className="avatar-container d-flex align-items-center justify-content-start">
                  <Link to={`/profile/${gigDetails?.profile?.id}`} className="text-decoration-none">
                    <Avatar src={gigDetails?.profile?.image} alt={firstName} sx={{ cursor: 'pointer' }} />
                  </Link>

                  <Link to={`/profile/${gigDetails?.profile?.id}`} className="text-decoration-none">
                    <Box className="d-flex flex-column ms-2 my-1">
                      <Typography variant="caption" className="fw-bold weight-600" color={darkPurple}>
                        {formatName(firstName, lastName, userName)}
                      </Typography>

                      <img src={profileLevelBadge} alt="profile-level-badge" />
                    </Box>
                  </Link>
                </Box>

                <Box className="d-flex my-1">
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/template/${profileId}/view`}
                    className={`px-lg-4 px-md-2 py-md-2 px-sm-2 ${styles.freelanceProfileInfo} ms-1`}
                  >
                    <Typography variant="body1" color={darkPurple}>
                      Template
                    </Typography>
                  </Button>
                </Box>
              </Box>

              <Box className="mt-2">
                <Button
                  variant="contained"
                  className="me-3 mt-2 mt-sm-2 mt-md-2 mt-lg-0 w-100 "
                  color="secondary"
                  disabled={canUserEdit}
                  onClick={handleCreateRoom}
                >
                  <Typography variant="body1">Message</Typography>
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item md={12} xs={12}>
            <ImageSlider gigDetails={gigDetails} />
          </Grid>
        </Grid>

        <PackageDetail gigDetails={gigDetails} />

        <Info gigDetails={gigDetails} />
      </Container>

      <BrowserHistory />

      <MostVisitedServices />
    </>
  );
}

export default GigDetails;
