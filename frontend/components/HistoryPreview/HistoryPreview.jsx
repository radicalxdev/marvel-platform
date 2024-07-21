import { Close, FileCopyOutlined, GetAppOutlined } from '@mui/icons-material';

import { Button, Drawer, Grid, IconButton, Typography } from '@mui/material';

import TOOLS_ID from '@/constants/tools';

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
    cardInstance,
    open,
    togglePreview,
    createdAt,
    title,
    description,
    toolId,
    outputs,
  } = props;

  const handleCopy = () => {
    const contentToCopy = cardInstance.formatCopyContent(
      title,
      createdAt,
      description,
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
    const contentToExport = cardInstance.formatExportContent(
      title,
      createdAt,
      description,
      outputs
    );

    // save and export to pdf
    contentToExport.save(`${title}.pdf`);
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
      <Grid container spacing={2} {...styles.gridButtonProps}>
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
          <Grid {...styles.previewContainerProps}>
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
