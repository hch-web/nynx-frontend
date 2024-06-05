import React, { useState, useLayoutEffect, useEffect, useRef, useMemo } from 'react';
import { Grid, Box, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

// SERVICES
import { useLazyListAllRoomUsersQuery } from 'services/private/chat';

// STYLES
import { MessagesWrapperStyles, userListContainerStyles } from 'styles/mui/portal/chat-box-styles';

// HOOK
import useWindowDimensions from 'custom-hooks/useWindowDimensions';
import useConnectWebSocket from 'custom-hooks/useConnectWebSocket';

import SearchBar from 'containers/portal/common/SearchBar';
import { getSorting } from 'utilities/helpers';

// COMPONENTS
import User from './User';
import MessageList from './MessageList';

// CONSTANTS
import { ALL_ROOM_SOCKET_URL } from './utilities/sockets-urls';
import { transformOptions } from './utilities/helpers';
import { ChatContext } from './contexts/ChatContext';

function ChatBox() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { userInfo } = useSelector(state => state.auth);

  const allRoomsSocket = useConnectWebSocket(ALL_ROOM_SOCKET_URL);

  const [listAllRoomUsers, { isFetching: usersFetching }] = useLazyListAllRoomUsersQuery();
  const { width } = useWindowDimensions();

  // states
  const [chatRoomId, setChatRoomId] = useState(null);
  const [roomsUserList, setRoomsUserList] = useState([]);
  const [showUserList, setShowUserList] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, _setSearchText] = useState('');
  const [pendingMessages, setPendingMessages] = useState([]);

  // refs
  const searchTextRef = useRef(searchText);

  const setSearchText = data => {
    searchTextRef.current = data;
    _setSearchText(data);
  };

  useEffect(() => {
    listAllRoomUsers().then(({ data = [] }) => {
      const sortedUsersList = [...transformOptions(data)].sort(getSorting('desc', 'last_message_time'));
      setRoomsUserList(sortedUsersList);
      if (sortedUsersList?.length > 0) {
        const user = sortedUsersList[0];
        const isOwner = userInfo?.id === user?.owner_id;
        const userId = isOwner ? user?.partner_id : user?.owner_id;
        const selectedUserFirstName = isOwner ? user?.partner_first_name : user?.owner_first_name;
        const selectedUserLastName = isOwner ? user?.partner_last_name : user?.owner_last_name;
        const selectedUserName = isOwner ? user?.response?.partner_username : user?.owner_username;
        setSelectedUser({ userId, selectedUserFirstName, selectedUserLastName, selectedUserName });
        setChatRoomId(user?.room_id);
      }
    });
  }, []);

  useLayoutEffect(() => {
    if (width < 990) setShowUserList(false);
    else setShowUserList(true);
  }, [width]);

  // WEB-SOCKET
  useEffect(() => {
    if (allRoomsSocket) {
      allRoomsSocket.onmessage = e => {
        if (e.data) {
          // const data = JSON.parse(e.data);

          // const sortedUsersList = [...transformOptions(data)].sort(getSorting('desc', 'last_message_time'));
          // setRoomsUserList(sortedUsersList);

          setTimeout(() => {
            const body = { search: searchTextRef.current };

            listAllRoomUsers(body).then(({ data = [] }) => {
              const sortedUsersList = [...transformOptions(data)].sort(
                getSorting('desc', 'last_message_time')
              );
              setRoomsUserList(sortedUsersList);
            });
          }, [100]);
        }
      };
    }
  }, [allRoomsSocket]);

  const handleHitSocketToGetLatestRoom = () => {
    allRoomsSocket.send(JSON.stringify({}));
  };

  // CONTEXT VALUE
  const chatContextValue = useMemo(
    () => ({
      chatRoomId,
      pendingMessages,
      setPendingMessages,
      selectedUser,
      handleGetLatestRoom: handleHitSocketToGetLatestRoom,
    }),
    [chatRoomId, pendingMessages, selectedUser, allRoomsSocket]
  );

  return (
    <ChatContext.Provider value={chatContextValue}>
      <Grid container>
        <Grid item xl={3} lg={5} md={12} sm={12} sx={userListContainerStyles}>
          <Box>
            {showUserList && (
              <Box>
                <Box className="p-3">
                  <SearchBar
                    placeholder="Search Users"
                    searchApi={listAllRoomUsers}
                    loading={usersFetching}
                    setSearchList={setRoomsUserList}
                    setSearchText={setSearchText}
                    searchText={searchText}
                  />
                </Box>

                <Box sx={MessagesWrapperStyles}>
                  <Box sx={{ height: 'auto' }}>
                    {roomsUserList?.map(user => (
                      <User
                        key={user?.room_id}
                        user={user}
                        setChatRoomId={setChatRoomId}
                        chatRoomId={chatRoomId}
                        setSelectedUser={setSelectedUser}
                        setShowUserList={setShowUserList}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {!showUserList && (
              <Box className="p-3">
                <MenuIcon sx={{ color: darkPurple }} onClick={() => setShowUserList(!showUserList)} />

                <Typography variant="title" color={darkPurple}>
                  Chats
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={7} xl={9}>
          <MessageList />
        </Grid>
      </Grid>
    </ChatContext.Provider>
  );
}

export default ChatBox;
