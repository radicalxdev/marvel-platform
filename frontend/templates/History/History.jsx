import { Grid, Typography } from '@mui/material';

import styles from './styles';

const HistoryInterface = () => {
  return (
    <Grid {...styles.titleGridProps}>
      <Typography {...styles.titleProps}>Output History</Typography>
    </Grid>
  );
};

export default HistoryInterface;
