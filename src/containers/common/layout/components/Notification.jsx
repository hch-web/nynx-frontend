import React, { useEffect } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CircleIcon from '@mui/icons-material/Circle';
import moment from 'moment-timezone';

// CUSTOM HOOKS
import { useReadNotificationMutation, useLazyGetNotificationsQuery } from 'services/private/notifications';
import useGetGlobalAppContext from 'custom-hooks/useGetGlobalAppContext';

// styles
import styles from 'styles/portal/layout/navbar.module.scss';

// constants
import {
  DARK_PURPLE,
  DARK_GREY,
  SENT_MESSAGE,
  ACCEPTED_PROPOSAL,
  TIP,
  REVIEW,
  REQUESTED_REVISION,
  PLACED_A_NEW_TASK,
  DELIVERY_ACCEPTED,
  CUSTOM_JOB_OFFER,
  SENT_TASK_DELIVERY_REQUEST,
  ACCEPT_TO_CHANGE_TERMS,
  AUTOMATICALLY_DONE,
  UPDATED_TASK,
  REFUND_REQUEST,
  DEFAULT_NOTIFICATION_LIMIT,
  CLIENT_ORDER,
  DIRECT_HIRE,
  JOB_OFFER,
  DELIVERY_TIME_IS_END_CLIENT,
  DELIVERY_TIME_IS_END_FREELANCER,
  DELIVERY_TIME_IS_WITH_IN_HOUR_FOR_CLIENT,
  DELIVERY_TIME_IS_WITH_IN_HOUR_FOR_FREELANCER,
} from 'utilities/constants';

import {
  notificationImageResponsiveStyles,
  notificationImageStyles,
  notificationSenderImageStyles,
  notificationIsReadStyles,
  notificationItemStyles,
} from 'styles/mui/portal/navbar-styles';
import { formatName } from 'utilities/helpers';
import { isSenderOnline } from '../portal/utilities/helper';

const singleTaskManagementConstants = [
  REVIEW,
  DELIVERY_ACCEPTED,
  REQUESTED_REVISION,
  SENT_TASK_DELIVERY_REQUEST,
  ACCEPT_TO_CHANGE_TERMS,
  AUTOMATICALLY_DONE,
  UPDATED_TASK,
  REFUND_REQUEST,
  TIP,
  DELIVERY_TIME_IS_END_CLIENT,
  DELIVERY_TIME_IS_END_FREELANCER,
  DELIVERY_TIME_IS_WITH_IN_HOUR_FOR_CLIENT,
  DELIVERY_TIME_IS_WITH_IN_HOUR_FOR_FREELANCER,
];

const workspaceConstants = [PLACED_A_NEW_TASK, ACCEPTED_PROPOSAL];

function Notification({ notification, setNotifications }) {
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);

  const [readNotification] = useReadNotificationMutation();
  const [getNotifications, { data: notificationData, isSuccess: notificationDataSuccess }] = useLazyGetNotificationsQuery();

  const { users: onlineUsers } = useGetGlobalAppContext();

  // constants
  const isBuyer = userInfo?.is_buyer;
  const senderFirstName = notification?.sender_first_name;
  const senderLastName = notification?.sender_last_name;
  const senderUserName = notification?.sender_name;
  const isRead = !notification?.notification_is_read;
  const isMessageNotification = notification?.notification_type === SENT_MESSAGE;
  const isDescriptionLarge = notification?.description?.length > 20;
  const description = isDescriptionLarge
    ? `${notification?.description.substring(0, 20)}...`
    : notification?.description;
  const isGigTitleLarge = notification?.gig_title?.length > 16;
  const footerText = isGigTitleLarge
    ? `${notification?.gig_title.substring(0, 16)}...`
    : notification?.gig_title;
  const createdDate = notification?.notification_created_at
    ? moment.tz(notification?.notification_created_at, userInfo?.timezone_label).startOf('minutes').fromNow()
    : '';

  const handleNavigate = notificationResponseData => {
    const type = notificationResponseData?.notification_type;
    const isJobOffer = notificationResponseData?.task_via === JOB_OFFER;
    const offerId = isJobOffer ? notificationResponseData?.job_offer : notificationResponseData?.client_order;
    const taskVia = notificationResponseData?.task_via === CLIENT_ORDER ? DIRECT_HIRE : JOB_OFFER;

    if (type === SENT_MESSAGE) {
      if (isBuyer) navigate('/portal/client/chat');
      else navigate('/portal/freelancer/chat');
    } else if (type === TIP) {
      navigate('/portal/freelancer/analytics');
    } else if (type === CUSTOM_JOB_OFFER) {
      navigate('/portal/client/chat');
    } else if (singleTaskManagementConstants.includes(type)) {
      navigate(`/portal/workspace/${notificationResponseData?.workspace}/task/${offerId}/${taskVia}`);
    } else if (workspaceConstants.includes(type)) {
      navigate('/portal/freelancer/workspace');
    }
  };

  const handleReadNotifications = async () => {
    const res = await readNotification({ id: notification?.id, isRead: true });
    if (res?.data) {
      await getNotifications({ limit: DEFAULT_NOTIFICATION_LIMIT, offset: 0 });
      handleNavigate(res?.data);
    }
  };

  useEffect(() => {
    if (notificationDataSuccess) setNotifications(notificationData?.results);
  }, [notificationDataSuccess, notificationData]);

  return (
    <Box
      className="p-3 w-100 pointer position-relative"
      sx={isRead ? notificationIsReadStyles : notificationItemStyles}
      onClick={handleReadNotifications}
    >
      <Box className="d-flex justify-content-end">
        <Typography varaint="caption" color={DARK_GREY} sx={{ position: 'absolute', top: 0 }}>
          <span style={{ fontSize: '11px' }}>{createdDate}</span>
        </Typography>
      </Box>

      <Box className="d-flex">
        <Box className="d-flex gap-2">
          <Box className="position-relative align-self-start">
            <Avatar
              src={notification?.sender_image || ''}
              alt={senderFirstName}
              sx={notificationSenderImageStyles}
            />

            <Box className="d-flex justify-content-end ">
              <CircleIcon
                className={
                  isSenderOnline(onlineUsers, notification?.sender)
                    ? styles.avatarOnlineIcon
                    : styles.avatarOfflineIcon
                }
              />
            </Box>
          </Box>

          <Box className="d-flex gap-1 flex-wrap align-items-center">
            <Typography variant="h6" color={DARK_PURPLE} className="weight-500">
              {formatName(senderFirstName, senderLastName, senderUserName)}
            </Typography>

            <Typography variant="body1" color={DARK_PURPLE} className="weight-400">
              {notification?.plain_text}
            </Typography>

            <Typography variant="body1" color={DARK_PURPLE} className="weight-600">
              {notification?.heading}
            </Typography>

            <Typography variant="body1" color={DARK_GREY} className="weight-400">
              {description}
            </Typography>

            <Typography varaint="caption" className="mt-1 d-flex align-items-center " color={DARK_GREY}>
              {footerText}
            </Typography>
          </Box>
        </Box>

        <Box
          className="d-flex justify-content-end align-items-end"
          sx={{ ...notificationImageResponsiveStyles, transform: isMessageNotification && 'scale(0.5)' }}
        >
          <Box
            sx={{
              background: `url(${notification?.notification_image}) center no-repeat `,
              ...notificationImageStyles,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

Notification.propTypes = {
  notification: propTypes.object.isRequired,
  setNotifications: propTypes.func.isRequired,
};

export default Notification;
