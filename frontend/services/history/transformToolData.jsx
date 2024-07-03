import moment from 'moment';

import { TOOL_OUTPUT } from '@/constants/toolOutput';

export const transformToolData = ({ topic, response, createdAt, tool_id }) => {
  const transformedDate = moment(createdAt.seconds * 1000)
    .toDate()
    .toLocaleDateString();

  const baseTransformedData = {
    toolId: tool_id,
    response,
    creationDate: transformedDate,
  };

  const toolDetails = TOOL_OUTPUT[tool_id];

  if (toolDetails) {
    let title = '';
    let content = '';

    if (tool_id === '1') {
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

      title = `${toolDetails.titlePrefix} ${primaryConcept} and More`;
      content = `${toolDetails.descriptionPrefix} ${notableConcepts}`;
    } else {
      title = `${toolDetails.titlePrefix} ${topic}`;
      content = `${toolDetails.descriptionPrefix} ${topic}`;
    }

    return {
      ...baseTransformedData,
      title,
      content,
      backgroundImageUrl: toolDetails.backgroundImageUrl,
      logo: toolDetails.logo,
    };
  }

  return {
    ...baseTransformedData,
    title: 'Unknown Tool Usage',
    content: 'This tool usage is not defined.',
    backgroundImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
  };
};
