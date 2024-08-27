import jsPDF from 'jspdf';

import {
  convertToUnixTimestamp,
  formatToStandardDate,
} from '@/utils/FirebaseUtils';

/**
 * Class that defines a set of functions to manage the utilities for an individual FlashCardList response
 * @returns all of the functions assoicated with this utility class.
 */
function FlashCardListUtils() {
  /**
   * Asynchronously processes and formats the session response data.
   * @param {Map} response - The session response containing inputs, outputs, and timestamp.
   *
   * @returns {Object} - An object with the formatted session details including:
   *   - `title` (string): The title of the flashcard set.
   *   - `description` (string): Description of the flashcard set.
   *   - `backgroundImgURL` (string): URL of the background image.
   *   - `logoURL` (string): URL of the logo image.
   *   - `createdAt` (string): Formatted timestamp of when the session was updated.
   *   - `outputs` (Array): Array of flashcard data.
   */
  async function initializeResponseForSession(response) {
    let backgroundImgURL = '';
    let logoURL = '';

    let title = 'FlashCards for Youtube';
    let description = 'Set of Flashcards about a Youtube video';
    const { outputs, createdAt } = response;
    const formattedCreatedAt = formatToStandardDate(
      new Date(convertToUnixTimestamp(createdAt))
    );
    try {
      const concepts = outputs?.map((card) => card.concept) || [];
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
      description = `Includes concepts like ${notableConcepts}`;
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
      backgroundImgURL,
      logoURL,
      createdAt: formattedCreatedAt,
      outputs,
    };
  }

  /**
   * Function to format the content for copying to the clipboard or text output
   * @param {string} title - title of the response
   * @param {timestamp} createdAt - timestamp of when the response was made or when the session card was updated with this response
   * @param {string} description - descrption of the response
   * @param {Array} outputs - AI output given of the response
   *
   */
  function copyContent(title, createdAt, description, outputs) {
    // Combine the header and preview content into a single string
    let formattedContent = `Title: ${title}\nCreated At: ${createdAt}\nDescription: ${description}\n`;
    // Flashcard format
    formattedContent += '\nFlashcards:\n\n';
    outputs.forEach((flashcardData) => {
      formattedContent += `${flashcardData.concept}: ${flashcardData.definition}\n\n`;
    });
    navigator.clipboard.writeText(formattedContent);
  }

  /**
   * Function to format content for export to a PDF document
   * @param {string} title - title of the response
   * @param {timestamp} createdAt - timestamp of when the response was made or when the session card was updated with this response
   * @param {string} description - descrption of the response
   * @param {Array} outputs - AI output given of the response
   *
   */
  function exportContentAsPDF(title, createdAt, description, outputs) {
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
    const splitCreatedAt = doc.splitTextToSize(
      `Created At: ${createdAt}`,
      maxTextWidth
    );
    doc.text(splitCreatedAt, margin, margin + 10);

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

    doc.save(`${title}.pdf`);
  }

  /**
   * Function to format content and eventually export to a CSV document
   * @param {string} title - title of the response
   * @param {Array} outputs - AI output given of the response
   *
   */
  function exportContentAsCSV(title, outputs) {
    const escapeCSVField = (field) =>
      typeof field === 'string' ? `"${field.replace(/"/g, '""')}"` : field;

    const headers = ['Concept', 'Definition'];
    const rows = outputs.map((item) => [
      escapeCSVField(item.concept),
      escapeCSVField(item.definition),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((e) => e.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_').toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return {
    initializeResponseForSession,
    copyContent,
    exportContentAsPDF,
    exportContentAsCSV,
  };
}

export default FlashCardListUtils;
