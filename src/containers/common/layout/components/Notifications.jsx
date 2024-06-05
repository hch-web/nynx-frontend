import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Box, Typography, Divider, useTheme, Button } from '@mui/material';
import { useSelector } from 'react-redux';

// API HOOKS & CUSTOM HOOKS
import {
  useLazyGetNotificationsQuery,
  useReadAllNotificationsMutation,
} from 'services/private/notifications/index';
import useConnectWebSocket from 'custom-hooks/useConnectWebSocket';

// ASSETS & STYLES & UTILITIES
import notificationImg from 'assets/notificationImg.svg';
import styles from 'styles/portal/layout/navbar.module.scss';
import {
  notificationContainerStyles,
  notificationListStyles,
  notificationUnreadIconStyles,
} from 'styles/mui/portal/navbar-styles';
import { DEFAULT_NOTIFICATION_LIMIT } from 'utilities/constants';
import Notification from './Notification';
import { getNotificationUrl } from '../portal/utilities/socket-url';
import { findUnreadNotificationCount } from '../portal/utilities/helper';

function Notifications() {
  const theme = useTheme();
  const colors = theme.palette;
  const lightGrey = colors.grey.light;

  const notificationContainerRef = useRef(null);

  const [notifications, _setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(null);

  // API HOOKS
  const [getNotifications] = useLazyGetNotificationsQuery();
  const [readAllNotifications] = useReadAllNotificationsMutation();

  const socket = useConnectWebSocket(getNotificationUrl());
  const { userInfo } = useSelector(state => state.auth);

  // refs
  const notificationStateRef = useRef(notifications);
  const notificationCountRef = useRef(null);

  // CUSTOM STATE SETTER
  const setNotifications = data => {
    notificationStateRef.current = data;
    _setNotifications(data);
    setUnreadNotifications(findUnreadNotificationCount(data));
  };

  // WEB-SOCKET
  useEffect(() => {
    if (socket) {
      socket.onmessage = e => {
        const data = JSON.parse(e.data);
        const isMineNotification = data.receiver === userInfo?.id;

        if (isMineNotification) {
          const updatedNotificationsList = [data, ...notificationStateRef.current];
          setNotifications(updatedNotificationsList);
        }
      };
    }
  }, [socket]);

  // GET PREVIOUS NOTIFICATIONS HANDLER
  const getPrevNotifications = async () => {
    getNotifications({ limit: DEFAULT_NOTIFICATION_LIMIT, offset: notificationStateRef.current.length }).then(
      res => {
        notificationCountRef.current = res?.data?.count;
        const data = [...notificationStateRef.current, ...res.data.results];

        const filteredData = data.filter(
          (item, idx, array) => array.findIndex(value => value.id === item.id) === idx
        );
        setNotifications(filteredData);
      }
    );
  };

  // GET NOTIFICATIONS ON FIRST RENDER
  useEffect(() => {
    const handleGetInitialNotifications = async () => {
      const res = await getNotifications({ limit: DEFAULT_NOTIFICATION_LIMIT, offset: 0 });
      notificationCountRef.current = res?.data?.count;
      setNotifications(res?.data?.results);
    };

    handleGetInitialNotifications();
  }, []);

  // GET PREVIOUS NOTIFICATIONS ON SCROLL TO TOP
  useEffect(() => {
    notificationContainerRef.current?.addEventListener('scroll', () => {
      const container = notificationContainerRef.current;
      const isScrollBarAtEnd = container.scrollTop === container.scrollHeight - container.offsetHeight;
      const isAvailableNotificationLessThanCount = notificationStateRef.current.length < notificationCountRef.current;

      if (isScrollBarAtEnd && isAvailableNotificationLessThanCount) {
        getPrevNotifications();
      }
    });

    return () => {
      notificationContainerRef.current?.removeEventListener('scroll', () => {});
    };
  }, [notificationContainerRef?.current]);

  // HANDLERS
  const handleReadAllNotifications = async () => {
    await readAllNotifications();
    const getNotificationsResp = await getNotifications({ limit: DEFAULT_NOTIFICATION_LIMIT });
    setNotifications(getNotificationsResp?.data?.results);
  };

  // constants
  const isUnreadNotificationsAvailable = useMemo(
    () => unreadNotifications > 0,
    [unreadNotifications, notifications]
  );

  return (
    <Box className={`${styles.notifications} dropdown`}>
      <Box className="ms-3 notification-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        {isUnreadNotificationsAvailable && <Box sx={notificationUnreadIconStyles}>{unreadNotifications}</Box>}
        <img src={notificationImg} alt="notification-main" />
      </Box>

      <Box className="dropdown-menu mt-3 py-1" aria-labelledby="skillMenu" sx={notificationContainerStyles}>
        <Box className="d-flex align-items-center justify-content-between px-3 py-2">
          <Typography variant="body1">Recent Activities {`(${unreadNotifications})`}</Typography>

          <Button variant="contained" className="px-3 py-1" onClick={handleReadAllNotifications}>
            Read All
          </Button>
        </Box>

        <Box sx={notificationListStyles} ref={notificationContainerRef}>
          {notifications?.map(element => (
            <Box key={element.id}>
              <Notification notification={element} setNotifications={setNotifications} />

              <Divider className="divider" sx={{ color: lightGrey }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Notifications;
