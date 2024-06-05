import React from 'react';
import { Box, Grid, Typography, useTheme, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Assets
import navLogoLight from 'assets/nav-logo.svg';

// Styles
import styles from 'styles/public-pages/layout/footer.module.scss';
import { footerLinksStyles, footerDividerStyles } from 'styles/mui/public-pages/layout/footer-styles';

// Component
import FooterTopSection from 'containers/common/layout/public/components/FooterTopSection';
import { footerContainerStyles } from 'styles/mui/components/footer-top-sections-styles';

function Footer({ footerText, footerBgColor, textColor, btnBg, btnText }) {
  const theme = useTheme();
  const colors = theme.palette;

  const dateObject = new Date();
  const currentYear = dateObject.getFullYear();

  return (
    <>
      <FooterTopSection
        footerText={footerText}
        footerBgColor={footerBgColor}
        textColor={textColor}
        btnBg={btnBg}
        btnText={btnText}
      />
      <Box sx={footerContainerStyles} className={styles.footerBox}>
        {/* FOOTER MAIN BODY LINKS */}
        <Box className="d-flex justify-content-center">
          <Grid
            container
            className={`container-max-width justify-content-center justify-content-sm-center justify-content-md-start  my-0 ${styles.footerMain}`}
            spacing={2}
            sx={footerLinksStyles}
          >
            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              lg={3}
              xl={3}
              className="d-flex flex-column align-items-center align-items-sm-center align-items-md-center align-items-lg-start"
            >
              <Typography variant="h6" color={colors.lightBlue.main} className="mb-3">
                For Clients
              </Typography>
              <Link to="/how-it-works-for-clients" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  How it Works
                </Typography>
              </Link>
              <Link to="/find-service" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  Find Services
                </Typography>
              </Link>
              <Link to="/portal/client/dashboard" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  Dashboard
                </Typography>
              </Link>
              <Link to="/portal/client/workspace/create" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  Post a Job
                </Typography>
              </Link>
            </Grid>

            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              lg={3}
              xl={3}
              className="d-flex flex-column align-items-center align-items-sm-center align-items-md-center align-items-lg-start"
            >
              <Typography variant="h6" color={colors.lightBlue.main} className="mb-3">
                For Experts
              </Typography>
              <Link to="/how-it-works-for-freelancer" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  How it works
                </Typography>
              </Link>
              <Link to="/freelancer/buyer-request" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  Client Requests
                </Typography>
              </Link>
              <Link to="/portal/freelancer/dashboard" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  Dashboard
                </Typography>
              </Link>
              <Link to="/freelancer/submitted-proposals" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  All proposals
                </Typography>
              </Link>
            </Grid>

            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              lg={3}
              xl={3}
              className="d-flex flex-column align-items-center align-items-sm-center align-items-md-center align-items-lg-start"
            >
              <Typography variant="h6" color={colors.lightBlue.main} className="mb-3">
                Company
              </Typography>
              <Link to="/about" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  About Nynx
                </Typography>
              </Link>
              <Link to="/" className="text-decoration-none">
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  Careers
                </Typography>
              </Link>
            </Grid>

            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              lg={3}
              xl={3}
              className="d-flex flex-column align-items-center align-items-sm-center align-items-md-center align-items-lg-start"
            >
              <Typography variant="h6" color={colors.lightBlue.main} className="mb-3">
                Follow us
              </Typography>
              <a
                href="https://www.facebook.com/nynxcreatives"
                target="_blank"
                className="text-decoration-none"
                rel="noreferrer"
              >
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  Facebook
                </Typography>
              </a>
              <a
                href="https://www.linkedin.com/company/nynxcreatives/?viewAsMember=true"
                target="_blank"
                className="text-decoration-none"
                rel="noreferrer"
              >
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  Linkedin
                </Typography>
              </a>
              <a
                href="https://www.instagram.com/nynx_workspace/"
                target="_blank"
                className="text-decoration-none"
                rel="noreferrer"
              >
                <Typography variant="body1" color="white" className="mb-2 footer-link-item">
                  Instagram
                </Typography>
              </a>
            </Grid>
          </Grid>
        </Box>

        <Box sx={footerDividerStyles}>
          <Divider sx={{ color: colors.lightBlue.main, height: '2px' }} />
        </Box>

        {/* BOTTOM FOOTER */}
        <Box className="d-flex justify-content-center">
          <Grid
            container
            justifyContent="space-between"
            py="20px"
            className={`${styles.footerResponsiveLayout} container-max-width`}
          >
            <Grid item className="d-flex gap-4 align-items-center">
              <img src={navLogoLight} alt="logo" />
              <Typography variant="body2" color="white">
                © {currentYear} nynx creatives ltd
              </Typography>
            </Grid>

            <Grid item className="d-flex">
              <Link to="/privacy-policy" className="text-decoration-none mx-2">
                <Typography variant="body2" color="white">
                  Privacy Policy
                </Typography>
              </Link>

              <Link to="/terms-of-service" className="text-decoration-none mx-2">
                <Typography variant="body2" color="white">
                  Terms of Services
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

Footer.propTypes = {
  footerText: PropTypes.string,
  footerBgColor: PropTypes.string,
  textColor: PropTypes.string,
  btnBg: PropTypes.string,
  btnText: PropTypes.string,
};

Footer.defaultProps = {
  footerText: '',
  footerBgColor: '',
  textColor: '',
  btnBg: '',
  btnText: '',
};

export default Footer;
