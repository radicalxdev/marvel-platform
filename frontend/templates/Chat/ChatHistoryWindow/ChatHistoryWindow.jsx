import { useState } from 'react';

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
            size="medium"
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
              size="medium"
              aria-label="Start a chat with Kai"
              onClick={() => newChat()}
              {...styles.newChatIcon}
            >
              {/* <ChatIcon /> */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.0714 19.0699C16.0152 22.1263 11.4898 22.7867 7.78642 21.074C7.23971 20.8539 6.79148 20.676 6.36537 20.676C5.17849 20.683 3.70117 21.8339 2.93336 21.067C2.16555 20.2991 3.31726 18.8206 3.31726 17.6266C3.31726 17.2004 3.14642 16.7602 2.92632 16.2124C1.21283 12.5096 1.87411 7.98269 4.93026 4.92721C8.8316 1.02443 15.17 1.02443 19.0714 4.9262C22.9797 8.83501 22.9727 15.1681 19.0714 19.0699Z"
                  fill="#AC92FF"
                />
                <path
                  d="M15.9393 12.413H15.9483"
                  stroke="#0B0C0F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.9304 12.413H11.9394"
                  stroke="#0B0C0F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.9214 12.413H7.9304"
                  stroke="#0B0C0F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
              size="medium"
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
