/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography, useTheme, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// SERVICES
import { useLazyFooterTopSectionQuery } from 'services/public/footer';

// STYLES
import styles from 'styles/public-pages/layout/footer.module.scss';
import {
  ABOUT,
  ABOUT_NYNX,
  CATEGORIES_PAGE,
  FIND_SERVICES,
  HOW_IT_WORKS_FOR_CLIENT,
  HOW_IT_WORKS_FOR_FREELANCER,
  HOW_IT_WORK_CLIENT,
  HOW_IT_WORK_FREELANCER,
} from 'utilities/constants';
import { footerImageStyles } from 'styles/mui/components/footer-top-sections-styles';

function FooterTopSection({ footerBgColor, textColor, btnBg, btnText }) {
  const { pathname } = useLocation();
  const theme = useTheme();
  const { isAuthenticated } = useSelector(state => state.auth);

  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const paleOrange = colors.paleOrange.main;

  const [footerTopSection, { data: footerTopSectionData }] = useLazyFooterTopSectionQuery();

  const contactUsRoute = pathname === '/contact-us';
  const createGigPageRoute = pathname === '/profile/12/create-gig';
  const homePageRoute = pathname === '/';

  const conditionalTextForFooter = async () => {
    if (pathname.includes(HOW_IT_WORKS_FOR_CLIENT)) {
      await footerTopSection({ currentPage: HOW_IT_WORK_CLIENT });
    } else if (pathname.includes(HOW_IT_WORKS_FOR_FREELANCER)) {
      await footerTopSection({ currentPage: HOW_IT_WORK_FREELANCER });
    } else if (pathname.includes(ABOUT)) {
      await footerTopSection({ currentPage: ABOUT_NYNX });
    } else if (pathname.includes(FIND_SERVICES)) {
      await footerTopSection({ currentPage: CATEGORIES_PAGE });
    } else {
      await footerTopSection();
    }
  };

  useEffect(() => {
    conditionalTextForFooter();
  }, [pathname]);

  // Constants
  const mainHeading = footerTopSectionData?.main_heading;
  const image = footerTopSectionData?.image;

  return (
    <Box>
      {contactUsRoute || createGigPageRoute ? null : homePageRoute ? (
        <Box sx={{ background: darkPurple }}>
          <Container variant="public" className="py-0 mb-0">
            <Grid container>
              <Grid
                item
                sm={12}
                md={8}
                className="d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start h-100"
                sx={{ padding: '6vw 0' }}
              >
                <Typography variant="h2" color={paleOrange}>
                  {mainHeading}
                </Typography>
                {!isAuthenticated && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      '@media only screen and (max-width: 467px)': {
                        padding: '6px 10px',
                      },
                    }}
                    className="mt-4"
                  >
                    Get Started
                  </Button>
                )}
              </Grid>

              <Grid
                item
                sm={6}
                md={4}
                className="d-none d-sm-none d-md-flex align-items-end justify-content-center pt-4"
              >
                <Box
                  sx={{
                    background: `url(${image}) center no-repeat`,
                    ...footerImageStyles,
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <Box
          sx={{
            background: footerBgColor,
          }}
          className="d-flex justify-content-center py-2"
        >
          <Container variant="public" className={`${styles.getStartedBox} w-100 my-0`}>
            <Grid
              container
              className={`${styles.footerResponsiveContainer} justify-content-between align-items-center py-0 pb-2 pb-sm-2 pb-md-2 text-center text-lg-start my-0`}
              spacing={1}
            >
              <Grid item xs={12} sm={12} md="auto" lg="auto">
                <Typography
                  variant="h3"
                  sx={{ fontWeight: '500', textTransform: 'capitalize' }}
                  color={textColor}
                  className={styles.footerText}
                >
                  {mainHeading}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md="auto" lg="auto">
                {!isAuthenticated && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      background: btnBg,
                      color: btnText,
                      '&:hover': {
                        background: btnBg,
                        color: '#020202',
                      },
                      '@media only screen and (max-width: 467px)': {
                        padding: '6px 10px',
                      },
                    }}
                  >
                    Get Started
                  </Button>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
}

FooterTopSection.propTypes = {
  footerBgColor: PropTypes.string,
  textColor: PropTypes.string,
  btnBg: PropTypes.string,
  btnText: PropTypes.string,
};

FooterTopSection.defaultProps = {
  footerBgColor: '',
  textColor: '',
  btnBg: '',
  btnText: '',
};
export default FooterTopSection;
