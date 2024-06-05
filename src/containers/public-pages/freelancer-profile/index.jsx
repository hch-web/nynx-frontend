import React from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useGetUserQuery } from 'services/private/profile';

// COMPONENTS
import SectionLoader from 'containers/common/loaders/SectionLoader';
import BrowserHistory from '../common/components/BrowserHistory';
import AboutProfile from './components/AboutProfile';
import Gigs from './components/Gigs';
import ReviewComponent from './components/ReviewComponent';

function FreelancerProfile() {
  const userInfo = useSelector(state => state.auth.userInfo);
  const { id } = useParams();
  const { data, isLoading } = useGetUserQuery(id);

  const canUserEdit = userInfo?.id === +id;

  return (
    <>
      <Container variant="public">
        {!isLoading ? (
          <AboutProfile user={data} canUserEdit={canUserEdit} />
        ) : (
          <Box>
            <SectionLoader />
          </Box>
        )}
        <Gigs canUserEdit={canUserEdit} />
        <ReviewComponent profileId={+id} />
      </Container>
      <BrowserHistory />
    </>
  );
}

export default FreelancerProfile;
