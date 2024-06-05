import React, { useState } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { MoreVert, StarRounded } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';

// hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// services
import { useDeleteGigMutation } from 'services/private/gig';

// styles
import {
  gigTitlteStyles,
  gigCardStyles,
  gigCoverImageStyles,
  deleteButtonStyles,
  gigAvatarStyles,
  gigContainerStyles,
  DraftLabelStyles,
  kebabMenuIconStyles,
  gigNotReviewAvailableStyles,
} from 'styles/mui/components/gig-styles';

// assets
import GigDummyImage from 'assets/dummy-gig-Image.jpg';

// component
import { conditionalBadgeOfExpert } from 'utilities/helpers';
import PriceSection from './PriceSection';

function GigCard({
  image,
  name,
  description,
  profileLevel,
  sellerLevel,
  reviews,
  rating,
  fixedPrice,
  priceSection,
  isDummy,
  title,
  profileImage,
  gigId,
  profileId,
  status,
  monthlyPrice,
  monthlyFrom,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const lightOrange = colors.lightOrange.main;

  // STATE HOOKS
  const [isKebabMenuOpen, setKebabMenuOpen] = useState(null);

  const { userInfo } = useSelector(state => state.auth);
  const { id: profile } = useParams();

  const [deleteGig, { error: deleteGigError, isSuccess: deleteGigSuccess }] = useDeleteGigMutation();

  // Api Response
  const successMessage = 'Gig has been deleted Successfully';
  useHandleApiResponse(deleteGigError, deleteGigSuccess, successMessage);

  // Constants
  const gigImage = image || GigDummyImage;

  // HANDLERS
  const handleOpenKebabMenu = e => {
    setKebabMenuOpen(e.currentTarget);
  };

  const handleCloseKebabMenu = () => {
    setKebabMenuOpen(null);
  };

  const handleDeleteGig = async () => {
    handleCloseKebabMenu();
    await deleteGig(gigId);
  };

  // constants
  const canUserDelete = userInfo?.id === +profile;
  const isDraft = status === 'draft';
  const isReviewsAvailable = reviews > 0;

  if (isDummy) {
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
                <Grid item xs={6} className="py-2 px-1">
                  <Typography variant="body2">Fixed From</Typography>

                  <Typography variant="body1" className="fw-bold">
                    {fixedPrice}
                  </Typography>
                </Grid>

                <Grid item xs={fixedPrice ? 6 : 12} className="py-2 px-1 text-end">
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

  return (
    <div style={gigContainerStyles}>
      {canUserDelete && (
        <Box className="d-flex justify-content-end" sx={deleteButtonStyles}>
          <IconButton sx={kebabMenuIconStyles} onClick={handleOpenKebabMenu}>
            <MoreVert />
          </IconButton>

          <Menu open={!!isKebabMenuOpen} onClose={handleCloseKebabMenu} anchorEl={isKebabMenuOpen}>
            <MenuItem onClick={handleDeleteGig}>
              <Typography variant="body2">Delete</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}

      {isDraft && (
        <Box className="d-flex justify-content-end" sx={DraftLabelStyles}>
          <Typography variant="body2">Draft</Typography>
        </Box>
      )}

      <Link to={`/profile/${profileId}/gig/${gigId}`} className="text-decoration-none">
        <Card className="mx-auto" sx={gigCardStyles}>
          <Box
            className="team-card-cardMedia"
            sx={{
              background: `url(${gigImage}) center no-repeat`,
              ...gigCoverImageStyles,
            }}
          />

          <CardContent className="p-0 services-card-content">
            <Box className="px-3 p-sm-2 px-sm-3 p-md-3 services-cardContent-box">
              <div className="avatar-container d-flex align-items-center justify-content-start mb-3">
                <Avatar sx={gigAvatarStyles} src={profileImage} alt={name} />

                <div className="px-2">
                  <Typography variant="body2" className="fw-bold">
                    {name}
                  </Typography>

                  <img src={conditionalBadgeOfExpert(sellerLevel)} alt="profile-level-badge" />
                </div>
              </div>

              <Box>
                <Typography className="fw-bold" variant="body1" color={darkPurple} sx={gigTitlteStyles}>
                  {title}
                </Typography>
              </Box>

              <Box
                className="d-flex align-items-center gap-1"
                sx={!isReviewsAvailable ? gigNotReviewAvailableStyles : {}}
              >
                <StarRounded sx={{ color: lightOrange }} />

                <Typography variant="body2" className="text-muted">
                  {rating} ({reviews} Reviews )
                </Typography>
              </Box>
            </Box>

            {priceSection && <PriceSection fixedPrice={fixedPrice} monthlyPrice={monthlyPrice} />}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

GigCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  profileLevel: PropTypes.string,
  reviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fixedPrice: PropTypes.string,
  priceSection: PropTypes.bool,
  isDummy: PropTypes.bool,
  title: PropTypes.string,
  profileImage: PropTypes.string,
  sellerLevel: PropTypes.string,
  gigId: PropTypes.number,
  profileId: PropTypes.number,
  status: PropTypes.string,
  rating: PropTypes.number,
  monthlyPrice: PropTypes.string,
  monthlyFrom: PropTypes.string,
};

GigCard.defaultProps = {
  image: '',
  name: '',
  description: '',
  profileLevel: '',
  sellerLevel: '',
  reviews: '',
  status: 'completed',
  fixedPrice: '',
  priceSection: false,
  isDummy: true,
  title: '',
  profileImage: '',
  gigId: 0,
  monthlyPrice: '',
  profileId: 0,
  rating: 0,
  monthlyFrom: '',
};
export default GigCard;
