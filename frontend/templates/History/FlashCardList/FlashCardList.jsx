import jsPDF from 'jspdf';

import {
  convertToUnixTimestamp,
  formatToStandardDate,
} from '@/utils/FirebaseUtils';
import fetchYoutubeTitle from '@/utils/YoutubeUtils';

class FlashCardList {
  constructor(cardData) {
    this.cardData = cardData;
    this.somePlaceholder = 'This is a placeholder'; // Example usage
  }

  async initializeCard() {
    let backgroundImgURL = '';
    let logoURL = '';

    let title = 'FlashCards for Youtube';
    let description = 'Set of Flashcards about a Youtube video';
    const { createdAt, response, toolId } = this.cardData;
    const { inputs, outputs } = response;
    const formattedCreatedAt = formatToStandardDate(
      new Date(convertToUnixTimestamp(createdAt))
    );

    try {
      title = await fetchYoutubeTitle(inputs.youtubeUrl);
      description = `Set of Flashcards about the YouTube video: ${title}`;
      backgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
      logoURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';
    } catch (error) {
      // Use a logging library or handle the error differently
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

  formatCopyContent(title, createdAt, description, outputs) {
    const placeholder = this.somePlaceholder;
    // Combine the header and preview content into a single string
    let formattedContent = `Title: ${title}\nCreated At: ${createdAt}\nDescription: ${description}\n`;
    // Flashcard format
    formattedContent += '\nFlashcards:\n';
    Object.keys(outputs).forEach((key) => {
      const flashcardData = outputs[key];
      formattedContent += `    ${flashcardData.term}: ${flashcardData.definition}\n`;
    });
    return formattedContent;
  }

  formatExportContent(title, createdAt, description, outputs) {
    const placeholder = this.somePlaceholder;
    const JsPDF = jsPDF;
    const doc = new JsPDF();

    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxTextWidth = pageWidth - margin * 2;
    const cardWidth = pageWidth - margin * 10; // Adjust as needed
    const cardHeight = 50; // Adjust as needed

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

    doc.text('Flashcards:', margin, margin + 40);
    Object.keys(outputs).forEach((key) => {
      // Check if the y-coordinate exceeds the page height, then add a new page
      if (ycoord + cardHeight > pageHeight) {
        doc.addPage();
        ycoord = margin;
      }

      const flashcardData = outputs[key];

      // Calculate positions to center the card
      const cardX = (pageWidth - cardWidth) / 2;

      // Draw the rectangle
      doc.rect(cardX, ycoord, cardWidth, cardHeight);

      // Center the text within the card
      const termX = cardX + cardWidth / 2;
      const definitionX = cardX + cardWidth / 2;
      const termY = ycoord + cardHeight / 2 - 5;
      const definitionY = ycoord + cardHeight / 2 + 5;

      // Add the term and definition inside the rectangle
      doc.setFontSize(14);
      doc.text(flashcardData.term, termX, termY, { align: 'center' });
      doc.setFontSize(12);
      doc.text(flashcardData.definition, definitionX, definitionY, {
        align: 'center',
      });

      ycoord += cardHeight + 10; // Adjust space between cards as needed
    });

    return doc;
  }
}

export default FlashCardList;
