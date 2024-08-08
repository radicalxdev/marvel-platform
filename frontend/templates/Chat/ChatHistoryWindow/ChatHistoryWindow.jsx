import { useState } from 'react';

import ChatIcon from '@mui/icons-material/Chat';
import HistoryIcon from '@mui/icons-material/History';
import RemoveIcon from '@mui/icons-material/Remove';
import { Fab, Grid, Tooltip, Typography } from '@mui/material';

import { useDispatch } from 'react-redux';

import ChatHistory from '../ChatHistory';

import styles from './styles';

import { resetChat } from '@/redux/slices/chatSlice';

/**
 * ChatHistoryWindow component displays a sidebar that contains chat history.
 * The sidebar is toggled by clicking on the toggle button.
 */
const ChatHistoryWindow = () => {
  // State variable to track whether the chat history sidebar is shown or hidden. Initially set to false.
  const [showHistorySidebar, setShowHistorySidebar] = useState(false);

  // The dispatch function from the Redux store. Used to dispatch actions to the store.
  const dispatch = useDispatch();

  /**
   * Toggles the visibility of the chat history sidebar.
   *
   * @return {void} No return value.
   */
  const toggleHistorySidebar = () => setShowHistorySidebar((prev) => !prev);

  /**
   * Resets the chat state and removes the session ID from local storage.
   *
   * @return {void} No return value.
   */
  const newChat = () => {
    // Dispatch the resetChat action to reset the chat state
    dispatch(resetChat());

    // Remove the session ID from local storage
    localStorage.removeItem('sessionId');
  };

  return (
    // Conditionally render the chat history sidebar based on the showHistorySidebar state
    !showHistorySidebar ? (
      <Grid {...styles.openChatHistoryContainer}>
        {/* // Render the open chat history button */}
        <Tooltip title="Open chat history" arrow>
          <Fab
            aria-label="open chat history"
            onClick={toggleHistorySidebar}
            {...styles.toggleHistoryButton(showHistorySidebar)}
          >
            <HistoryIcon />
          </Fab>
        </Tooltip>
      </Grid>
    ) : (
      // Render the chat history sidebar
      <Grid {...styles.historySideBar}>
        {/* Header of the sidebar */}
        <Grid {...styles.historySideBarHeader}>
          <Tooltip title="Start a chat with Kai" arrow>
            <Fab
              aria-label="Start a chat with Kai"
              onClick={() => newChat()}
              {...styles.newChatIcon}
            >
              <ChatIcon />
            </Fab>
          </Tooltip>
          {/* Title of the chat history sidebar */}
          <Grid {...styles.historySideBarTitle}>
            {/* Display the title of the chat history sidebar */}
            <Typography {...styles.historySideBarTitleText}>
              {/* Display 'Chat History' */}
              Chat History
            </Typography>
          </Grid>
          {/* Close chat history button */}
          <Tooltip title="Close chat history" arrow>
            <Fab
              aria-label="close chat history"
              onClick={toggleHistorySidebar}
              {...styles.toggleHistoryButton(showHistorySidebar)}
            >
              <RemoveIcon />
            </Fab>
          </Tooltip>
        </Grid>

        {/* Chat history section of the sidebar */}
        <Grid {...styles.chatHistory}>
          {/* Render the ChatHistory component */}
          <ChatHistory />
        </Grid>
      </Grid>
    )
  );
};

export default ChatHistoryWindow;
