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

const HistoryPreview = (props) => {
  const {
    open,
    togglePreview,
    createdDate,
    title,
    description,
    questionDetails,
    answerKeyDetails,
  } = props;

  const renderHeader = () => {
    return (
      <Grid {...styles.headerProps}>
        <Typography {...styles.dateProps}>{createdDate}</Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
      </Grid>
    );
  };

  const renderQuestionDetails = () => {
    return (
      <List>
        <ListSubheader {...styles.listSubHeaderProps}>{title}</ListSubheader>
        {questionDetails.map((item, index) => (
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
        ))}
      </List>
    );
  };

  const renderAnswerDetails = () => {
    return (
      <Grid>
        <List>
          <ListSubheader {...styles.listSubHeaderProps}>
            Answer Key
          </ListSubheader>
          {answerKeyDetails.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${index + 1}. ${item.answer}`}
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
