import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';

const db = getFirestore();

/**
 * Takes in a Date object and returns the "timeframe" of the date (whether it's today, yesterday, this week, etc.).
 * Returns the year of the date if it's >1 year in the past.
 * @param {Date} date - date to be processed
 * @returns {number | string}
 */
const processDate = (date) => {
  const now = moment(); // Current date/time
  const inputDate = moment(date); // Convert the input date

  if (now.isSame(inputDate, 'day')) {
    return 'Today';
  }
  if (now.subtract(1, 'days').isSame(inputDate, 'day')) {
    return 'Yesterday';
  }
  if (now.isSame(inputDate, 'week')) {
    return 'This Week';
  }
  if (now.isSame(inputDate, 'month')) {
    return 'This Month';
  }
  if (now.isSame(inputDate, 'year')) {
    return 'This Year';
  }
  return inputDate.format('YYYY'); // Return year if it's older than this year
};

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

export { fetchChatHistory };
