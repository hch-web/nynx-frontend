import { getToken } from 'utilities/utility-functions';

export const getNotificationUrl = () => `${process.env.REACT_APP_SOCKET_URL}/notification/detail/?token=${getToken()}`;

export const named = {};
