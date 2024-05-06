import { Grid, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

import ProgressBar from '@/components/TrackerDisplay/ProgressBar';
import AssessmentTimer from '@/components/TrackerDisplay/AssessmentTimer';
import TrackerDialog from './TrackerDialog';

import { ASSESSMENT_DIALOG_STATES } from '@/constants/assessment';

import styles from './styles';

/**
 * Renders the TrackerDisplay component.
 *
 * @param {Object} props - The properties for the component.
 * @param {Date} props.startTime - The start time of the tracker.
 * @param {Date} props.endTime - The end time of the tracker.
 * @param {boolean} props.startTimer - Flag to start the timer.
 * @param {number} props.order - The current progress of the tracker.
 * @param {number} props.total - The total progress of the tracker.
 * @param {number} props.progress - The progress as a percentage.
 * @param {boolean} props.remove - Flag indicating if the component should be removed.
 * @return {JSX.Element | null} The rendered TrackerDisplay component.
 */
const TrackerDisplay = (props) => {
  const {
    startTime,
    endTime,
    startTimer,
    questionsCorrect,
    order,
    total,
    progress,
    remove,
    scoreDetails,
    openDialog,
    setOpenDialog,
    resetQuiz,
    setIsComplete,
    setDialogState,
    setSelectedValue,
    setSelected,
    dialogState,
    handleSetTasksAnswers,
    isPractice,
  } = props;

  const toggleOpenDialog = () => setOpenDialog((prev) => !prev);

  const handleExit = () => {
    setDialogState(ASSESSMENT_DIALOG_STATES.EXIT);
    return setOpenDialog(true);
  };

  const handleTimeUp = () => {
    if (isPractice) return;
    handleSetTasksAnswers();
    setDialogState(ASSESSMENT_DIALOG_STATES.TIME_UP);
    setOpenDialog(true);
  };

  const renderCloseIcon = () => {
    return (
      <Grid {...styles.closeIconGridProps}>
        <IconButton onClick={handleExit}>
          <CloseRounded />
        </IconButton>
      </Grid>
    );
  };

  if (remove) return null;

  return (
    <Grid {...styles.mainGridProps(isPractice)}>
      {renderCloseIcon()}
      <ProgressBar
        current={isPractice ? questionsCorrect : order}
        total={total}
        progress={progress}
        isPractice={isPractice}
      />
      <AssessmentTimer
        startTime={startTime}
        endTime={endTime}
        startTimer={startTimer}
        isPractice={isPractice}
        handleTimeUp={handleTimeUp}
      />
      <TrackerDialog
        open={openDialog}
        resetQuiz={resetQuiz}
        toggleOpen={toggleOpenDialog}
        dialogState={dialogState}
        scoreDetails={scoreDetails}
        setIsComplete={setIsComplete}
        isPractice={isPractice}
        setSelectedValue={setSelectedValue}
        setSelected={setSelected}
      />
    </Grid>
  );
};

export default TrackerDisplay;
