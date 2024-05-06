import moment from 'moment';

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

const transformEnrolledDoc = (doc) => {
  const { startTime: st, endTime: et, practice, ...enrolledChallegeData } = doc;

  const transformedPractices = practice
    ?.map(({ startTime: sTime, endTime: eTime, ...practiceData }) => ({
      startTime: convertToUnixTimestamp(sTime),
      endTime: convertToUnixTimestamp(eTime),
      ...practiceData,
    }))
    .sort((a, b) => a.level - b.level);

  const transformedDoc = {
    startTime: convertToUnixTimestamp(st),
    endTime: convertToUnixTimestamp(et),
    practice: transformedPractices,
    ...enrolledChallegeData,
  };

  return transformedDoc;
};
export { parseFirebaseText, convertToUnixTimestamp, transformEnrolledDoc };
