import { Close, FileCopyOutlined, GetAppOutlined } from '@mui/icons-material';

import { Button, Drawer, Grid, IconButton, Typography } from '@mui/material';

import jsPDF from 'jspdf';

import FlashCardPreview from './FlashCardPreview';
import MultipleChoicePreview from './MultipleChoicePreview';

import styles from './styles';
import TOOLS_ID from '@/constants/tools';
import { formatCopyContent } from '@/utils/FormatUtils';

/**
 * Component for rendering a preview of history details in a drawer.
 *
 * @param {Object} props - Object containing the following properties:
 *  @param {boolean} props.open - Boolean indicating whether the preview drawer is open
 *  @param {Function} props.togglePreview - Function to toggle the preview drawer
 *  @param {string} props.createdAt - Creation date of the history item
 *  @param {string} props.title - Title of the history item
 *  @param {string} props.description - Description of the history item
 *  @param {string} props.category - Category of the history item
 *  @param {Array} props.questions - Array of question objects related to the history item
 *
 * @return {JSX.Element} Rendered history preview component
 */
const HistoryPreview = (props) => {
  const {
    open,
    togglePreview,
    createdAt,
    title,
    description,
    toolId,
    outputs,
  } = props;
  const JsPDF = jsPDF;
  const handleCopy = () => {
    const contentToCopy = formatCopyContent(
      title,
      createdAt,
      description,
      toolId,
      outputs
    );

    // Copy the content to the clipboard
    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        alert('copied content successfully');
      })
      .catch((error) => {
        alert('Error copying content: ', error);
      });

    return null;
  };

  const handleExport = () => {
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

    // Add Flashcards or Multiple Choice Questions based on toolId
    switch (toolId) {
      case TOOLS_ID.GEMINI_QUIZIFY:
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
        break;

      case TOOLS_ID.GEMINI_DYNAMO:
        doc.text('Flashcards:', margin, margin + 40);
        Object.keys(outputs).forEach((key) => {
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

          // Check if the y-coordinate exceeds the page height, then add a new page
          if (ycoord + cardHeight > pageHeight) {
            doc.addPage();
            ycoord = margin;
          }
        });
        break;

      default:
        return null;
    }

    // Save the PDF
    doc.save('output.pdf');
    return null;
  };

  /**
   * Function to render the header section of the history preview, including the creation date, title, and description.
   *
   * @return {JSX.Element} Rendered header component
   */
  const renderHeader = () => {
    return (
      <Grid {...styles.headerProps}>
        <Typography {...styles.dateProps}>{createdAt}</Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
      </Grid>
    );
  };

  const renderPreview = () => {
    switch (toolId) {
      case TOOLS_ID.GEMINI_QUIZIFY:
        return <MultipleChoicePreview outputs={outputs} />;
      case TOOLS_ID.GEMINI_DYNAMO:
        return <FlashCardPreview outputs={outputs} />;
      default:
        return null;
    }
  };

  const renderOutputButtons = () => {
    return (
      <Grid container {...styles.gridButtonProps}>
        <Grid item>
          <Button
            {...styles.buttonProps}
            onClick={handleCopy}
            startIcon={<FileCopyOutlined />}
          >
            Copy
          </Button>
        </Grid>
        <Grid item>
          <Button
            {...styles.buttonProps}
            onClick={handleExport}
            startIcon={<GetAppOutlined />}
          >
            Export
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    open && (
      <Grid {...styles.mainGridProps}>
        <IconButton onClick={togglePreview} {...styles.closeButtonProps}>
          <Close />
        </IconButton>
        <Drawer {...styles.drawerProps} open={open} onClose={togglePreview}>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            {...styles.previewContainerProps}
          >
            <Grid item>{renderHeader()}</Grid>
            <Grid item>{renderPreview()}</Grid>
            <Grid item>{renderOutputButtons()}</Grid>
          </Grid>
        </Drawer>
      </Grid>
    )
  );
};

export default HistoryPreview;
