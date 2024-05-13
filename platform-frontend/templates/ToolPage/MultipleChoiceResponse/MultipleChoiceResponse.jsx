import { Fade, Grid, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

import styles from './styles';

const MultipleChoiceResponse = () => {
  const {
    response: { title, questions },
  } = useSelector((state) => state.tools);

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>{title}</Typography>
      </Grid>
    );
  };

  const renderQuestion = (question, questionNo) => {
    const optionLetters = ['a', 'b', 'c', 'd'];

    return (
      <Grid {...styles.questionGridProps}>
        <Typography {...styles.questionTitleProps}>
          {questionNo}. {question?.question}
        </Typography>
        <Grid>
          {question?.choices?.map((choice, index) => (
            <Typography
              key={`${questionNo}-choice-${index}`}
              {...styles.choiceProps}
            >
              {optionLetters?.[index]}. {choice}
            </Typography>
          ))}
        </Grid>
      </Grid>
    );
  };

  const renderQuestions = () => {
    return (
      <Grid {...styles.questionsGridProps}>
        {questions?.map((question, i) => renderQuestion(question, i + 1))}
      </Grid>
    );
  };

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        {renderTitle()}
        {renderQuestions()}
      </Grid>
    </Fade>
  );
};
export default MultipleChoiceResponse;
