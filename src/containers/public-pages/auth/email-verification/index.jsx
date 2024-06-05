import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import emailVerify from 'assets/email-verification.png';
import logo from 'assets/nav-logo-dark_auth.png';
import { useSelector } from 'react-redux';
import { useForgotPasswordLinkMutation } from 'services/public/auth';
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

function EmailVerification() {
  const { email } = useSelector(state => state.auth);
  const [minute, setMinute] = useState(60);
  const [disablebtn, setDisablebtn] = useState(true);
  const [forgotPassword, { error, isSuccess, data }] = useForgotPasswordLinkMutation();
  const successMessage = data && data.message;

  useHandleApiResponse(error, isSuccess, successMessage);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (minute < 1) {
        setDisablebtn(false);
        setMinute(60);
      } else if (minute > 0 && disablebtn) setMinute(minute - 1);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [minute, disablebtn]);

  const resendEmail = () => {
    setDisablebtn(true);
    forgotPassword({ email });
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ height: '100vh' }}
        className="d-flex justify-content-end align-items-center flex-column position-relative"
      >
        <div className="d-flex flex-column align-items-center mb-5">
          <Link to="/">
            <img src={logo} alt="main" />
          </Link>
          <Typography variant="h6" className="my-3">
            Verify Your Email
          </Typography>
          <Typography variant="subtitle1" className="text-center text-muted">
            We have sent an email to <span className="text-black">{email}</span>
            <br />
            please follow a link to verify your email
          </Typography>
          <Box className="d-flex">
            <Typography variant="subtitle1" className="text-center text-muted my-3">
              Have not received email ?
            </Typography>
            <Typography variant="subtitle1" className="text-center my-3 ms-2 fw-bold" color="#FAC751">
              {disablebtn && `${minute} s`}
            </Typography>
          </Box>
          <Button variant="contained" color="secondary" className="px-5" disabled={disablebtn} onClick={resendEmail}>
            Resend Email
          </Button>
        </div>
        <img src={emailVerify} alt="main" className="email-verify-img" />
      </Grid>
    </Grid>
  );
}

export default EmailVerification;
