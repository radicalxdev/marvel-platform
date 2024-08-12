import { Box, Grid, Typography } from '@mui/material';

import styles from './styles';
/**
 * Renders a component for displaying multiple-choice questions based on the provided outputs.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.outputs - An array of objects representing the multiple-choice questions to be displayed.
 * @returns {JSX.Element} A React component with the rendered multiple-choice questions.
 */
const MultipleChoicePreview = (props) => {
  const { outputs } = props;

  /**
   * Function to render each of the multiple-choice questions like the question itself, the possible choices, the correct answer, and the explanation behind the answer.
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
