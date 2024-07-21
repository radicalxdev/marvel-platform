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
        {Object.keys(outputs).map((key, questionNo) => {
          const item = outputs[key];
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
                {item.possibleAnswers.map((answer, i) => (
                  <Typography
                    key={`answer-${questionNo + 1}-${i}`}
                    {...styles.choiceProps}
                  >
                    {String.fromCharCode(65 + i)}. {answer}
                  </Typography>
                ))}
              </Box>
              <Typography
                {...styles.questionAnswerProps}
              >{`Answer: ${item.correctAnswer}`}</Typography>
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
