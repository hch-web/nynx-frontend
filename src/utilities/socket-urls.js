import { getToken } from 'utilities/utility-functions';

export const getWsActivityURL = workspaceId => `${process.env.REACT_APP_SOCKET_URL}/workspace/activity/chat/?token=${getToken()}&workspace=${workspaceId}`;
export const onlineSocketURL = `${process.env.REACT_APP_SOCKET_URL}/online/status/?token=`;
export const getUserOnlineURL = () => `${process.env.REACT_APP_SOCKET_URL}/online/status/?token=${getToken()}`;
export const getCancelPayoutURL = () => `${process.env.REACT_APP_SOCKET_URL}/payment/notification/?token=${getToken()}`;
