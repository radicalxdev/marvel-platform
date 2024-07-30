import jsPDF from 'jspdf';

import {
  convertToUnixTimestamp,
  formatToStandardDate,
} from '@/utils/FirebaseUtils';
import fetchYoutubeTitle from '@/utils/YoutubeUtils';

function FlashCardList(cardData) {
  async function initializeCard() {
    let backgroundImgURL = '';
    let logoURL = '';

    let title = 'FlashCards for Youtube';
    let description = 'Set of Flashcards about a Youtube video';
    const { updatedAt, response, toolId } = cardData;
    const { inputs, outputs } = response;
    const formattedUpdatedAt = formatToStandardDate(
      new Date(convertToUnixTimestamp(updatedAt))
    );

    try {
      title = await fetchYoutubeTitle(inputs[0].value);
      description = `Set of Flashcards about the YouTube video: ${title}`;
      backgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
      logoURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';
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
    // Flashcard format
    formattedContent += '\nFlashcards:\n\n';
    outputs.forEach((flashcardData) => {
      formattedContent += `${flashcardData.concept}: ${flashcardData.definition}\n\n`;
    });
    return formattedContent;
  }

  function formatExportContent(title, updatedAt, description, outputs) {
    const JsPDF = jsPDF;
    const doc = new JsPDF();

    const margin = 8;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxTextWidth = pageWidth - margin * 2;

    doc.setFontSize(12);

    // Add Title
    const splitTitle = doc.splitTextToSize(`Title: ${title}`, maxTextWidth);
    doc.text(splitTitle, margin, margin);

    // Add Updated At
    const splitUpdatedAt = doc.splitTextToSize(
      `Updated At: ${updatedAt}`,
      maxTextWidth
    );
    doc.text(splitUpdatedAt, margin, margin + 10);

    // Add Description
    const splitDescription = doc.splitTextToSize(
      `Description: ${description}`,
      maxTextWidth
    );
    doc.text(splitDescription, margin, margin + 20);
    let ycoord = margin + 50;

    doc.text('Flashcards:', margin, margin + 40);
    outputs.forEach((flashcardData) => {
      doc.setFontSize(14);
      const splitConcept = doc.splitTextToSize(
        flashcardData.concept,
        maxTextWidth - 20
      );
      doc.setFontSize(12);
      const splitDefinition = doc.splitTextToSize(
        flashcardData.definition,
        maxTextWidth - 20
      );

      // Determine card dimensions based on split text
      const cardWidth = maxTextWidth - 20; // Keep card width within the max text width
      const cardHeight =
        10 + (splitConcept.length + splitDefinition.length) * 10; // Adjust height based on the number of lines

      // Check if the y-coordinate exceeds the page height, then add a new page
      if (ycoord + cardHeight > pageHeight) {
        doc.addPage();
        ycoord = margin;
      }

      // Calculate positions to center the card
      const cardX = (pageWidth - cardWidth) / 2;

      // Draw the rectangle
      doc.rect(cardX, ycoord, cardWidth, cardHeight);

      // Center the text within the card
      let currentY = ycoord + 10;

      // Add the concept inside the rectangle
      doc.setFontSize(14);
      splitConcept.forEach((line) => {
        const textWidth = doc.getTextWidth(line);
        const textX = cardX + (cardWidth - textWidth) / 2;
        doc.text(line, textX, currentY);
        currentY += 10; // Move to the next line
      });

      // Add the definition inside the rectangle
      doc.setFontSize(12);
      splitDefinition.forEach((line) => {
        const textWidth = doc.getTextWidth(line);
        const textX = cardX + (cardWidth - textWidth) / 2;
        doc.text(line, textX, currentY);
        currentY += 10; // Move to the next line
      });

      ycoord += cardHeight + 10; // Adjust space between cards as needed
    });

    return doc;
  }

  return {
    initializeCard,
    formatCopyContent,
    formatExportContent,
  };
}

export default FlashCardList;
