import moment from 'moment';

import HistoryListingContainer from '@/components/HistoryToolListingContainer';

const parseFirebaseText = (text) => {
  return text.split('\\n').map((line, index) => <div key={index}>{line}</div>);
};

const convertToUnixTimestamp = (date) => {
  let unixTimestamp;

  if (date instanceof Date) {
    // Handle JavaScript Date object
    unixTimestamp = moment(date).valueOf();
  } else if (typeof date === 'number') {
    // Handle Unix timestamp
    unixTimestamp = date;
  } else if (typeof date === 'string') {
    // Handle string representation of date
    unixTimestamp = moment(date).valueOf();
  } else if (date && date.toMillis) {
    // Handle Firebase Timestamp object
    unixTimestamp = moment(date.toDate()).valueOf();
  } else {
    // Invalid or unsupported date value
    unixTimestamp = null;
  }

  return unixTimestamp;
};

const renderHistoryToolContainer = (category, timeData, loading) => {
  if (timeData.length === 0) return null;

  return (
    <HistoryListingContainer
      key={category}
      data={timeData}
      loading={loading}
      category={category}
    />
  );
};

const renderHistorySections = (data, loading) => {
  const { today, yesterday, previous7Days, previous30Days, monthsBefore } =
    data;

  return (
    <>
      {renderHistoryToolContainer('Today', today, loading)}
      {renderHistoryToolContainer('Yesterday', yesterday, loading)}
      {renderHistoryToolContainer('Previous 7 days', previous7Days, loading)}
      {renderHistoryToolContainer('Previous 30 days', previous30Days, loading)}
      {Object.entries(monthsBefore).map(([month, timeData]) =>
        renderHistoryToolContainer(month, timeData, loading)
      )}
    </>
  );
};

export {
  parseFirebaseText,
  convertToUnixTimestamp,
  renderHistoryToolContainer,
  renderHistorySections,
};
