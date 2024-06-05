import React, { useLayoutEffect, useState } from 'react';
import { Button, Typography, useTheme, Container, Box } from '@mui/material';
import Slider from 'react-slick';

// Styles
import { useHowItWorksExpertsProfilesQuery } from 'services/public/how-it-works/forExperts';

// Styles
import styles from 'styles/public-pages/howItWorks/how-it-works-freelancer.module.scss';

// Components
import SectionSkeletonLoader from 'containers/common/loaders/SectionSkeletonLoader';
import FreelancerCard from './FreelancerCard';

// Utilities
import {
  freelancerFirstRowSliderSettings,
  freelancerMiddleRowSliderSettings,
  freelancerLastRowSliderSettings,
} from '../utilities/slider-utils';

function CommunityFreelancers() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const {
    data: freelancerCommunityData,
    isSuccess: freelancerCommunityDataSuccess,
    isLoading: freelancerCommunityDataLoading,
  } = useHowItWorksExpertsProfilesQuery();

  const [freelancerCardData, setFreelancerCardData] = useState({
    firstSliderData: {
      freelancers: [],
    },
    secondSliderData: {
      freelancers: [],
    },
    thirdSliderData: {
      freelancers: [],
    },
  });

  useLayoutEffect(() => {
    if (freelancerCommunityDataSuccess && freelancerCommunityData) {
      setFreelancerCardData(() => ({
        firstSliderData: {
          freelancers:
            freelancerCommunityData?.how_it_works_community_for_freelancer_page_user_component[0]
            && freelancerCommunityData?.how_it_works_community_for_freelancer_page_user_component[0],
        },
        secondSliderData: {
          freelancers:
            freelancerCommunityData?.how_it_works_community_for_freelancer_page_user_component[1]
            && freelancerCommunityData?.how_it_works_community_for_freelancer_page_user_component[1],
        },
        thirdSliderData: {
          freelancers:
            freelancerCommunityData?.how_it_works_community_for_freelancer_page_user_component[2]
            && freelancerCommunityData?.how_it_works_community_for_freelancer_page_user_component[2],
        },
      }));
    }
  }, [freelancerCommunityDataSuccess, freelancerCommunityDataLoading]);

  // Constants
  const mainHeading = freelancerCommunityData?.main_heading;
  const subHeading = freelancerCommunityData?.sub_heading;

  return freelancerCommunityDataLoading ? (
    <Box className="d-flex justify-content-center">
      <SectionSkeletonLoader containerHeight="700px" />
    </Box>
  ) : (
    <Container variant="public" className={`${styles.communityContainer} pt-0 pt-lg-5 my-5 mb-0`}>
      <Box className="text-center mb-4 pb-2">
        <Typography variant="h2" color={darkPurple}>
          {mainHeading}
          <br /> {subHeading}
        </Typography>
      </Box>

      <Slider className="freelancer-card-styles" {...freelancerFirstRowSliderSettings}>
        {freelancerCardData?.firstSliderData?.freelancers?.map(item => (
          <Box className="slick-slide" key={item?.id}>
            <FreelancerCard freelancer={item} key={item.id} />
          </Box>
        ))}
      </Slider>

      <Slider className="freelancer-card-styles mt-3" {...freelancerMiddleRowSliderSettings}>
        {freelancerCardData?.secondSliderData?.freelancers?.map(item => (
          <Box className="slick-slide" key={item?.id}>
            <FreelancerCard freelancer={item} key={item.id} />
          </Box>
        ))}
      </Slider>

      <Slider className="freelancer-card-styles mt-3" {...freelancerLastRowSliderSettings}>
        {freelancerCardData?.thirdSliderData?.freelancers?.map(item => (
          <Box className="slick-slide" key={item?.id}>
            <FreelancerCard freelancer={item} key={item.id} />
          </Box>
        ))}
      </Slider>

      <Box className="text-center mt-3 mt-sm-3 mt-md-5">
        <Button color="secondary" variant="contained" className="px-4">
          Become a Seller
        </Button>
      </Box>
    </Container>
  );
}

export default CommunityFreelancers;
