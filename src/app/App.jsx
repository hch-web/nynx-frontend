import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAuthorizedQuery } from 'services/private/auth';
import { onLoggedIn, onLoggedOut } from 'store/slices/authSlice';
import { useDispatch } from 'react-redux';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// CUSTOM HOOKS
import useConnectWebSocket from 'custom-hooks/useConnectWebSocket';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

// Components & Utilities
import customTheme from 'styles/mui/generalCustomTheme';
import { getCancelPayoutURL, getUserOnlineURL } from 'utilities/socket-urls';
import GlobalAppContext from 'contexts/GlobalAppContext';
import AppRoutes from '../routes';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

function App() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [chatUsers, setChatUsers] = useState([]);
  const [webSocket, setWebSocket] = useState({});
  const [cancelPayoutSocket, setCancelPayoutSocket] = useState({});
  // const [clientSecret, setClientSecret] = useState(null);

  const socket = useConnectWebSocket(getUserOnlineURL());
  const cancelSocket = useConnectWebSocket(getCancelPayoutURL());

  const { data, isError, isLoading, isSuccess } = useAuthorizedQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(onLoggedIn(data));
      // setClientSecret(data?.stripe_client_secret);
    } else if (isError) dispatch(onLoggedOut());
  }, [data, dispatch, isError, isSuccess]);

  useEffect(() => {
    if (socket) {
      setWebSocket(socket);
    }
  }, [socket]);

  useEffect(() => {
    if (cancelSocket) {
      setCancelPayoutSocket(cancelSocket);
    }
  }, [cancelSocket]);

  if (socket) {
    socket.onmessage = e => {
      const socketData = JSON.parse(e.data);

      if (Array.isArray(socketData)) {
        setChatUsers(socketData);
      } else {
        setChatUsers([socketData]);
      }
    };
  }

  if (cancelSocket) {
    cancelSocket.onmessage = e => {
      const socketData = JSON.parse(e.data);

      if (socketData?.message) {
        enqueueSnackbar(socketData?.message || 'Payment failed', { variant: 'error' });
      }
    };
  }

  const handleUpdateSocket = createdSocket => {
    setWebSocket(createdSocket);
  };

  const updateCancelPayoutSocket = createdSocket => {
    setCancelPayoutSocket(createdSocket);
  };

  const globalSocketProviderValue = useMemo(
    () => ({
      onlineSocket: socket,
      users: chatUsers,
      handleUpdateSocket,
      cancelPayoutSocket,
      updateCancelPayoutSocket,
    }),
    [socket, chatUsers, cancelSocket, webSocket]
  );

  return (
    <ThemeProvider theme={customTheme}>
      {/* <Elements stripe={stripePromise} options={{ clientSecret: clientSecret || undefined }}> */}
      {/* <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID }}> */}
      <GlobalAppContext.Provider value={globalSocketProviderValue}>
        {!isLoading && <AppRoutes />}
      </GlobalAppContext.Provider>
      {/* </PayPalScriptProvider> */}
      {/* </Elements> */}
    </ThemeProvider>
  );
}

export default App;
