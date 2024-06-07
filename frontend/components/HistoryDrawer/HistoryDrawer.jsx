// components/HistoryDrawer/HistoryDrawer.js
import { Drawer, Grid, List, ListItem, Typography } from '@mui/material';

import styles from './styles';

const questions = ['Question 1', 'Question 2', 'Question 3']; // Example list of questions
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // Example list of options
const answers = ['Answer 1', 'Answer 2', 'Answer 3']; // Example list of answers

/**
 * Renders the HistoryDrawer component.
 *
 * @param {object} props - The properties of the component.
 * @param {boolean} props.open - Whether the drawer is open.
 * @param {function} props.toggleDrawer - The function to toggle the drawer.
 * @param {string} props.createdDate - The date the tool was created.
 * @param {string} props.title - The title of the tool.
 * @param {string} props.description - The description of the tool.
 * @returns {JSX.Element} The HistoryDrawer component.
 */
const HistoryDrawer = (props) => {
  const { open, toggleDrawer, createdDate, title, description } = props;

  const renderDrawerHeader = () => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.dateProps}>{createdDate}</Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
        <Typography {...styles.underlineProps} />
      </Grid>
    );
  };

  const renderDrawerList = () => {
    return (
      <Grid {...styles.listGridProps}>
        {questions.map((question, index) => (
          <div key={question}>
            <Typography {...styles.listTitleProps}>{`${
              index + 1
            }. ${question}`}</Typography>
            <List>
              {options.map((option, qIndex) => (
                <Grid key={option} {...styles.listItemGridProps}>
                  <ListItem>
                    <Typography
                      {...styles.listItemProps}
                    >{`${String.fromCharCode(
                      65 + qIndex
                    )}. ${option}`}</Typography>
                  </ListItem>
                </Grid>
              ))}
            </List>
          </div>
        ))}
      </Grid>
    );
  };

  const renderAnswerKey = () => {
    return (
      <Grid {...styles.answerKeyGridProps}>
        <Typography {...styles.answerKeyTitleProps}>Answer Key</Typography>
        <List>
          {answers.map((answer, index) => (
            <ListItem key={answer}>
              <Typography
                {...styles.answerKeyItemProps}
              >{`${String.fromCharCode(65 + index)}. ${answer}`}</Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        {...styles.drawerGridProps}
      >
        {renderDrawerHeader()}
        {renderDrawerList()}
        {renderAnswerKey()}
      </Drawer>
    </Grid>
  );
};

export default HistoryDrawer;
