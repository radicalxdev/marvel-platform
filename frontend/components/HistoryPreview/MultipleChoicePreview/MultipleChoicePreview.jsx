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
   * Function to render the question details section of the history preview, including the category and list of questions with possible answers.
   *
   * @return {JSX.Element} Rendered question details component
   */
  const renderQuestionDetails = () => {
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
            </ListItem>
          );
        })}
      </List>
    );
  };

  /**
   * Function to render the answer details section of the history preview, including the answer key.
   *
   * @return {JSX.Element} Rendered answer details component
   */
  const renderAnswerDetails = () => {
    return (
      <Grid>
        <List>
          <ListSubheader {...styles.listSubHeaderProps}>
            Answer Key
          </ListSubheader>
          {Object.keys(outputs).map((key, index) => {
            const item = outputs[key];
            return (
              <ListItem key={index} {...styles.listContentProps}>
                <ListItemText
                  primary={`${index + 1}. ${item.correctAnswer}`}
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
      </Grid>
    );
  };

  return (
    <Grid>
      <Grid>{renderQuestionDetails()}</Grid>
      <Grid>{renderAnswerDetails()}</Grid>
    </Grid>
  );
};

export default MultipleChoicePreview;
