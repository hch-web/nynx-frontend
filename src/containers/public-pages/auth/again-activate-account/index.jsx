import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';

// custom hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// services
import { useAgainActivateAccountMutation } from 'services/public/auth';

// assets
import logo from 'assets/nav-logo-dark_auth.png';

// components
import SubmitButton from 'containers/common/components/SubmitButton';

function AccountActivation() {
  const { activationToken } = useParams();

  const [againActivateAccount, { isSuccess: activateSuccess, isLoading: activateLoading, error }] = useAgainActivateAccountMutation();

  const navigate = useNavigate();
  useHandleApiResponse(error);

  useEffect(() => {
    if (activateSuccess) {
      navigate('/auth/login', { replace: true });
    }
  }, [activateSuccess]);

  const handleSubmit = e => {
    e.preventDefault();
    againActivateAccount(activationToken);
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ height: '100vh', background: '#FFF6EC' }}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <Link to="/">
          <img src={logo} alt="main" />
        </Link>
        <Typography variant="h6" className="mt-3 mb-5 text-center ">
          You will need to again activate your account
        </Typography>

        <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
          <SubmitButton title="Continue " className="my-2" isLoading={activateLoading} />
        </form>
      </Grid>
    </Grid>
  );
}

export default AccountActivation;
