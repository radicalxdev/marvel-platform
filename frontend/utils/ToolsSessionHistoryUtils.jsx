import moment from 'moment';

import ORDER from '@/constants/sortingOrder';

import { convertToUnixTimestamp, formatToStandardDate } from './FirebaseUtils';

/**
 * Function to handle sorting of data based on the specified order.
 * This function sorts the given data array based on the 'updatedAt' property of the items.
 * It sorts the data in ascending or descending order depending on the value of the 'order' parameter.
 *
 * @param {string} order - The sorting order. Should be either 'ASC' for ascending or 'DESC' for descending.
 * @param {Array<Object>} data - The data array to be sorted. Each object in the array should have an 'updatedAt' property.
 * @returns {Array<Object>} - The sorted array based on the 'updatedAt' property.
 */
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

/**
 * Function to initialize and format tool session data.
 * This function processes the provided card data, sorts the response data, and formats the 'createdAt' and 'updatedAt' timestamps.
 *
 * @param {Object} cardData - The card data object containing information such as timestamps, response data, toolId, sessionId, and userId.
 * @param {string} cardData.updatedAt - The timestamp when the data was last updated.
 * @param {string} cardData.createdAt - The timestamp when the data was created.
 * @param {Array<Object>} cardData.response - The response data array that needs to be sorted.
 * @param {string} cardData.toolId - The ID of the tool associated with the session.
 * @param {string} cardData.sessionId - The ID of the session.
 * @param {string} cardData.userId - The ID of the user.
 * @returns {Object} - An object containing formatted timestamps, toolId, sessionId, userId, and sorted response data.
 */
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

/**
 * Function to categorize data into different time periods.
 * This function takes sorted data and categorizes it based on the time periods: this week, this month, this year, and beyond this year.
 *
 * @param {Array<Object>} sortedData - The sorted data array to be categorized. Each object should have an 'updatedAt' property.
 * @returns {Object} - An object containing arrays of items categorized by time period.
 * @returns {Array<Object>} return.thisWeek - Array of items updated this week.
 * @returns {Array<Object>} return.thisMonth - Array of items updated this month.
 * @returns {Array<Object>} return.thisYear - Array of items updated this year.
 * @returns {Array<Object>} return.beyondThisYear - Array of items updated before this year.
 */
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
