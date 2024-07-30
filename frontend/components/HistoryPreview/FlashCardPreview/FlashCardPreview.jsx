import { Grid, Typography } from '@mui/material';

import styles from './styles';

const FlashCardPreview = (props) => {
  const { outputs } = props;

  const renderQuestion = (concept, definition, cardNo) => {
    return (
      <Grid key={`flashCard-${cardNo}`} {...styles.questionGridProps}>
        <Typography {...styles.questionTitleProps}>{concept}</Typography>
        <Typography {...styles.choiceProps}>{definition}</Typography>
      </Grid>
    );
  };

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
