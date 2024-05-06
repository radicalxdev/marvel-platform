import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { auth, firestore } from '@/redux/store';

import { AuthContext } from '@/providers/GlobalProvider';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import fetchEnrolledChallenges from '@/redux/thunks/enrolledChallenges';

import ALERT_COLORS from '@/constants/notification';

import CurlsIcon from '@/assets/svg/curls.svg';
import CheckmarkSvg from '@/assets/svg/CheckmarkSvg.svg';

import styles from './styles';

const SubmitSuccess = (props) => {
  const { setIsSuccessScreen, startMissionTask, totalLevels } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const {
    query: { missionId, level },
  } = router;

  const { handleOpenSnackbar } = useContext(AuthContext);

  const [loading, setLoading] = useState();
  const { data: missions } = useSelector((state) => state.challenges.mission);

  const isFinalTask = parseInt(level, 10) === totalLevels;

  const currentChallenge = missions?.find(
    (challenge) => challenge.maskedId === missionId
  );

  const setSecondaryText = () => {
    if (isFinalTask) return 'View Certificate';
    return 'Back to Dashboard';
  };

  const handleGoToSubmission = () => setIsSuccessScreen(false);
  const handleGoToDashboard = () => {
    if (isFinalTask)
      dispatch(
        fetchEnrolledChallenges({ firestore, id: auth.currentUser.uid })
      );
    router.push(`/${missionId}`);
  };

  const handleNextTask = async () => {
    try {
      const nextStep = parseInt(level, 10) + 1;

      setLoading(true);
      await startMissionTask(nextStep.toString(10));
      setIsSuccessScreen(false);
      router.push(`/${missionId}/${nextStep}`);
    } catch (error) {
      handleOpenSnackbar(ALERT_COLORS.ERROR, 'Error starting task');
    } finally {
      setLoading(false);
    }
  };

  const renderBackButton = () => {
    return (
      <Grid {...styles.backToSubmissionGridProps}>
        <Button
          onClick={handleGoToSubmission}
          startIcon={
            <ArrowBack sx={{ color: theme.palette.Common.White['100p'] }} />
          }
          {...styles.backToMissionButtonProps}
        >
          Back To Submission
        </Button>
      </Grid>
    );
  };

  const renderSuccessIcon = () => {
    return (
      <Grid {...styles.curlsGridProps}>
        <CurlsIcon />
      </Grid>
    );
  };

  const renderSuccessTitle = () => {
    return (
      <Grid {...styles.successGridProps}>
        <Grid position="relative" sx={{ transform: 'translate(0, 15%)' }} item>
          <CheckmarkSvg />
        </Grid>
        <Typography {...styles.successTitleProps}>Success! 🎉</Typography>
      </Grid>
    );
  };

  const renderSubtitle = () => {
    return (
      <Grid {...styles.subtitleGridProps}>
        <Typography {...styles.subtitleProps}>
          Great job! 🚀 Your submission for{' '}
          <Typography
            {...styles.taskTitleProps}
          >{`${currentChallenge?.name}: Task ${level}`}</Typography>{' '}
          has been recorded.
        </Typography>
      </Grid>
    );
  };

  const renderActionButtons = () => {
    return (
      <Grid {...styles.actionButtonsGridProps}>
        {!isFinalTask && (
          <Grid item>
            <GradientOutlinedButton
              loading={loading}
              clickHandler={handleNextTask}
              {...styles.nextTaskButtonProps()}
            />
          </Grid>
        )}
        <Grid item>
          <Button
            onClick={handleGoToDashboard}
            {...styles.backToDashboardButtonProps}
          >
            {setSecondaryText()}
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.submitSuccessGridProps}>
      {renderBackButton()}
      <Grid {...styles.successTextGridProps}>
        <Grid {...styles.innerSuccessGridProps}>
          {renderSuccessIcon()}
          {renderSuccessTitle()}
          {renderSubtitle()}
          {renderActionButtons()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubmitSuccess;
