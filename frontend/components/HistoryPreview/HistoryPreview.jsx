import CloseIcon from '@mui/icons-material/Close';

import {
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';

import styles from './styles';

/**
 * Component for rendering a preview of history details in a drawer.
 *
 * @param {Object} props - Object containing the following properties:
 *  @param {boolean} props.open - Boolean indicating whether the preview drawer is open
 *  @param {Function} props.togglePreview - Function to toggle the preview drawer
 *  @param {string} props.createdAt - Creation date of the history item
 *  @param {string} props.title - Title of the history item
 *  @param {string} props.description - Description of the history item
 *  @param {string} props.category - Category of the history item
 *  @param {Array} props.questions - Array of question objects related to the history item
 *
 * @return {JSX.Element} Rendered history preview component
 */
const HistoryPreview = (props) => {
  const {
    open,
    togglePreview,
    createdAt,
    title,
    description,
    toolId,
    questions,
  } = props;

  /**
   * Function to render the header section of the history preview, including the creation date, title, and description.
   *
   * @return {JSX.Element} Rendered header component
   */
  const renderHeader = () => {
    return (
      <Grid {...styles.headerProps}>
        <Typography {...styles.dateProps}>{createdAt}</Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
      </Grid>
    );
  };

  /**
   * Function to render the question details section of the history preview, including the category and list of questions with possible answers.
   *
   * @return {JSX.Element} Rendered question details component
   */
  const renderQuestionDetails = () => {
    return (
      <List>
        <ListSubheader {...styles.listSubHeaderProps}>{title}</ListSubheader>
        {questions.map((item, index) => (
          <ListItem key={toolId} {...styles.listContentProps}>
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
        ))}
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
          {questions.map((item, index) => (
            <ListItem key={toolId}>
              <ListItemText
                primary={`${index + 1}. ${item.correctAnswer}`}
                {...styles.subListTextProps}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    );
  };

  return (
    open && (
      <Grid {...styles.mainGridProps}>
        <IconButton onClick={togglePreview} {...styles.closeButtonProps}>
          <CloseIcon />
        </IconButton>
        <Drawer {...styles.drawerProps} open={open} onClose={togglePreview}>
          <Grid {...styles.previewContainerProps}>
            <Grid>{renderHeader()}</Grid>
            <Grid>{renderQuestionDetails()}</Grid>
            <Grid>{renderAnswerDetails()}</Grid>
          </Grid>
        </Drawer>
      </Grid>
    )
  );
};

export default HistoryPreview;
