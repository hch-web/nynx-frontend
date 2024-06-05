import React from 'react';
import { Container, Typography, Box, useTheme } from '@mui/material';

// components
import ChatBox from 'containers/portal/common/ChatBox';

function Chat() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  return (
    <Container variant="portal">
      <Typography variant="h3" className="mb-3" color={darkPurple}>
        Inbox
      </Typography>
      <Box className="bg-white common-border">
        <ChatBox />
      </Box>
    </Container>
  );
}

export default Chat;
