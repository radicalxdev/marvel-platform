import moment from 'moment';

import ORDER from '@/constants/sortingOrder';

import { convertToUnixTimestamp, formatToStandardDate } from './FirebaseUtils';

const handleSort = (order, data) => {
  if (data.length <= 1) {
    return data;
  }

  const dataCopy = [...data];
  const sortedData = dataCopy.sort((a, b) => {
    const dateA = convertToUnixTimestamp(a.updatedAt);
    const dateB = convertToUnixTimestamp(b.updatedAt);
    return order === ORDER.ASC ? dateA - dateB : dateB - dateA;
  });
  return sortedData;
};
const initializeToolSessionData = (cardData) => {
  const { updatedAt, createdAt, response, toolId, sessionId, userId } =
    cardData;
  const sortedResponse = handleSort(ORDER.ASC, response);
  const formattedCreatedAt = formatToStandardDate(
    new Date(convertToUnixTimestamp(createdAt))
  );
  const formattedUpdatedAt = formatToStandardDate(
    new Date(convertToUnixTimestamp(updatedAt))
  );

  return {
    createdAt: formattedCreatedAt,
    updatedAt: formattedUpdatedAt,
    toolId,
    sessionId,
    userId,
    response: sortedResponse,
  };
};

const getCategorizedData = (sortedData) => {
  const now = moment();
  const startOfWeek = now.clone().startOf('week');
  const startOfMonth = now.clone().startOf('month');
  const startOfYear = now.clone().startOf('year');

  const thisWeek = [];
  const thisMonth = [];
  const thisYear = [];
  const beyondThisYear = [];

  sortedData.forEach((item) => {
    const itemDate = moment(convertToUnixTimestamp(item.updatedAt));

    if (itemDate.isSameOrAfter(startOfWeek)) {
      thisWeek.push(item);
    } else if (itemDate.isSameOrAfter(startOfMonth)) {
      thisMonth.push(item);
    } else if (itemDate.isSameOrAfter(startOfYear)) {
      thisYear.push(item);
    } else {
      beyondThisYear.push(item);
    }
  });
  return { thisWeek, thisMonth, thisYear, beyondThisYear };
};

export { initializeToolSessionData, getCategorizedData, handleSort };
