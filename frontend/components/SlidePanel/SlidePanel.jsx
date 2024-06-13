import React from 'react';

import { Drawer, Grid, List, ListItem, Typography } from '@mui/material';

import styles from './styles';

const SlidePanel = (props) => {
  const { isOpen, onClose } = props;
  // Dummy Data
  const multipleChoice = {
    title: 'Advanced CSS Techniques',
    description:
      'Understand the fundamentals of JavaScript, including variables, functions, and loops.',
    questions: [
      {
        question: 'What is the purpose of React?',
        options: [
          'Building user interfaces',
          'Data analysis',
          'Server-side scripting',
          'Machine learning',
        ],
      },
      {
        question: 'Which of the following is a CSS framework?',
        options: ['Bootstrap', 'Django', 'Flask', 'Ruby on Rails'],
      },
      {
        question: 'Which of these is a primitive data type in JavaScript?',
        options: ['String', 'Document', 'Array', 'Function'],
      },
    ],
    correctAnswers: ['Building user interfaces', 'Bootstrap', 'String'],
  };

  const renderHeader = () => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.categoryTitleProps}>
          {multipleChoice?.title}
        </Typography>
        <Typography {...styles.categoryDescriptionProps}>
          {multipleChoice?.description}
        </Typography>
      </Grid>
    );
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.containerGridProps}>
        <Typography {...styles.categoryTitleProps}>
          {multipleChoice?.title}
        </Typography>
      </Grid>
    );
  };

  const renderQuestions = () => {
    return multipleChoice?.questions?.map((question, index) => (
      <>
        <Typography key={index} {...styles.questionProps}>
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
      </>
    ));
  };

  const renderAnswers = () => {
    return (
      <>
        <Typography {...styles.categoryTitleProps}>Answer Key</Typography>
        <List>
          {multipleChoice?.correctAnswers?.map((answer, answerIndex) => (
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
        {renderTitle()}
        {renderContent()}
      </Grid>
      ;
    </Drawer>
  );
};

export default SlidePanel;
