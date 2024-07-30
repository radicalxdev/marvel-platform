import jsPDF from 'jspdf';

import {
  convertToUnixTimestamp,
  formatToStandardDate,
} from '@/utils/FirebaseUtils';

function MultipleChoiceResponse(cardData) {
  async function initializeCard() {
    let backgroundImgURL = '';
    let logoURL = '';

    let title = 'Multiple Choice Quiz';
    let description = 'Multiple Choice questions about a certain topic';
    const { updatedAt, response, toolId } = cardData;
    const { inputs, outputs } = response;
    const formattedUpdatedAt = formatToStandardDate(
      new Date(convertToUnixTimestamp(updatedAt))
    );
    try {
      title = inputs[0].value;
      description = `${inputs[1].value} Multiple Choice questions about the topic: ${title}`;
      backgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
      logoURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31';
    } catch (error) {
      console.error('Error fetching YouTube title:', error);
    }
    return {
      title,
      description,
      updatedAt: formattedUpdatedAt,
      outputs: outputs.data,
      backgroundImgURL,
      logoURL,
      toolId,
    };
  }

  function formatCopyContent(title, updatedAt, description, outputs) {
    // Combine the header and preview content into a single string
    let formattedContent = `Title: ${title}\nUpdated At: ${updatedAt}\nDescription: ${description}\n`;
    // Multiple Choice Quiz format
    formattedContent += '\nQuestions:\n\n';
    outputs.forEach((questionData, index) => {
      formattedContent += `${index + 1}. ${questionData.question}\n\n`;
      questionData.choices.forEach((choice) => {
        formattedContent += `    ${choice.key}. ${choice.value}\n\n`;
      });
      formattedContent += `Answer: ${questionData.answer}\n`;
      formattedContent += `Explanation: ${questionData.explanation}\n\n`;
    });
    return formattedContent;
  }

  function formatExportContent(title, updatedAt, description, outputs) {
    const JsPDF = jsPDF;
    const doc = new JsPDF();

    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxTextWidth = pageWidth - margin * 2;

    doc.setFontSize(12);

    // Add Title
    const splitTitle = doc.splitTextToSize(`Title: ${title}`, maxTextWidth);
    doc.text(splitTitle, margin, margin);

    // Add Created At
    const splitCreatedAt = doc.splitTextToSize(
      `Created At: ${updatedAt}`,
      maxTextWidth
    );
    doc.text(splitCreatedAt, margin, margin + 10);

    // Add Description with text wrapping
    const splitDescription = doc.splitTextToSize(
      `Description: ${description}`,
      maxTextWidth
    );
    doc.text(splitDescription, margin, margin + 20);
    let ycoord = margin + 50;

    doc.text('Questions:', margin, margin + 40);
    outputs.forEach((questionData, index) => {
      // Split and add question text
      const splitQuestion = doc.splitTextToSize(
        `${index + 1}. ${questionData.question}`,
        maxTextWidth
      );
      splitQuestion.forEach((line) => {
        if (ycoord >= pageHeight - margin) {
          doc.addPage();
          ycoord = margin;
        }
        doc.text(line, margin, ycoord);
        ycoord += 10;
      });

      // Split and add choices text
      questionData.choices.forEach((choice) => {
        const splitChoice = doc.splitTextToSize(
          `    ${choice.key}. ${choice.value}`,
          maxTextWidth
        );
        splitChoice.forEach((line) => {
          if (ycoord >= pageHeight - margin) {
            doc.addPage();
            ycoord = margin;
          }
          doc.text(line, margin, ycoord);
          ycoord += 10;
        });
      });

      // Split and add answer text
      const splitAnswer = doc.splitTextToSize(
        `Answer: ${questionData.answer}`,
        maxTextWidth
      );
      splitAnswer.forEach((line) => {
        if (ycoord >= pageHeight - margin) {
          doc.addPage();
          ycoord = margin;
        }
        doc.text(line, margin, ycoord);
        ycoord += 10;
      });

      // Split and add explanation text
      const splitExplanation = doc.splitTextToSize(
        `Explanation: ${questionData.explanation}`,
        maxTextWidth
      );
      splitExplanation.forEach((line) => {
        if (ycoord >= pageHeight - margin) {
          doc.addPage();
          ycoord = margin;
        }
        doc.text(line, margin, ycoord);
        ycoord += 10;
      });

      ycoord += 10; // Add some space before the next question
    });

    return doc;
  }

  return {
    initializeCard,
    formatCopyContent,
    formatExportContent,
  };
}

export default MultipleChoiceResponse;
