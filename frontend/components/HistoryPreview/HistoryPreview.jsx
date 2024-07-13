import CloseIcon from '@mui/icons-material/Close';

import { Drawer, Grid, IconButton, Typography } from '@mui/material';

import MultipleChoicePreview from './MultipleChoicePreview';
import FlashCardPreview from './FlashCardPreview';

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
    outputs,
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

  const renderPreview = () => {
    switch (toolId) {
      case '0':
        return <MultipleChoicePreview outputs={outputs} />;
      case '1':
        return <FlashCardPreview outputs={outputs} />;
      default:
        return null;
    }
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
            <Grid>{renderPreview()}</Grid>
          </Grid>
        </Drawer>
      </Grid>
    )
  );
};

export default HistoryPreview;
