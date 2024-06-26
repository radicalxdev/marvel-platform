export const transformToolData = (tool_data, response, createdAt) => {
  const transformedDate = new Date(
    createdAt.seconds * 1000
  ).toLocaleDateString();

  // Extract tool_id from the tool_data
  const { tool_id } = tool_data;

  // Common fields for the transformed data
  const baseTransformedData = {
    toolId: tool_id,
    response, // Assuming you want to keep this in the transformed data
    creationDate: transformedDate,
  };

  const num_tool_id = parseInt(tool_data?.tool_id, 10);

  switch (num_tool_id) {
    case 0: {
      // MCQ
      // Extract the topic for MCQ
      const mcqTopic =
        tool_data.inputs.find((input) => input.name === 'topic')?.value ||
        'Unknown Topic';

      const title = `Multiple Choice Assessment - ${mcqTopic}`;
      const content = `Multiple Choice Questions taken from ${mcqTopic}`;

      return {
        ...baseTransformedData,
        title, // No truncation here
        content, // No truncation here
        backgroundImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d', // Replace with the actual URL for MCQ image
        logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
      };
    }

    case 1: {
      // FlashCard
      // Example transformation for FlashCard
      const concepts = response.data?.map((item) => item.concept) || [];
      const primaryConcept = concepts[0] || 'Various Concepts';

      let notableConcepts = '';
      if (concepts.length > 1) {
        notableConcepts =
          concepts.slice(0, 2).join(', ') +
          (concepts.length > 2 ? ', and ' : ' and ') +
          concepts[concepts.length - 1];
      } else {
        notableConcepts = primaryConcept;
      }

      const title = `Flashcards on ${primaryConcept} and More`;
      const content = `Includes concepts like ${notableConcepts}`;

      return {
        ...baseTransformedData,
        title, // No truncation here
        content, // No truncation here
        backgroundImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080', // Replace with the actual URL for FlashCard image
        logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
      };
    }

    default: {
      return {
        ...baseTransformedData,
        title: 'Unknown Tool Usage',
        content: 'This tool usage is not defined.',
        backgroundImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080', // Replace with a default image URL
        logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
      };
    }
  }
};
