import { Box, Grid, Typography } from '@mui/material';

import styles from './styles';

const MultipleChoicePreview = (props) => {
  const { outputs } = props;

  /**
   * Function to render the question details section of the history preview, including the question, list of questions with possible answers, the actual answer, and explanation.
   *
   * @return {JSX.Element} Rendered question details component
   */
  const renderMultipleChoiceQuestions = () => {
    return (
      <Grid {...styles.questionsGridProps}>
        {outputs.map((item, questionNo) => {
          return (
            <Grid
              item
              key={`question-${questionNo + 1}`}
              {...styles.questionGridProps}
            >
              <Typography {...styles.questionTitleProps}>
                {questionNo + 1}. {item.question}
              </Typography>
              <Box sx={{ ml: 2 }}>
                {item.choices.map((choice) => (
                  <Typography
                    key={`choice-${questionNo + 1}-${choice.key}`}
                    {...styles.choiceProps}
                  >
                    {choice.key}. {choice.value}
                  </Typography>
                ))}
              </Box>
              <Typography
                {...styles.questionAnswerProps}
              >{`Answer: ${item.answer}`}</Typography>
              <Typography
                {...styles.questionAnswerProps}
              >{`Explanation: ${item.explanation}`}</Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>{renderMultipleChoiceQuestions()}</Grid>
  );
};

export default MultipleChoicePreview;
