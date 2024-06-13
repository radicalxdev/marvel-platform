import React from 'react';
import { Drawer, Grid, List, ListItem, Typography } from '@mui/material';

import styles from './styles';

const SlidePanel = (props) => {
  const { isOpen, onClose, data } = props; // Receive the data prop

  // Example data structure to show if there's no data passed
  const defaultData = {
    title: 'Default Title',
    description: 'Default Description',
    questions: [
      {
        question: 'Default Question 1',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
      },
    ],
    correctAnswers: ['Option A'],
  };

  // Use the data prop or fall back to the default data
  const panelData = data || defaultData;

  const renderHeader = () => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.categoryTitleProps}>
          {panelData?.title}
        </Typography>
        <Typography {...styles.categoryDescriptionProps}>
          {panelData?.description}
        </Typography>
      </Grid>
    );
  };

  const renderQuestions = () => {
    return panelData?.questions?.map((question, index) => (
      <div key={index}>
        <Typography {...styles.questionProps}>
          {index + 1}. {question?.question}
        </Typography>
        <List>
          {question?.options?.map((option, optionIndex) => (
            <ListItem key={optionIndex} sx={{ py: 0 }}>
              <Typography {...styles.optionProps}>
                {String.fromCharCode(97 + optionIndex)}. {option}
              </Typography>
            </ListItem>
          ))}
        </List>
      </div>
    ));
  };

  const renderAnswers = () => {
    return (
      <>
        <Typography {...styles.categoryTitleProps}>Answer Key</Typography>
        <List>
          {panelData?.correctAnswers?.map((answer, answerIndex) => (
            <ListItem key={answerIndex} sx={{ py: 0 }}>
              <Typography {...styles.optionProps}>
                {String.fromCharCode(97 + answerIndex)}. {answer}
              </Typography>
            </ListItem>
          ))}
        </List>
      </>
    );
  };

  const renderContent = () => {
    return (
      <Grid {...styles.containerGridProps}>
        {renderQuestions()}
        {renderAnswers()}
      </Grid>
    );
  };

  return (
    <Drawer {...styles.drawerProps} open={isOpen} onClose={onClose}>
      <Grid {...styles.mainGridProps}>
        {renderHeader()}
        {renderContent()}
      </Grid>
    </Drawer>
  );
};

export default SlidePanel;