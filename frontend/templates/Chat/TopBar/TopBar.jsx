import React from 'react';

import { Chat as ChatIcon, InfoOutlined, Settings } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

import DiscoveryIcon from '@/assets/svg/add-block2.svg';

import styles from './styles';

const TopBar = ({ onNewChat, onDiscoveryToggle }) => (
  <Box {...styles.topBar.barProps}>
    <Button
      variant="outlined"
      startIcon={<ChatIcon />}
      onClick={onNewChat}
      {...styles.actionButtonProps}
    >
      New Chat
    </Button>
    <Button
      variant="outlined"
      startIcon={<DiscoveryIcon />}
      {...styles.actionButtonProps}
      onClick={onDiscoveryToggle}
    >
      Discovery
    </Button>
  </Box>
);

export default TopBar;
