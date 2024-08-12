import { Grid, Typography } from '@mui/material';

import styles from './styles';

/**
 * Renders a flashcard preview component.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.outputs - The array of flashcard items to render.
 * @returns {JSX.Element} A grid containing the rendered flashcard items.
 */
const FlashCardPreview = (props) => {
  const { outputs } = props;

  /**
   * Function to render a single flashcard question
   */
  const renderQuestion = (concept, definition, cardNo) => {
    return (
      <Grid key={`flashCard-${cardNo}`} {...styles.questionGridProps}>
        <Typography {...styles.questionTitleProps}>{concept}</Typography>
        <Typography {...styles.choiceProps}>{definition}</Typography>
      </Grid>
    );
  };

  /**
   * Function to render all flashcard items
   */
  const renderCards = () => {
    return (
      <Grid {...styles.questionsGridProps}>
        {outputs.map((item, i) => {
          return renderQuestion(item?.concept, item?.definition, i + 1);
        })}
      </Grid>
    );
  };

  return <Grid {...styles.mainGridProps}>{renderCards()}</Grid>;
};
export default FlashCardPreview;
