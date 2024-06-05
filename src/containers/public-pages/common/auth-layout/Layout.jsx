import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import logo from 'assets/nav-logo-dark_auth.png';
import styles from 'styles/public-pages/authLayout/layout-wrapper.module.scss';

function Layout({ children, heading, subHeading, loginImage, signupImage }) {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xl={5}
        sx={{
          background: signupImage ? '#ffe3c5' : '#FEA87E',
          position: 'relative',
        }}
        className={`flex-column justify-content-start align-items-center p-5 text-center ${styles.leftPanel}`}
      >
        <Link to="/">
          <img src={logo} alt="main" className="pt-3 mt-5 mb-3" />
        </Link>

        {heading && (
          <Typography variant="h5" className={`${styles.subHeading} mb-3`}>
            {heading}
          </Typography>
        )}

        {subHeading && (
          <Typography variant="h6" className="paragraph">
            Sign up. Grow your business. Make a difference
          </Typography>
        )}

        {loginImage ? (
          <img src={loginImage} alt="main" className={`${styles.loginImage} ${styles.leftPaneImage}`} />
        ) : (
          <img src={signupImage} alt="main" className={`signup-image ${styles.leftPaneImage}`} />
        )}
      </Grid>
      <Grid item xs={12} sm={12} lg={12} xl={7} sx={{ background: '#fff6ec' }}>
        {children}
      </Grid>
    </Grid>
  );
}

Layout.propTypes = {
  children: propTypes.element.isRequired,
  heading: propTypes.string,
  subHeading: propTypes.string,
  loginImage: propTypes.string,
  signupImage: propTypes.string,
};

Layout.defaultProps = {
  heading: '',
  subHeading: '',
  loginImage: '',
  signupImage: '',
};

export default Layout;
