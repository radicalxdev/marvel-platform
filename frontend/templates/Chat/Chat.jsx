import { useEffect, useRef } from 'react';

import {
  ArrowDownwardOutlined,
  InfoOutlined,
  Settings,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import {
  Button,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';

import NavigationIcon from '@/assets/svg/Navigation.svg';

import { MESSAGE_ROLE, MESSAGE_TYPES } from '@/constants/bots';

import CenterChatContentNoMessages from './CenterChatContentNoMessages';
import ChatHistoryWindow from './ChatHistoryWindow';
import ChatSpinner from './ChatSpinner';
import DefaultPrompt from './DefaultPrompt';
import DiscoveryLibraryWindow from './DiscoveryLibraryWindow';
import Message from './Message';
import QuickActions from './QuickActions';
import styles from './styles';

import {
  openInfoChat,
  resetChat,
  setActionType,
  setChatSession,
  setDisplayQuickActions,
  setError,
  setFullyScrolled,
  setInput,
  setMessages,
  setMore,
  setSessionLoaded,
  setStreaming,
  setStreamingDone,
  setTyping,
} from '@/redux/slices/chatSlice';
import {
  addHistoryEntry,
  updateHistoryEntry,
} from '@/redux/slices/historySlice';
import { firestore } from '@/redux/store';
import { fetchDiscoveryLibraries } from '@/redux/thunks/fetchDiscoveryLibraries';
import createChatSession from '@/services/chatbot/createChatSession';
import sendMessage from '@/services/chatbot/sendMessage';

const ChatInterface = () => {
  const messagesContainerRef = useRef();

  const dispatch = useDispatch();
  const {
    more,
    input,
    typing,
    chat,
    sessionLoaded,
    openSettingsChat,
    infoChatOpened,
    fullyScrolled,
    streamingDone,
    streaming,
    error,
    displayQuickActions,
    actionType,
    selectedDiscoveryLibraryId,
    discoveryLibraries,
  } = useSelector((state) => state.chat);
  const { data: userData } = useSelector((state) => state.user);

  const sessionId = localStorage.getItem('sessionId');

  const currentSession = chat;
  const chatMessages = currentSession?.messages;
  const showNewMessageIndicator = !fullyScrolled && streamingDone;

  const startConversation = async (message) => {
    // Optionally dispatch a temporary message for the user's input
    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
        message,
      })
    );

    dispatch(setTyping(true));

    /**
     * If a selected discovery library ID is specified, create a system message
     * containing the system message of the selected library.
     *
     * @returns {Object|null} The system message object or null if no library is selected.
     */
    let systemMessage = null;
    if (selectedDiscoveryLibraryId != null) {
      // Find the selected library in the list of discovery libraries
      const selectedLibrary = discoveryLibraries.find(
        (library) => library.id === selectedDiscoveryLibraryId
      );

      // If a library is selected, create a system message object with its system message
      if (selectedLibrary) {
        systemMessage = {
          role: MESSAGE_ROLE.SYSTEM, // The role of the message (system or human)
          type: MESSAGE_TYPES.TEXT, // The type of the message (text-based)
          payload: {
            text: selectedLibrary.systemMessage, // The text of the system message
          },
        };
      }
    }

    // Define the chat payload
    const chatPayload = {
      user: {
        id: userData?.id,
        fullName: userData?.fullName,
        email: userData?.email,
      },
      type: 'chat',
      message,
      systemMessage,
      discoveryLibraryId: selectedDiscoveryLibraryId ?? null,
    };

    // Send a chat session
    const { status, data } = await createChatSession(chatPayload, dispatch);

    // Remove typing bubble
    dispatch(setTyping(false));
    if (status === 'created') dispatch(setStreaming(true));

    // Set chat session
    dispatch(setChatSession(data));
    dispatch(setSessionLoaded(true));

    /**
     * Creates a new entry in the history store.
     * The entry contains the session ID, the first message of the session,
     * the creation and update timestamps of the session.
     *
     * @param {Object} data The session data object.
     */
    const newEntry = {
      // The ID of the session.
      id: data?.id,
      // The first message of the session.
      title: data?.messages[0]?.payload?.text,
      // The timestamp of session creation.
      createdAt: data?.createdAt,
      // The timestamp of session last update.
      updatedAt: data?.updatedAt,
    };

    // Add the new history entry to the Redux store.
    dispatch(addHistoryEntry(newEntry));
  };

  useEffect(() => {
    // Fetching all the discovery libraries.
    dispatch(fetchDiscoveryLibraries());
    return () => {
      localStorage.removeItem('sessionId');
      dispatch(resetChat());
    };
  }, []);

  useEffect(() => {
    let unsubscribe;

    if (sessionLoaded || currentSession) {
      messagesContainerRef.current?.scrollTo(
        0,
        messagesContainerRef.current?.scrollHeight,
        {
          behavior: 'smooth',
        }
      );

      const sessionRef = query(
        collection(firestore, 'chatSessions'),
        where('id', '==', sessionId)
      );

      unsubscribe = onSnapshot(sessionRef, async (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'modified') {
            const updatedData = change.doc.data();
            const updatedMessages = updatedData.messages;

            const lastMessage = updatedMessages[updatedMessages.length - 1];
            // Convert Firestore timestamp to JavaScript Date object and format it as an ISO string.
            lastMessage.timestamp = lastMessage.timestamp
              .toDate()
              .toISOString();

            // Update the history entry with the latest timestamp.
            dispatch(
              updateHistoryEntry({
                id: sessionId,
                updatedAt: updatedData.updatedAt.toDate().toISOString(),
                // updatedAt: lastMessage.timestamp,
              })
            );

            if (lastMessage?.role === MESSAGE_ROLE.AI) {
              dispatch(
                setMessages({
                  role: MESSAGE_ROLE.AI,
                  response: lastMessage,
                })
              );
              dispatch(setTyping(false));
            }
          }
        });
      });
    }

    return () => {
      if (sessionLoaded || currentSession) unsubscribe();
    };
  }, [sessionLoaded]);

  const handleOnScroll = () => {
    const scrolled =
      Math.abs(
        messagesContainerRef.current.scrollHeight -
          messagesContainerRef.current.clientHeight -
          messagesContainerRef.current.scrollTop
      ) <= 1;

    if (fullyScrolled !== scrolled) dispatch(setFullyScrolled(scrolled));
  };

  const handleScrollToBottom = () => {
    messagesContainerRef.current?.scrollTo(
      0,
      messagesContainerRef.current?.scrollHeight,
      {
        behavior: 'smooth',
      }
    );

    dispatch(setStreamingDone(false));
  };

  const handleSendMessage = async () => {
    dispatch(setStreaming(true));

    if (!input) {
      dispatch(setError('Please enter a message'));
      setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
      return;
    }

    const message = {
      role: MESSAGE_ROLE.HUMAN,
      type: MESSAGE_TYPES.TEXT,
      payload: {
        text: input,
        action: actionType,
      },
    };

    if (!chatMessages) {
      // Start a new conversation if there are no existing messages
      await startConversation(message);
      return;
    }

    // Add the user's message to the chat
    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
        message,
      })
    );

    dispatch(setTyping(true));

    // Ensure the user’s message is displayed before sending the message
    setTimeout(async () => {
      await sendMessage({ message, id: sessionId }, dispatch);
    }, 0);
    dispatch(setActionType(null));
  };

  const handleQuickReply = async (option) => {
    dispatch(setInput(option));
    dispatch(setStreaming(true));

    const message = {
      role: MESSAGE_ROLE.HUMAN,
      type: MESSAGE_TYPES.QUICK_REPLY,
      payload: {
        text: option,
        action: actionType,
      },
    };

    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
      })
    );
    dispatch(setTyping(true));

    await sendMessage({ message, id: currentSession?.id }, dispatch);

    dispatch(setActionType(null));
  };

  /* Push Enter */
  const keyDownHandler = async (e) => {
    if (typing || !input || streaming) return;
    if (e.keyCode === 13) handleSendMessage();
  };

  const renderSendIcon = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={handleSendMessage}
          {...styles.bottomChatContent.iconButtonProps(
            typing || error || !input || streaming
          )}
        >
          <NavigationIcon />
        </IconButton>
      </InputAdornment>
    );
  };

  const renderMoreChat = () => {
    if (!more) return null;
    return (
      <Grid {...styles.moreChat.moreChatProps}>
        <Grid {...styles.moreChat.contentMoreChatProps}>
          <Settings {...styles.moreChat.iconProps} />
          <Typography {...styles.moreChat.titleProps}>Settings</Typography>
        </Grid>
        <Grid
          {...styles.moreChat.contentMoreChatProps}
          onClick={() => dispatch(openInfoChat())}
        >
          <InfoOutlined {...styles.moreChat.iconProps} />
          <Typography {...styles.moreChat.titleProps}>Information</Typography>
        </Grid>
      </Grid>
    );
  };

  const renderCenterChatContent = () => {
    if (
      !openSettingsChat &&
      !infoChatOpened &&
      chatMessages?.length !== 0 &&
      !!chatMessages
    )
      return (
        <Grid
          onClick={() => dispatch(setMore({ role: 'shutdown' }))}
          {...styles.centerChat.centerChatGridProps}
        >
          <Grid
            ref={messagesContainerRef}
            onScroll={handleOnScroll}
            {...styles.centerChat.messagesGridProps}
          >
            {chatMessages?.map(
              (message, index) =>
                message?.role !== MESSAGE_ROLE.SYSTEM && (
                  <Message
                    ref={messagesContainerRef}
                    {...message}
                    messagesLength={chatMessages?.length}
                    messageNo={index + 1}
                    onQuickReply={handleQuickReply}
                    streaming={streaming}
                    fullyScrolled={fullyScrolled}
                    key={index}
                  />
                )
            )}
            {typing && <ChatSpinner />}
          </Grid>
        </Grid>
      );

    return null;
  };

  const renderCenterChatContentNoMessages = () => {
    if ((chatMessages?.length === 0 || !chatMessages) && !infoChatOpened)
      return <CenterChatContentNoMessages />;
    return null;
  };

  const renderNewMessageIndicator = () => {
    return (
      <Fade in={showNewMessageIndicator}>
        <Button
          startIcon={<ArrowDownwardOutlined />}
          onClick={handleScrollToBottom}
          {...styles.newMessageButtonProps}
        />
      </Fade>
    );
  };

  /**
   * Render the Quick Action component as an InputAdornment.
   * This component is used to toggle the display of the Quick Actions.
   *
   * @return {JSX.Element} The rendered Quick Action component.
   */
  const renderQuickAction = () => {
    // Render the Quick Action component as an InputAdornment.
    return (
      <InputAdornment position="start">
        {/* The Grid component used to display the Quick Action. */}
        <Grid
          // Handle the click event to toggle the display of the Quick Actions.
          onClick={() => dispatch(setDisplayQuickActions(!displayQuickActions))}
          {...styles.quickActionButton}
        >
          {/* Render the AddIcon component. */}
          <AddIcon {...styles.quickActionButtonAddIcon} />
          {/* Render the Typography component to display the text. */}
          <Typography>Actions</Typography>
        </Grid>
      </InputAdornment>
    );
  };

  const renderBottomChatContent = () => {
    if (!openSettingsChat && !infoChatOpened)
      return (
        <Grid {...styles.bottomChatContent.bottomChatContentGridProps}>
          {/* Default Prompt Component */}
          <DefaultPrompt handleSendMessage={handleSendMessage} />
          {/* Quick Actions Component */}
          <QuickActions handleSendMessage={handleSendMessage} />
          <Grid {...styles.bottomChatContent.chatInputGridProps(!!error)}>
            <TextField
              value={input}
              onChange={(e) => dispatch(setInput(e.currentTarget.value))}
              onKeyUp={keyDownHandler}
              error={!!error}
              helperText={error}
              disabled={!!error}
              focused={false}
              {...styles.bottomChatContent.chatInputProps(
                renderQuickAction,
                renderSendIcon,
                !!error,
                input
              )}
            />
          </Grid>
        </Grid>
      );

    return null;
  };

  return (
    <Grid {...styles.chatInterface}>
      <DiscoveryLibraryWindow />
      <Grid {...styles.mainGridProps}>
        {renderMoreChat()}
        {renderCenterChatContent()}
        {renderCenterChatContentNoMessages()}
        {renderNewMessageIndicator()}
        {renderBottomChatContent()}
      </Grid>
      {/* ChatHistoryWindow component displays a sidebar that contains chat history. This component is rendered on the right side of the chat interface. */}
      <ChatHistoryWindow />
    </Grid>
  );
};

export default ChatInterface;
