import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material';

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
      <List>
        {Object.keys(outputs).map((key, index) => {
          const item = outputs[key];
          return (
            <ListItem key={index} {...styles.listContentProps}>
              <ListItemText
                primary={`${index + 1}. ${item.question}`}
                {...styles.listTextProps}
              />
              <List>
                {item.possibleAnswers.map((answer, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={`${String.fromCharCode(97 + i)}. ${answer}`}
                      {...styles.subListTextProps}
                    />
                  </ListItem>
                ))}
              </List>
              <ListItemText
                primary={`Answer: ${item.correctAnswer}`}
                {...styles.subListTextProps}
              />
              <ListItemText
                primary={`Explanation: ${item.explanation}`}
                {...styles.subListTextProps}
              />
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Grid>
      <Grid>{renderMultipleChoiceQuestions()}</Grid>
    </Grid>
  );
};

export default MultipleChoicePreview;
