import ORDER from '@/constants/sortingOrder';
import TOOLS_SESSION_UTILS_TYPE from '@/constants/toolsSessionResponseUtilsType';

import { convertToUnixTimestamp, formatToStandardDate } from './FirebaseUtils';

/**
 * Function to handle sorting of data based on the specified order.
 * This function sorts the given data array based on the 'createdAt' property of the items.
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
    const dateA = convertToUnixTimestamp(a.createdAt);
    const dateB = convertToUnixTimestamp(b.createdAt);
    return order === ORDER.ASC ? dateA - dateB : dateB - dateA;
  });
  return sortedData;
};

/**
 * Function to initialize and format tool session card data.
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
  const { updatedAt, createdAt, responses, toolId, sessionId, userId } =
    cardData;
  const sortedResponses = handleSort(ORDER.DESC, responses);
  const formattedCreatedAt = formatToStandardDate(
    new Date(convertToUnixTimestamp(createdAt))
  );
  const formattedUpdatedAt = formatToStandardDate(
    new Date(convertToUnixTimestamp(updatedAt))
  );

  const toolSessionType = new TOOLS_SESSION_UTILS_TYPE[toolId](); // Initializing the session utility type based on the toolId

  return {
    createdAt: formattedCreatedAt,
    updatedAt: formattedUpdatedAt,
    toolId,
    sessionId,
    userId,
    responses: sortedResponses,
    toolSessionType,
  };
};

export { initializeToolSessionData, handleSort };
