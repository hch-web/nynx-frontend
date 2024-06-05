import React from 'react';
import { Box, Typography, Avatar, useTheme } from '@mui/material';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';

// styles
import {
  activeUserContainerStyles,
  userInfoContainerStyles,
  userProfileImageStyles,
} from 'styles/mui/portal/chat-box-styles';

// HOOK
import useWindowDimensions from 'custom-hooks/useWindowDimensions';

// utlities
import { formatName } from 'utilities/helpers';

function User({ user, setChatRoomId, chatRoomId, setSelectedUser, setShowUserList }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { userInfo } = useSelector(state => state.auth);

  const { width } = useWindowDimensions();

  // constants
  const isOwner = userInfo?.id === user?.owner_id;
  const firstName = isOwner ? user?.partner_first_name : user?.owner_first_name;
  const lastName = isOwner ? user?.partner_last_name : user?.owner_last_name;
  const userName = isOwner ? user?.response?.partner_username : user?.owner_username;
  const image = isOwner ? user?.partner_image : user?.owner_image;
  const isLastMessage = user?.last_message;
  const lastMessageTextCheckSendByMe = isLastMessage ? user?.is_my_msg && 'Me:' : '';
  const isLastMessageLarger = user?.last_message?.length > 15;
  const lastMessage = isLastMessageLarger ? `${user?.last_message?.substring(0, 15)}...` : user?.last_message;

  const handleSelectRoom = () => {
    if (width < 990) setShowUserList(false);
    const userId = isOwner ? user?.partner_id : user?.owner_id;
    const selectedUserFirstName = isOwner ? user?.partner_first_name : user?.owner_first_name;
    const selectedUserLastName = isOwner ? user?.partner_last_name : user?.owner_last_name;
    const selectedUserName = isOwner ? user?.response?.partner_username : user?.owner_username;
    setSelectedUser({ userId, selectedUserFirstName, selectedUserLastName, selectedUserName });
    setChatRoomId(user?.room_id);
  };

  const createdDate = user?.last_message_time
    ? moment.tz(user?.last_message_time, userInfo?.timezone_label).startOf('minutes').fromNow()
    : '';

  return (
    <Box
      className="d-flex w-100 align-items-start p-3"
      sx={chatRoomId === user?.room_id ? activeUserContainerStyles : userInfoContainerStyles}
      onClick={handleSelectRoom}
    >
      <Avatar src={image} alt={userName} className="pointer me-2" sx={userProfileImageStyles} />
      <Box className="flex-grow-1">
        <Box className="w-100 d-flex justify-content-between align-items-center mt-1">
          <Typography variant="h6">{formatName(firstName, lastName, userName)}</Typography>
          <Typography variant="caption2" className="weight-400 me-3" color={darkPurple}>
            {createdDate}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" color={darkPurple} sx={{ opacity: '0.4' }}>
            {lastMessageTextCheckSendByMe} {lastMessage}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

User.propTypes = {
  user: propTypes.object.isRequired,
  setChatRoomId: propTypes.func.isRequired,
  chatRoomId: propTypes.number,
  setSelectedUser: propTypes.func.isRequired,
  setShowUserList: propTypes.func.isRequired,
};

User.defaultProps = {
  chatRoomId: 0,
};

export default User;
