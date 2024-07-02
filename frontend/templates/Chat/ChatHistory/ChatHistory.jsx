import { useEffect, useState } from 'react';

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';

import {
  resetChat,
  setChatSession,
  setSessionLoaded,
} from '@/redux/slices/chatSlice';

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
  const processDate = (date) => {
    const today = new Date(Date.now());

    // to calculate if date is within week
    const weekLength = 604800000; // in milliseconds
    const lastMonday = new Date();
    lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay() - 1));
    lastMonday.setHours(0, 0, 0, 0);

    // check the timeframe of given date
    if (date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0))
      return 'Today';
    if (date.setDate(date.getDate()) === date.setDate(today.getDate() - 1))
      return 'Yesterday';
    if (
      lastMonday.getTime() <= date.getTime() &&
      date.getTime() <= lastMonday.getTime() + weekLength
    )
      return 'This Week';
    if (date.setDate(1) === today.setDate(1)) return 'This Month';
    if (date.setMonth(0) === today.setMonth(0)) return 'This Year';
    return date.getFullYear();
  };

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
  const fetchChatHistory = async (userData) => {
    // get chat history data
    const q = query(
      collection(db, 'chatSessions'),
      where('user', '==', userData)
    );
    const querySnapshot = await getDocs(q);
    const history = [];
    querySnapshot.forEach((document) => {
      history.push({
        ...document.data(),
      });
    });

    const sortedHistory = {};
    history.sort((a, b) => {
      return b.updatedAt.toDate() - a.updatedAt.toDate();
    });
    history.forEach((data) => {
      const timeframe = processDate(data.updatedAt.toDate());
      const msgItem = {
        id: data.id,
        timestamp: data.updatedAt,
        message: data.messages[0].payload.text,
      };

      if (Object.prototype.hasOwnProperty.call(sortedHistory, timeframe))
        sortedHistory[timeframe].push(msgItem);
      else sortedHistory[timeframe] = [msgItem];
    });

    return sortedHistory;
  };

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
                {' '}
                {entry.message}{' '}
              </Button>
              <Typography {...styles.timestampProps}>
                {' '}
                {format(entry.timestamp.toDate(), 'h:mm aa')}{' '}
              </Typography>
            </ListItem>
          ))}
        </List>
      ))}
    </List>
  );
};

export default ChatHistory;
