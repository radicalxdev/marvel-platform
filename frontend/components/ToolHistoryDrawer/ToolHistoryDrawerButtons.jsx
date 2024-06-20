import { useState } from 'react';

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Alert, Button, Grid, Snackbar } from '@mui/material';

import styles from './styles';

const ToolHistoryDrawerButtons = (props) => {
  const { createdDate, title, description, questions, options, answers } =
    props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCopy = () => {
    const content = `
      Created Date: ${createdDate}
      Title: ${title}
      Description: ${description}
      
      Questions and Options:
      ${questions
        .map(
          (question, index) => `
        ${index + 1}. ${question}
        ${options
          ?.map(
            (option, qIndex) =>
              `   ${String.fromCharCode(65 + qIndex)}. ${option}`
          )
          .join('\n')}`
        )
        .join('\n')}
      
      Answer Key:
      ${answers
        .map((answer, index) => `${String.fromCharCode(65 + index)}. ${answer}`)
        .join('\n')}
    `;

    navigator.clipboard.writeText(content).then(
      () => {
        setSnackbarMessage('Content copied to clipboard!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      },
      () => {
        setSnackbarMessage('Failed to copy content.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    );
  };

  const handleExport = () => {
    const content = `
      Created Date: ${createdDate}
      Title: ${title}
      Description: ${description}
      
      Questions and Options:
      ${questions
        .map(
          (question, index) => `
        ${index + 1}. ${question}
        ${options
          .map(
            (option, qIndex) =>
              `   ${String.fromCharCode(65 + qIndex)}. ${option}`
          )
          .join('\n')}`
        )
        .join('\n')}
      
      Answer Key:
      ${answers
        .map((answer, index) => `${String.fromCharCode(65 + index)}. ${answer}`)
        .join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'history.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Grid {...styles.mainGridButtonProps}>
        <Button {...styles.buttonProps} onClick={handleCopy}>
          <ContentCopyOutlinedIcon {...styles.buttonIconProps} />
          Copy
        </Button>
        <Button {...styles.buttonProps} onClick={handleExport}>
          <FileDownloadOutlinedIcon {...styles.buttonIconProps} />
          Export
        </Button>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '20%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToolHistoryDrawerButtons;
