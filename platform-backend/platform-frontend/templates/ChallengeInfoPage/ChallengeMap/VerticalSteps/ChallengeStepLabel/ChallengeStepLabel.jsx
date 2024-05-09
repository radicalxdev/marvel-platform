import { useContext, useState } from 'react';

import {
  Button,
  Grid,
  stepConnectorClasses,
  stepIconClasses,
  StepLabel,
  stepLabelClasses,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import CHALLENGES from '@/constants/challenges';
import ALERT_COLORS from '@/constants/notification';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';

const CustomStepLabel = styled((props) => (
  <StepLabel
    StepIconProps={{
      sx: {
        width: { laptop: 42, desktop: 46, desktopMedium: 50 },
        height: { laptop: 42, desktop: 46, desktopMedium: 50 },
      },
    }}
    sx={{ py: 2 }}
    {...props}
  />
))(({ theme }) => ({
  [`& .${stepLabelClasses.labelContainer}`]: {
    marginLeft: '56px',
    [theme.breakpoints.down('desktopMedium')]: {
      marginLeft: '52px',
    },
    [theme.breakpoints.down('desktop')]: {
      marginLeft: '32px',
    },
  },
  [`& .${stepLabelClasses.active}`]: {
    color: 'white !important',
  },
  [`& .${stepIconClasses.completed}`]: {
    color: `${theme.palette.Background.green} !important`,
  },
  [`& .${stepIconClasses.active}`]: {
    color: `${theme.palette.Background.green} !important`,
  },
  [`& .${stepConnectorClasses.completed}`]: {
    color: `${theme.palette.Background.green} !important`,
  },
}));

/**
 * Function to render a custom step label for a challenge.
 *
 * @param {Object} props - object containing label and type
 * @param {Object} props.label - challenge label
 * @param {Object} props.type - challenge type
 *
 * @return {JSX.Element} custom step label component
 */
const ChallengeStepLabel = (props) => {
  const {
    active,
    step,
    start,
    complete,
    startMissionTask,
    details,
    type,
    isLastStep,
    challengeActive,
  } = props;

  const theme = useTheme();
  const router = useRouter();
  const {
    query: { missionId },
  } = router;

  const { handleOpenSnackbar } = useContext(AuthContext);

  const { title } = details;

  const startFirstLevel = step === 1 && !active && !complete && challengeActive;
  const isStart = start || startFirstLevel;
  const isMission = type === CHALLENGES.MISSION;
  const isMissionLastTask = isMission && isLastStep;

  const [loading, setLoading] = useState(false);

  const setChallengeTypeText = () => {
    if (isMissionLastTask) return 'Submission';
    if (isMission) return 'Task';
    return 'Level';
  };

  const setChallengeButtonText = () => {
    if (isStart) return 'Start';
    if (isMission && complete) return 'Review';
    if (!isMission && complete) return 'Redo';
    return 'Continue';
  };

  const handleStartTask = async () => {
    if (active || complete) {
      router.push(`/${missionId}/${step}`);
      return;
    }

    try {
      setLoading(true);
      await startMissionTask(step);
      router.push(`/${missionId}/${step}`);
    } catch (error) {
      handleOpenSnackbar(ALERT_COLORS.ERROR, 'Error starting task');
    } finally {
      setLoading(false);
    }
  };

  const handleRouteToReview = () => router.push(`/${missionId}/${step}`);

  const renderTypeText = () => {
    return (
      <Typography {...styles.typeTextProps(isMissionLastTask)}>
        {setChallengeTypeText()}
      </Typography>
    );
  };

  const renderLabel = () => {
    return <Typography {...styles.challengeTitleProps}>{title}</Typography>;
  };

  const renderChallengeButton = () => {
    return (
      <Grid item>
        {!complete && (
          <GradientOutlinedButton
            bgcolor={theme.palette.Dark_Colors.Dark[1]}
            text={setChallengeButtonText()}
            loading={loading}
            clickHandler={handleStartTask}
            inverted
            {...styles.challengeItemButtonProps}
          />
        )}
        {complete && (
          <Button onClick={handleRouteToReview} {...styles.reviewButtonProps}>
            Review
          </Button>
        )}
      </Grid>
    );
  };

  return (
    <CustomStepLabel>
      <Grid {...styles.containerGridProps}>
        <Grid item>
          {renderTypeText()}
          {renderLabel()}
        </Grid>
        {(complete || isStart || active) && renderChallengeButton()}
      </Grid>
    </CustomStepLabel>
  );
};

export { CustomStepLabel };
export default ChallengeStepLabel;
