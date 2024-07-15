import CloseIcon from '@mui/icons-material/Close';

import { Button, Drawer, Grid, IconButton, Typography } from '@mui/material';

import FlashCardPreview from './FlashCardPreview';
import MultipleChoicePreview from './MultipleChoicePreview';

import styles from './styles';

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

  const handleCopy = () => {
    // Combine the header and preview content into a single string
    let contentToCopy = `Title: ${title}\nCreated At: ${createdAt}\nDescription: ${description}\n`;

    // Format the outputs based on the toolId
    if (toolId === '0') {
      // Multiple Choice Quiz format
      contentToCopy += '\nQuestions:\n';
      Object.keys(outputs).forEach((key, index) => {
        const questionData = outputs[key];
        contentToCopy += `${index + 1}. ${questionData.question}\n\n`;
        questionData.possibleAnswers.forEach((choice, choiceIndex) => {
          contentToCopy += `    ${String.fromCharCode(
            65 + choiceIndex
          )}. ${choice}\n\n`;
        });
        contentToCopy += `Answer: ${questionData.correctAnswer}\n`;
        contentToCopy += `Explanation: ${questionData.explanation}\n\n`;
      });
    } else if (toolId === '1') {
      // Flashcard format
      contentToCopy += '\nFlashcards:\n';
      Object.keys(outputs).forEach((key, index) => {
        const flashcardData = outputs[key];
        contentToCopy += `    ${flashcardData.term}: ${flashcardData.definition}\n`;
      });
    }

    // Copy the content to the clipboard
    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        alert('copied content successfully');
      })
      .catch((error) => {
        alert('Error copying content: ', error);
      });
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
      case '0':
        return <MultipleChoicePreview outputs={outputs} />;
      case '1':
        return <FlashCardPreview outputs={outputs} />;
      default:
        return null;
    }
  };

  const renderOutputButtons = () => {
    return (
      <Grid {...styles.gridButtonProps}>
        <Button {...styles.buttonProps} onClick={handleCopy}>
          Copy
        </Button>
        <Button {...styles.buttonProps}>Export</Button>
      </Grid>
    );
  };

  return (
    open && (
      <Grid {...styles.mainGridProps}>
        <IconButton onClick={togglePreview} {...styles.closeButtonProps}>
          <CloseIcon />
        </IconButton>
        <Drawer {...styles.drawerProps} open={open} onClose={togglePreview}>
          <Grid {...styles.previewContainerProps}>
            <Grid>{renderHeader()}</Grid>
            <Grid>{renderPreview()}</Grid>
            <Grid>{renderOutputButtons()}</Grid>
          </Grid>
        </Drawer>
      </Grid>
    )
  );
};

export default HistoryPreview;
