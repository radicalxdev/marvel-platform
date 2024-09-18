import React from 'react';

import { ArrowDownwardOutlined } from '@mui/icons-material';
import { Button, Fade } from '@mui/material';

import styles from './styles';

const NewMessageIndicator = ({ showNewMessageIndicator, onScrollToBottom }) => (
  <Fade in={showNewMessageIndicator}>
    <Button
      startIcon={<ArrowDownwardOutlined />}
      onClick={onScrollToBottom}
      {...styles.newMessageButtonProps}
    />
  </Fade>
);

export default NewMessageIndicator;
