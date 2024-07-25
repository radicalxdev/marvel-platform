import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styles from './styles'; // Import styles

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

const ProgressBar = ({ currentStep }) => {
  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.progressBarContainer}>
        {steps.map((_, index) => (
          <Grid key={index} {...styles.gridProps}>
            <Grid {...styles.containerProps}>
              <Grid {...styles.getStepCircleStyle(index < currentStep)} />
            </Grid>
            <Grid>
              <Typography {...styles.stepLabelProps}>{steps[index]}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ProgressBar;
