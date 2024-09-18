import React from 'react';

import {
  ArrowDropUp as ArrowUp,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { Fab, IconButton } from '@mui/material';

import styles from './styles';

const ChatHistoryButton = ({ onClick, showChatHistory }) => (
  <Fab
    size="medium"
    {...(!showChatHistory
      ? styles.chatHistory.chatHistoryButtonFabProps
      : styles.chatHistory.chatHistoryButtonFabPropsHide)}
    onClick={onClick}
  >
    <ArrowUp {...styles.chatHistory.chatHistoryButtonIconProps} />
  </Fab>
);

export default ChatHistoryButton;
