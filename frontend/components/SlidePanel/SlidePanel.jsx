import React from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import FileDownloadIcon from '@mui/icons-material/FileDownload';

import {
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';

import styles from './styles'; // Make sure to adjust the import path as needed

const SlidePanel = (props) => {
  const { isOpen, onClose, data } = props; // Receive the data prop

  // Example data structure to show if there's no data passed
  const defaultData = {
    title: 'Default Title',
    description: 'Default Description',
    creationDate: { seconds: new Date().getTime() / 1000 }, // Default to current time
    questions: [
      {
        question: 'Default Question 1',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
      },
    ],
  };

  // Use the data prop or fall back to the default data
  const panelData = data?.response?.data || defaultData;

  // Function to copy content to clipboard with custom formatting
  const handleCopyToClipboard = () => {
    const textToCopy = `
Title: ${panelData.title}

Description: ${panelData.description}

Questions and Options:
${panelData.questions
  ?.map(
    (q, i) =>
      `${i + 1}. ${q.question}\n${q.options
        ?.map((o, idx) => `   ${String.fromCharCode(97 + idx)}. ${o}`)
        .join('\n')}`
  )
  .join('\n\n')}
`;

    navigator.clipboard.writeText(textToCopy);
  };

  // Function to export content to CSV without file-saver
  const handleExportToCSV = () => {
    // Determine the maximum number of options available in the data
    const maxOptions = Math.max(
      ...panelData.questions.map((q) => q.options.length)
    );

    // Create dynamic CSV headers based on the maximum number of options
    const headers = [
      'Question',
      ...Array.from({ length: maxOptions }, (_, i) => `Option ${i + 1}`),
    ];

    // Map the questions and their options into the CSV format
    const rows = panelData.questions.map((q) => [
      q.question,
      ...q.options.slice(0, maxOptions), // Include only available options
    ]);

    // Combine headers and rows into the final CSV content
    const csvContent = [
      headers, // Headers row
      ...rows, // Data rows
    ]
      .map((e) => e.join(',')) // Join columns with commas
      .join('\n'); // Join rows with newlines

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    // Create a link element and simulate a click to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = `${panelData.title.replace(/\s+/g, '_').toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const renderHeader = () => {
    return (
      <Grid container direction="column" {...styles.headerGridProps}>
        <Grid item>
          <Typography {...styles.dateProps}>
            {new Date(
              panelData.creationDate.seconds * 1000
            ).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography {...styles.categoryTitleProps}>
            {panelData?.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography {...styles.categoryDescriptionProps}>
            {panelData?.description}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderQuestions = () => {
    return (
      panelData?.map((item, index) => (
        <div key={index}>
          <Typography {...styles.questionProps}>
            {index + 1}. {item?.question}
          </Typography>
          <List>
            {item?.choices?.map((choice) => (
              <ListItem key={choice.key} sx={{ py: 0 }}>
                <Typography {...styles.optionProps}>
                  {choice.key}. {choice.value}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      )) || null
    );
  };

  const renderFlashCards = () => {
    return (
      <Grid {...styles.flashCardsGridProps}>
        {panelData?.map((item, index) => (
          <Grid key={index} {...styles.flashCardGridProps}>
            <Typography {...styles.conceptTitleProps}>
              {item?.concept}
            </Typography>
            <Typography {...styles.definitionProps}>
              {item?.definition}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderContent = () => {
    return (
      <Grid {...styles.containerGridProps}>
        {data?.toolId === '1' ? renderFlashCards() : renderQuestions()}
      </Grid>
    );
  };

  const renderFooterButtons = () => (
    <Grid container justifyContent="flex-start" sx={{ mt: 3, width: '100%' }}>
      <Button onClick={handleCopyToClipboard} {...styles.copyButton}>
        <ContentCopyIcon {...styles.CopyIcon} />
        Copy
      </Button>
      <Button onClick={handleExportToCSV} {...styles.exportButton}>
        <FileDownloadIcon {...styles.downloadIcon} />
        Export
      </Button>
    </Grid>
  );

  return (
    <Drawer {...styles.drawerProps} open={isOpen} onClose={onClose}>
      <Grid {...styles.mainGridProps}>
        {renderHeader()}
        {renderContent()}
        {renderFooterButtons()}
      </Grid>
    </Drawer>
  );
};

export default SlidePanel;
