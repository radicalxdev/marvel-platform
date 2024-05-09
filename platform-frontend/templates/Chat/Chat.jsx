import { useEffect, useRef } from 'react';

import {
  ArrowBack,
  ArrowDownwardOutlined,
  InfoOutlined,
  Settings,
} from '@mui/icons-material';
import {
  Button,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import NavigationIcon from '@/assets/svg/Navigation.svg';

import { MESSAGE_ROLE, MESSAGE_TYPES } from '@/constants/bots';

import CenterChatContentNoMessages from './CenterChatContentNoMessages';
import ChatSpinner from './ChatSpinner';
import Message from './Message';
import styles from './styles';

import {
  openInfoChat,
  resetChat,
  setError,
  setFullyScrolled,
  setInput,
  setMessages,
  setMore,
  setStreaming,
  setStreamingDone,
  setTyping,
} from '@/redux/slices/chatSlice';
import { firestore } from '@/redux/store';
import sendMessage from '@/services/chatbot/sendMessage';

const ChatInterface = () => {
  const messagesContainerRef = useRef();

  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    more,
    input,
    typing,
    sessions,
    sessionLoaded,
    openSettingsChat,
    infoChatOpened,
    fullyScrolled,
    streamingDone,
    streaming,
    error,
  } = useSelector((state) => state.chat);

  const currentSession = sessions?.defaultUser;
  const sessionMessages = currentSession?.messages;
  const showNewMessageIndicator = !fullyScrolled && streamingDone;

  useEffect(() => {
    return () => {
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
        where('id', '==', currentSession?.id)
      );

      unsubscribe = onSnapshot(sessionRef, async (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'modified') {
            const updatedData = change.doc.data();
            const updatedMessages = updatedData.messages;

            const lastMessage = updatedMessages[updatedMessages.length - 1];

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
      },
    };

    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
      })
    );
    dispatch(setTyping(true));

    await sendMessage({ message, id: currentSession?.id }, dispatch);
  };

  const handleQuickReply = async (option) => {
    dispatch(setInput(option));
    dispatch(setStreaming(true));

    const message = {
      role: MESSAGE_ROLE.HUMAN,
      type: MESSAGE_TYPES.QUICK_REPLY,
      payload: {
        text: option,
      },
    };

    dispatch(
      setMessages({
        role: MESSAGE_ROLE.HUMAN,
      })
    );
    dispatch(setTyping(true));

    await sendMessage({ message, id: currentSession?.id }, dispatch);
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

  const renderTopChatContent = () => {
    if ((sessionMessages?.length === 0 || !sessionMessages) && !infoChatOpened)
      return null;
    
    return (
      <Grid {...styles.topChat.topChatGridProps}>
        {!openSettingsChat && !infoChatOpened && (
          <Grid {...styles.topChat.leftTopChatGridProps}>
            <Grid item>
              <GradientOutlinedButton
                bgcolor={theme.palette.Common.White['100p']}
                icon={
                  <ArrowBack
                    sx={{ color: theme.palette.Common.White['100p'] }}
                  />
                }
                iconPlacement="left"
                textColor="white"
                text="Back To Home"
                {...styles.topChat.outlinedButtonProps}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  };

  const renderCenterChatContent = () => {
    if (
      !openSettingsChat &&
      !infoChatOpened &&
      sessionMessages?.length !== 0 &&
      !!sessionMessages
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
            {sessionMessages?.map(
              (message, index) =>
                message?.role !== MESSAGE_ROLE.SYSTEM && (
                  <Message
                    ref={messagesContainerRef}
                    {...message}
                    messagesLength={sessionMessages?.length}
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
    if ((sessionMessages?.length === 0 || !sessionMessages) && !infoChatOpened)
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

  const renderBottomChatContent = () => {
    if (!openSettingsChat && !infoChatOpened)
      return (
        <Grid {...styles.bottomChatContent.bottomChatContentGridProps}>
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
                renderSendIcon,
                !!error
              )}
            />
          </Grid>
        </Grid>
      );

    return null;
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderMoreChat()}
      {renderTopChatContent()}
      {renderCenterChatContent()}
      {renderCenterChatContentNoMessages()}
      {renderNewMessageIndicator()}
      {renderBottomChatContent()}
    </Grid>
  );
};

export default ChatInterface;
