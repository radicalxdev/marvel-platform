import { Grid, Typography } from '@mui/material';

import styles from '../styles';

const FlashCardsOutput = (props) => {
  const { outputs } = props;
  /**
   * Function to render a single flashcard question
   */
  const renderQuestion = (concept, definition, cardNo) => {
    return (
      <Grid key={`flashCard-${cardNo}`} {...styles.flashCardGridProps}>
        <Typography {...styles.conceptTitleProps}>{concept}</Typography>
        <Typography {...styles.definitionProps}>{definition}</Typography>
      </Grid>
    );
  };

  /**
   * Function to render all flashcard items
   */
  const renderCards = () => {
    return (
      <Grid {...styles.flashCardsGridProps}>
        {outputs.map((item, i) => {
          return renderQuestion(item?.concept, item?.definition, i + 1);
        })}
      </Grid>
    );
  };

  return <Grid {...styles.mainGridProps}>{renderCards()}</Grid>;
};

export default FlashCardsOutput;
