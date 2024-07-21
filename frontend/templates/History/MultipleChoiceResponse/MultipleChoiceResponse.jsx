import jsPDF from 'jspdf';

import HistoryCardTemplate from '../HistoryCardTemplate';

import {
  convertToUnixTimestamp,
  formatToStandardDate,
} from '@/utils/FirebaseUtils';

class MultipleChoiceResponse extends HistoryCardTemplate {
  async initializeCard() {
    let backgroundImgURL = '';
    let logoURL = '';

    let title = 'Multiple Choice Quiz';
    let description = 'Multiple Choice questions about a certain topic';
    const { createdAt, response, toolId } = this.cardData;
    const { inputs, outputs } = response;
    const formattedCreatedAt = formatToStandardDate(
      new Date(convertToUnixTimestamp(createdAt))
    );
    try {
      title = inputs.topic;
      description = `${inputs.num_questions} Multiple Choice questions about the topic: ${title}`;
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
      createdAt: formattedCreatedAt,
      outputs,
      backgroundImgURL,
      logoURL,
      toolId,
    };
  }

  static formatCopyContent(title, createdAt, description, outputs) {
    // Combine the header and preview content into a single string
    let formattedContent = `Title: ${title}\nCreated At: ${createdAt}\nDescription: ${description}\n`;
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
    return formattedContent;
  }

  static formatExportContent(title, createdAt, description, outputs) {
    const JsPDF = jsPDF;
    const doc = new JsPDF();

    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxTextWidth = pageWidth - margin * 2;

    doc.setFontSize(12);

    // Add Title
    doc.text(`Title: ${title}`, margin, margin);

    // Add Created At
    doc.text(`Created At: ${createdAt}`, margin, margin + 10);

    // Add Description with text wrapping
    const splitDescription = doc.splitTextToSize(
      `Description: ${description}`,
      maxTextWidth
    );
    doc.text(splitDescription, margin, margin + 20);
    let ycoord = margin + 50;

    doc.text('Questions:', margin, margin + 40);
    Object.keys(outputs).forEach((key, index) => {
      const questionData = outputs[key];
      doc.text(`${index + 1}. ${questionData.question}`, margin, ycoord);
      ycoord += 10;
      questionData.possibleAnswers.forEach((choice, choiceIndex) => {
        doc.text(
          `    ${String.fromCharCode(65 + choiceIndex)}. ${choice}`,
          margin,
          ycoord
        );
        ycoord += 10;
      });
      doc.text(`Answer: ${questionData.correctAnswer}`, margin, ycoord);
      ycoord += 10;
      doc.text(`Explanation: ${questionData.explanation}`, margin, ycoord);
      ycoord += 20; // Add some space before the next question
    });

    return doc;
  }
}

export default MultipleChoiceResponse;
