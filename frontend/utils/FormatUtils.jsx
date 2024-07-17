const { default: TOOLS_ID } = require('@/constants/tools');

const formatCopyContent = (title, createdAt, description, toolId, outputs) => {
  // Combine the header and preview content into a single string
  let formattedContent = `Title: ${title}\nCreated At: ${createdAt}\nDescription: ${description}\n`;

  // Format the outputs based on the toolId
  switch (toolId) {
    case TOOLS_ID.GEMINI_QUIZIFY:
      // Multiple Choice Quiz format
      formattedContent += '\nQuestions:\n';
      Object.keys(outputs).forEach((key, index) => {
        const questionData = outputs[key];
        formattedContent += `${index + 1}. ${questionData.question}\n\n`;
        questionData.possibleAnswers.forEach((choice, choiceIndex) => {
          formattedContent += `    ${String.fromCharCode(
            65 + choiceIndex
          )}. ${choice}\n\n`;
        });
        formattedContent += `Answer: ${questionData.correctAnswer}\n`;
        formattedContent += `Explanation: ${questionData.explanation}\n\n`;
      });
      break;
    case TOOLS_ID.GEMINI_DYNAMO:
      // Flashcard format
      formattedContent += '\nFlashcards:\n';
      Object.keys(outputs).forEach((key, index) => {
        const flashcardData = outputs[key];
        formattedContent += `    ${flashcardData.term}: ${flashcardData.definition}\n`;
      });
      break;
    default:
      formattedContent = '';
      formattedContent += '\nNo valid tool selected.\n';
      break;
  }

  return formattedContent;
};

export { formatCopyContent };
