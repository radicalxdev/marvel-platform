import { Close, FileCopyOutlined, GetAppOutlined } from '@mui/icons-material';

import {
  Alert,
  Button,
  Drawer,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';

import TOOLS_ID from '@/constants/tools';

import FlashCardPreview from './FlashCardPreview';
import MultipleChoicePreview from './MultipleChoicePreview';

import styles from './styles';
import { useState } from 'react';

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

  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handleAlertClose = () => {
    setAlertState({
      ...alertState,
      open: false,
    });
  };

  const handleCopy = () => {
    const contentToCopy = cardInstance.formatCopyContent(
      title,
      createdAt,
      description,
      outputs
    );

    // Copying the card content
    navigator.clipboard
      .writeText(contentToCopy)
      .then(() => {
        setAlertState({
          open: true,
          message: 'Copy card successfully!',
          severity: 'success',
        });
      })
      .catch((error) => {
        setAlertState({
          open: true,
          message: 'Error copying card',
          severity: 'error',
        });
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
    try {
      contentToExport.save(`${title}.pdf`);
      setAlertState({
        open: true,
        message: 'Export card successfully!',
        severity: 'success',
      });
    } catch (error) {
      setAlertState({
        open: true,
        message: 'Error exporting card',
        severity: 'error',
      });
    }
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
        <Snackbar
          open={alertState.open}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleAlertClose} severity={alertState.severity}>
            {alertState.message}
          </Alert>
        </Snackbar>
      </Grid>
    )
  );
};

export default HistoryPreview;
