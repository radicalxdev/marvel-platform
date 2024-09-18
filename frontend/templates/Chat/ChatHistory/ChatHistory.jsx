import { useEffect, useState } from 'react';

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';

import {
  resetChat,
  setChatSession,
  setSessionLoaded,
} from '@/redux/slices/chatSlice';
import { fetchChatHistory } from '@/services/chathistory/chatHistory';

const ChatHistory = ({ user }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const { chat } = useSelector((state) => state.chat);
  const db = getFirestore();
  const dispatch = useDispatch();

  /**
   * Takes in a Date object and returns the "timeframe" of the date (whether it's today, yesterday, this week, etc.).
   * Returns the year of the date if it's >1 year in the past.
   * @param {Date} date - date to be processed
   * @returns {number | string}
   */

  /**
   * converts all the timestamps in a chatSession to maps, as dispatch logs an error due to the fact that
   * firestore stores the timestamps as iterators
   * @param {Object} chatSession
   */
  const fixTimestamps = (chatSession) => {
    const fixTimestamp = (timestamp) => {
      return { seconds: timestamp.seconds, nanoseconds: timestamp.nanoseconds };
    };

    chatSession.createdAt = fixTimestamp(chatSession.createdAt);
    chatSession.updatedAt = fixTimestamp(chatSession.updatedAt);

    chatSession.messages.forEach((entry) => {
      entry.timestamp = fixTimestamp(entry.timestamp);
    });
  };

  /**
   * gets the chat history for a given user
   * @param {Object} userData
   * @returns {Object} history of a user, sorted into when the sessions were (today, yesterday, this week, etc.)
   */

  const handleReopenChatHistory = async (docRef) => {
    const docID = doc(db, 'chatSessions', docRef);
    const chatSessionRef = await getDoc(docID);
    const chatSession = chatSessionRef.data();

    fixTimestamps(chatSession);

    dispatch(resetChat());
    dispatch(setChatSession(chatSession));
    dispatch(setSessionLoaded(true));
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await fetchChatHistory(user);
      setChatHistory(history);
    };
    fetchHistory();
  }, [chat]);

  return (
    <List {...styles.chatHistoryProps}>
      {Object.keys(chatHistory).map((timeframe) => (
        <List key={timeframe} {...styles.chatHistoryTimeframeContainerProps}>
          <ListItem key="timeframe" {...styles.chatHistoryListItemProps}>
            <ListItemText primary={timeframe} {...styles.timeframeProps} />
          </ListItem>
          {chatHistory[timeframe].map((entry) => (
            <ListItem
              key={entry.id}
              {...styles.chatHistoryContentProps}
              onClick={() => {
                handleReopenChatHistory(entry.id);
              }}
            >
              <Button {...styles.chatHistoryTextProps}>
                <Typography {...styles.historyTitleProps}>
                  {' '}
                  {entry.message}{' '}
                </Typography>
                <Typography {...styles.timestampProps}>
                  {' '}
                  {moment(entry.timestamp.toDate()).format('h:mm A')}{' '}
                  {moment(entry.timestamp.toDate()).format('h:mm A')}{' '}
                </Typography>
              </Button>
            </ListItem>
          ))}
        </List>
      ))}
    </List>
  );
};

export default ChatHistory;
