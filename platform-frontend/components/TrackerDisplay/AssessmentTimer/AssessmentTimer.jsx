import { CircularProgress, Grid, Typography } from '@mui/material';

import useTimer from '@/hooks/useTimer';

import { VALIDATION_STATES } from '@/constants/auth';

import styles from './styles';

const AssessmentTimer = (props) => {
  const { startTime, endTime, startTimer, isPractice, handleTimeUp } = props;

  const { minutes, seconds, percentage } = useTimer(
    endTime,
    startTimer,
    handleTimeUp,
    startTime
  );

  if (isPractice) return null;

  const setTimeStatusColor = () => {
    if (percentage <= 25) return VALIDATION_STATES.ERROR;
    return VALIDATION_STATES.WARNING;
  };

  const renderCircularProgress = () => {
    return (
      <Grid {...styles.circularProgressGridProps}>
        <CircularProgress {...styles.defaultCircularProgressProps} />
        <CircularProgress
          {...styles.circularProgressProps}
          color={setTimeStatusColor()}
          value={percentage}
        />
      </Grid>
    );
  };

  const renderCountDownTime = () => {
    return (
      <Grid {...styles.countDownTimeGridProps}>
        <Typography {...styles.timerTextProps}>
          {minutes}:{seconds}
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid {...styles.timerGridProps}>
      {renderCircularProgress()}
      {renderCountDownTime()}
    </Grid>
  );
};

export default AssessmentTimer;
