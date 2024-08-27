import moment from 'moment';

import ORDER from '@/constants/sortingOrder';
import { TOOLS_ID } from '@/constants/tools';

import TOOLS_SESSION_UTILS_TYPE from '@/constants/toolsSessionResponseUtilsType';

import { convertToUnixTimestamp } from './FirebaseUtils';

export const exportToCSV = (data, panelData) => {
  const escapeCSVField = (field) =>
    typeof field === 'string' ? `"${field.replace(/"/g, '""')}"` : field;

  let headers;
  let rows;

  if (data?.toolId === '0') {
    headers = [
      'Question',
      'Option A',
      'Option B',
      'Option C',
      'Option D',
      'Correct Answer',
      'Explanation',
    ];
    rows = panelData.map((item) => [
      escapeCSVField(item.question),
      escapeCSVField(item.choices[0]?.value || ''),
      escapeCSVField(item.choices[1]?.value || ''),
      escapeCSVField(item.choices[2]?.value || ''),
      escapeCSVField(item.choices[3]?.value || ''),
      escapeCSVField(item.answer),
      escapeCSVField(item.explanation || ''),
    ]);
  } else {
    headers = ['Concept', 'Definition'];
    rows = panelData.map((item) => [
      escapeCSVField(item.concept),
      escapeCSVField(item.definition),
    ]);
  }

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join(
    '\n'
  );
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data?.title.replace(/\s+/g, '_').toLowerCase()}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const copyToClipboard = (data, panelData) => {
  const label =
    data?.toolId === '0' ? 'Questions and Options' : 'Concepts and Definitions';
  const textToCopy = `
    Title: ${data?.title || 'Default Title'}
    
    Content: ${data?.content || 'Default Content'}
    
    ${label}:
    ${panelData
      .map((item, i) =>
        data?.toolId === '0'
          ? `${i + 1}. ${item.question}\n${item.choices
              ?.map((choice) => `   ${choice.key}. ${choice.value}`)
              .join('\n')}`
          : `${i + 1}. ${item.concept} - ${item.definition}`
      )
      .join('\n\n')}
    `;

  navigator.clipboard.writeText(textToCopy);
};

/**
 * Renders tool data based on the toolId and item provided from tool constants.
 *
 * @param {string} toolId - The ID of the tool to render data for.
 * @param {object} item - The item containing tool data and outputs.
 * @return {object} An object containing the rendered tool data.
 */
export const getToolData = (props) => {
  const { toolId, item } = props;

  switch (toolId) {
    case TOOLS_ID.GEMINI_QUIZIFY: {
      const title = `Multiple Choice Assessment - ${item.topic}`;
      const description =
        item.description ||
        `Multiple Choice Questions taken from ${item.topic}`;
      const output = item.response;
      const backgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
      const logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31';

      return {
        title,
        description,
        backgroundImgURL,
        logo,
        output,
        ...item,
      };
    }
    case TOOLS_ID.GEMINI_DYNAMO: {
      const concepts = item.response?.map((card) => card.concept) || [];
      const primaryConcept = concepts[0] || 'Various Concepts';

      let notableConcepts = '';
      if (concepts.length > 1) {
        notableConcepts =
          concepts.slice(0, 1).join(', ') +
          (concepts.length > 2 ? ', and ' : ' and ') +
          concepts[concepts.length - 1];
      } else {
        notableConcepts = primaryConcept;
      }

      const title = `Flashcards on ${primaryConcept} and More`;
      const description = `Includes concepts like ${notableConcepts}`;
      const flashCards = item.response;
      const dynamoBackgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
      const dynamoLogo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';

      return {
        title,
        description,
        backgroundImgURL: dynamoBackgroundImgURL,
        logo: dynamoLogo,
        output: flashCards,
        ...item,
      };
    }
    default:
      return {
        title: 'Default Title',
        backgroundImgURL: null,
        logo: null,
        output: null,
        ...item,
      };
  }
};

/**
 * Function to handle sorting of data based on the specified order.
 * This function sorts the given data array based on the 'createdAt' property of the items.
 * It sorts the data in ascending or descending order depending on the value of the 'order' parameter.
 *
 * @param {string} order - The sorting order. Should be either 'ASC' for ascending or 'DESC' for descending.
 * @param {Array<Object>} data - The data array to be sorted. Each object in the array should have an 'updatedAt' property.
 * @returns {Array<Object>} - The sorted array based on the 'updatedAt' property.
 */
export const handleSort = (order, data) => {
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
export const initializeToolSessionData = (cardData) => {
  const { updatedAt, createdAt, responses, toolId, sessionId, userId } =
    cardData;
  const sortedResponses = handleSort(ORDER.DESC, responses);
  const formattedCreatedAt = moment(convertToUnixTimestamp(createdAt)).format(
    'MMMM Do YYYY, h:mm:ss a'
  );
  const formattedUpdatedAt = moment(convertToUnixTimestamp(updatedAt)).format(
    'MMMM Do YYYY, h:mm:ss a'
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
