import React, { memo } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import propTypes from 'prop-types';

// STYLES & COMPONENTS * UTILITIES
import {
  heroImgAnimationConfig,
  leftBoxAnimationConfig,
  leftReviewMsgBoxStyles,
  rightBottomBoxAnimationConfig,
  rightBottomReviewAvatarStyles,
  rightBottomReviewMsgBoxStyles,
  rightTopBoxAnimationConfig,
  rightTopReviewAvatarStyles,
  rightTopReviewMsgBoxStyles,
} from 'styles/public-pages/homepage/homepage-styles';
import { heroMainImage } from 'styles/mui/public-pages/homepage/home-styles';
import profileIcon1 from 'assets/homepage/profile-icon1.png';
import profileIcon2 from 'assets/homepage/profile-icon2.png';
import profileIcon3 from 'assets/homepage/profile-icon3.png';
import ReviewBox from './ReviewBox';

function HeroContainerGridImage({ image }) {
  const { palette } = useTheme();
  const yellow = palette.yellow.main;
  const lightOrange = palette.lightOrange.main;

  // ANIMATIONS
  const leftBoxAnimation = useSpring(leftBoxAnimationConfig);

  const rightTopBoxAnimation = useSpring(rightTopBoxAnimationConfig);

  const rightBottomBoxAnimation = useSpring(rightBottomBoxAnimationConfig);

  const imageAnimation = useSpring(heroImgAnimationConfig);

  return (
    <Box className="mw-100 position-relative">
      <animated.div style={imageAnimation}>
        <Box
          sx={{
            background: `url(${image}) top right no-repeat`,
            ...heroMainImage,
          }}
        />
      </animated.div>

      {/* LEFT IMAGE REVIEW BOX */}
      <animated.div className="position-absolute" style={leftBoxAnimation}>
        <Box>
          <ReviewBox
            sender="Sarah"
            professionLabel="UI UX designer"
            senderTextColor={yellow}
            boxStyles={leftReviewMsgBoxStyles}
            image={profileIcon1}
          >
            <Typography variant="body2" className="d-inline me-1" color="#F7625A">
              @Dan,
            </Typography>

            <Typography variant="body2" className="d-inline">
              Yeah, it looks amazing.
            </Typography>
          </ReviewBox>
        </Box>
      </animated.div>

      {/* RIGHT TOP IMAGE REVIEW BOX */}
      <animated.div className="position-absolute" style={rightTopBoxAnimation}>
        <ReviewBox
          sender="Dan"
          professionLabel="Client"
          senderTextColor="#32C850"
          boxStyles={rightTopReviewMsgBoxStyles}
          avatarStyles={rightTopReviewAvatarStyles}
          image={profileIcon2}
        >
          <Typography variant="body2" className="d-inline me-1">
            Looks great, I like it!
          </Typography>

          <Box>
            <Typography className="d-inline" color={lightOrange}>
              @Sarah,
            </Typography>

            <Typography variant="body2" className="d-inline">
              What do you think?
            </Typography>
          </Box>
        </ReviewBox>
      </animated.div>

      {/* RIGHT BOTTOM IMAGE REVIEW BOX */}
      <animated.div className="position-absolute" style={rightBottomBoxAnimation}>
        <ReviewBox
          sender="Zac"
          professionLabel="Logo Designer"
          senderTextColor={lightOrange}
          boxStyles={rightBottomReviewMsgBoxStyles}
          avatarStyles={rightBottomReviewAvatarStyles}
          image={profileIcon3}
        >
          <Typography variant="body2" className="d-inline me-1">
            Thank you for the feedback guys.
          </Typography>
        </ReviewBox>
      </animated.div>
    </Box>
  );
}

HeroContainerGridImage.propTypes = {
  image: propTypes.string,
};

HeroContainerGridImage.defaultProps = {
  image: '',
};

export default memo(HeroContainerGridImage);
