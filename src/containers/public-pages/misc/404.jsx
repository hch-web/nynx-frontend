import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import notFoundImage from '../../../assets/404.png';

// CUSTOM STYLES
import styles from '../../../styles/public-pages/404/not-found.module.scss';

function NotFound() {
  return (
    <Grid container>
      <Grid item xs={12} className="d-flex flex-column align-items-center justify-content-center vh-100">
        <img src={notFoundImage} alt="main" className={`${styles.notFoundImage} px-3 px-sm-3 px-md-3`} />
        <Typography variant="h6" className="my-4">
          Seems there is nothing here
        </Typography>
        <Link to="/login" className="text-decoration-none">
          <Button color="primary" variant="outlined">
            Return Home
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default NotFound;
