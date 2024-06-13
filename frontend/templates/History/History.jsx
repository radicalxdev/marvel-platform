import { Grid, Typography } from '@mui/material';

import HistoryCard from '@/components/HistoryCard';

import BookImage from '../../assets/images/BookImage.png';
import BackgroundImage from '../../assets/images/temporary-background.png';

import styles from './styles';

const HistoryInterface = () => {
  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>Output History</Typography>
      </Grid>
    );
  };
  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {/* Remove this below when making the list of history cards */}
      <HistoryCard
        backgroundImgURL={BackgroundImage}
        title="Youtube Question"
        logo={BookImage}
        description="This is a test"
        createdDate="06/24/2024"
      />
    </Grid>
  );
};

export default HistoryInterface;
