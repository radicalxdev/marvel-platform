import moment from 'moment';

import { TOOL_IDS } from '@/constants/tool_IDs';

/**
 * Prepares data for the tool history card component based on the tool ID
 *
 * @param {Object} param0 - An object containing topic, response, createdAt, and tool_id.
 * @returns {Object} - Transformed tool data including toolId, response, creationDate, title, content, backgroundImageUrl, and logo.
 */
export const transformToolData = ({ topic, response, createdAt, tool_id }) => {
  const transformedDate = moment(createdAt.seconds * 1000)
    .toDate()
    .toLocaleDateString();

  let title = '';
  let content = '';
  let backgroundImageUrl = '';
  let logo = '';

  switch (tool_id) {
    case TOOL_IDS.FLASHCARDS: {
      const concepts = response?.map((item) => item.concept) || [];
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

      title = `Flashcards on ${primaryConcept} and More`;
      content = `Includes concepts like ${notableConcepts}`;
      backgroundImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
      logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';
      break;
    }
    case TOOL_IDS.MCQ: {
      title = `Multiple Choice Assessment - ${topic}`;
      content = `Multiple Choice Questions taken from ${topic}`;
      backgroundImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
      logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31';
      break;
    }
    default: {
      title = 'Unknown Tool Usage';
      content = 'This tool usage is not defined.';
      backgroundImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
      logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';
      break;
    }
  }

  return {
    toolId: tool_id,
    response,
    creationDate: transformedDate,
    title,
    content,
    backgroundImageUrl,
    logo,
  };
};
