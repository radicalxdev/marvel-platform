import { Grid, LinearProgress } from '@mui/material';

import styles from './styles';

const ProgressBar = (props) => {
  const { current, total, progress, isPractice } = props;
  return (
    <Grid {...styles.progressBarGridProps}>
      {!isPractice && (
        <Grid
          {...styles.assessmentTrackerProps(progress)}
        >{`${current}/${total}`}</Grid>
      )}
      <LinearProgress {...styles.progressBarProps} value={progress} />
    </Grid>
  );
};

export default ProgressBar;
