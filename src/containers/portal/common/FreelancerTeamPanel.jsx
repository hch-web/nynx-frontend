import React, { useEffect } from 'react';
import { Avatar, Box, Button, Card, Rating, Typography, useTheme } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// API HOOKS
import { useLazyGetSearchedFreelancersQuery } from 'services/private/workspace/freelancers';
import { useCreateRoomMutation } from 'services/private/chat';

// STYLES
import {
  freelancerTeamOnlineIconStyles,
  freelancerTeamOfflineIconStyles,
} from 'styles/mui/portal/workspace-styles';

// IMAGES
import blankImage from 'assets/jobPostingBlank.png';

// CUSTOM HOOKS
import useGetGlobalAppContext from 'custom-hooks/useGetGlobalAppContext';

// COMPONENTS
import { formatName, getUniqueObjects, isUserOnline } from 'utilities/helpers';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import Searchbar from './SearchBar';

function FreelancerTeamTabPanel() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  const { users: onlineUsers } = useGetGlobalAppContext();

  const { userInfo } = useSelector(state => state.auth);
  const [createRoom, { isSuccess: roomSuccess }] = useCreateRoomMutation();
  // API HOOKS
  const [searchFreelancers, { data: searchResults, isFetching, isLoading }] = useLazyGetSearchedFreelancersQuery();

  useEffect(() => {
    const fetchFreelancers = async () => {
      await searchFreelancers({ workspaceId, searchValue: '' });
    };

    fetchFreelancers();
  }, []);

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const lightOrange = colors.lightOrange.main;

  // constants
  const isBuyer = userInfo?.is_buyer;
  const loggedUserId = userInfo?.id;

  const handleCreateRoom = async id => {
    await createRoom({ owner: loggedUserId, partner: id });
  };

  useEffect(() => {
    if (roomSuccess) {
      if (isBuyer) navigate('/portal/client/chat');
      else navigate('/portal/freelancer/chat');
    }
  }, [roomSuccess]);

  return isLoading ? (
    <Box className="d-flex justify-content-center align-items-center" sx={{ height: '30vh' }}>
      <SectionLoader />
    </Box>
  ) : (
    <Box>
      {/* SEARCH BAR COMPONENT */}
      {isBuyer && (
        <Box className="d-flex flex-wrap flex-sm-no-wrap align-items-center" sx={{ gap: '10px' }}>
          <Box className="col-12 col-sm-6 col-md-9 flex-grow-1">
            <Searchbar
              workspaceId={workspaceId}
              placeholder="Search Profiles"
              searchFreelancers={searchFreelancers}
              loading={isFetching || isLoading}
            />
          </Box>

          <Box className="col-12 col-sm-auto col-md-auto text-center text-sm-start">
            <Button variant="contained">Invite Coworker</Button>
          </Box>
        </Box>
      )}

      {/* FREELANCER CARDS CONTAINER */}
      <Box className="row align-items-center mt-4">
        {searchResults?.length > 0 ? (
          getUniqueObjects('profile_id', searchResults)?.map(card => {
            const isOnline = isUserOnline(card?.profile_id, onlineUsers) || false;
            const fullName = formatName(card?.first_name, card?.last_name, card?.username);
            const rating = card?.rating || 0;
            const review = card?.review;
            return (
              <Box className="col-4" key={card.profile_id}>
                <Card className="px-3 py-4 d-flex flex-column align-items-center">
                  {/* AVATAR */}
                  <Box className="position-relative d-flex align-items-center justify-content-center">
                    <Avatar src={card.prof_img} alt={card.name} />

                    <Box sx={isOnline ? freelancerTeamOnlineIconStyles : freelancerTeamOfflineIconStyles} />
                  </Box>

                  {/* BOX CONTENT */}
                  <Box className="d-flex flex-column align-items-center my-3">
                    <Typography variant="body1" color={darkPurple} className="mb-2 text-center">
                      {fullName}
                    </Typography>

                    {/* RATING & REVIEWS BOX */}
                    <Box className="text-center">
                      <Box className="d-flex align-items-center">
                        <Rating size="small" value={rating} sx={{ color: lightOrange }} readOnly />
                        <Typography variant="body2">{rating}</Typography>
                      </Box>

                      <Typography variant="body2" className="text-muted">
                        {review} reviews
                      </Typography>
                    </Box>
                  </Box>

                  {/* BUTTON */}
                  <Button
                    variant="contained"
                    color="secondary"
                    className="px-4 py-2"
                    onClick={() => handleCreateRoom(card?.profile_id)}
                    disabled={card?.profile_id === loggedUserId}
                  >
                    Message
                  </Button>
                </Card>
              </Box>
            );
          })
        ) : (
          <Box className="d-flex flex-column align-items-center justify-content-center w-100 py-5">
            <img src={blankImage} alt="Blank-Record-Img" />

            <Typography variant="h6" className="fw-600 mt-3 text-muted">
              No Record Found!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default FreelancerTeamTabPanel;
