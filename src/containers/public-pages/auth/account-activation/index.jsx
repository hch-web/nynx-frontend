import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Assets
import logo from 'assets/nav-logo-dark_auth.png';

// Custom Hooks
import useHandleApiResponse from 'custom-hooks/useHandleApiResponse';

// Services
import { useLazyActivateAccountQuery } from 'services/public/auth';

// Components
import SubmitButton from 'containers/common/components/SubmitButton';

function AccountActivation() {
  const { activationToken } = useParams();
  const [activateAccount, { isLoading, isSuccess, error }] = useLazyActivateAccountQuery();
  const navigate = useNavigate();
  useHandleApiResponse(error);

  useEffect(() => {
    if (isSuccess) {
      navigate('/auth/login', { replace: true });
    }
  }, [isSuccess]);

  const handleSubmit = e => {
    e.preventDefault();
    activateAccount(activationToken);
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
          You will need to activate your account for
          <br /> complete registration!
        </Typography>

        <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
          <SubmitButton title="Continue " className="my-2" isLoading={isLoading} />
        </form>
      </Grid>
    </Grid>
  );
}

export default AccountActivation;
