import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Timestamp } from 'firebase/firestore';

import { firestore } from '@/redux/store';

import TimerUnit from '@/components/TimerUnit';
import GradientOutlinedButton from '../GradientOutlinedButton';

import useTimer from '@/hooks/useTimer';

import fetchLastEnrolledPlayersAvatars from '@/redux/thunks/fetchLastEnrolledPlayersAvatars';
import { updateLastEnrolledPlayersAvatars } from '@/redux/slices/challengesSlice';
import { reset as resetEnrolledChallenges } from '@/redux/slices/enrolledChallengesSlice';
import fetchEnrolledChallenges from '@/redux/thunks/enrolledChallenges';
import fetchUserData from '@/redux/thunks/user';

import startChallenge from '@/services/challenges/startChallenge';
import updateEnrolPlayerDoc from '@/services/chatbot/updateEnrolPlayerDoc';
import { AuthContext } from '@/providers/GlobalProvider';

import ArrowRight from '@/assets/svg/arrowRight.svg';

import ROUTES from '@/constants/routes';
import CHALLENGES from '@/constants/challenges';
import ALERT_COLORS from '@/constants/notification';

import styles from './styles';

/**
 * Generates a countdown timer component for a challenge.
 *
 * @param {Object} props - The props for the countdown timer component.
 * @param {Object} props.challengeDoc - The challenge document.
 * @param {boolean} props.complete - Indicates if the challenge is complete.
 * @param {boolean} props.isActive - Indicates if the challenge is active.
 * @param {Object} props.chipContainerProps - The props for the chip container.
 * @param {Object} props.timerUnitContainerProps - The props for the timer unit container.
 * @param {Object} props.timerContainerProps - The props for the timer container.
 * @param {boolean} props.isPaymentPage - Indicates if the timer is on the payment page.
 * @param {boolean} props.isHackathonPage - Indicates if the timer is on the hackathon page.
 * @param {string} props.color - The color of the timer.
 * @param {Object} props.enrolledDoc - The enrolled document.
 * @return {JSX.Element} The countdown timer component.
 */
const CountDownTimer = ({
  challengeDoc,
  complete,
  isActive,
  chipContainerProps,
  timerUnitContainerProps,
  timerContainerProps,
  isPaymentPage,
  isHackathonPage,
  color,
  enrolledDoc,
}) => {
  const {
    id,
    type,
    endTime,
    startTime,
    maskedId,
    isFullCapacity,
    isAlreadyEnrolledInChallengeGroup,
    toggleOpen,
    similarQuestMaskedId,
  } = challengeDoc;
  const dispatch = useDispatch();
  const router = useRouter();

  const isPreEnroll = Date.now() < challengeDoc?.startTime;
  const isMission = type === CHALLENGES.MISSION;
  const isHackathon = type === CHALLENGES.HACKATHON;

  const authState = useSelector((state) => state.auth);
  const [enrolling, setEnrolling] = useState(false);

  const { handleOpenSnackBar } = useContext(AuthContext);

  const counterEndTime = isPreEnroll ? startTime : endTime;

  const { days, hours, minutes } = useTimer(
    counterEndTime,
    true,
    () => {},
    startTime
  );

  const setChallengeType = () => {
    if (type === CHALLENGES.QUEST) return 'Quest';
    if (type === CHALLENGES.HACKATHON) return 'Hackathon';
    return 'Mission';
  };

  const enrolled = !!enrolledDoc;

  const setButtonText = () => {
    if (isFullCapacity) return `${setChallengeType()} Full`;
    if (isPreEnroll && enrolled) return 'Registered';
    if (isPreEnroll) return 'Pre-Register';
    if (!complete)
      return (
        <>
          {isActive
            ? `Continue ${setChallengeType()}`
            : `${
                type === CHALLENGES.HACKATHON ? 'Start' : 'View'
              } ${setChallengeType()}`}
          <ArrowRight />
        </>
      );
    return 'View Final Leaderboard 🏆';
  };

  const setTopText = () => {
    if (isPreEnroll) return 'Starts in';
    if (complete) return `${setChallengeType()} Complete`;
    return 'Ends In';
  };

  const handleFetchEnrolledChallenges = async () => {
    dispatch(resetEnrolledChallenges());
    dispatch(fetchEnrolledChallenges({ firestore, id: authState.data.uid }));

    const { payload } = await dispatch(
      fetchLastEnrolledPlayersAvatars({ firestore, challenges: [challengeDoc] })
    );
    dispatch(
      updateLastEnrolledPlayersAvatars({
        id,
        avatarIds: payload[id],
        challengeType: type,
      })
    );
  };

  const handleSetLastActivity = async () => {
    try {
      await updateEnrolPlayerDoc(firestore, authState.data.uid, id, {
        lastActivity: Timestamp.fromMillis(Date.now()),
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleStartChallenge = async () => {
    try {
      if (!isPreEnroll) handleSetLastActivity();

      setEnrolling(true);
      await startChallenge({
        userId: authState.data.uid,
        challengeDoc,
        isPreEnroll,
      });

      handleOpenSnackBar(
        ALERT_COLORS.SUCCESS,
        `Successfully enrolled in ${setChallengeType()}`
      );
      handleFetchEnrolledChallenges();
      setEnrolling(false);

      await dispatch(fetchUserData({ firestore, id: authState.data.uid }));

      // Redirect to mission individual page
      if (!isPreEnroll && isMission) router.push(`/${maskedId}`);
      if (!isPreEnroll && isHackathon)
        router.push(`${ROUTES.HACKATHONS}/${maskedId}`);
    } catch (error) {
      setEnrolling(false);
      handleOpenSnackBar(ALERT_COLORS.ERROR, error.message);
    }
  };

  const handleRoute = () => {
    if (isPaymentPage) return router.push(`${ROUTES.LEADERBOARDS}/${maskedId}`);

    if (isFullCapacity) return null;

    // Pre-Enroll logic
    if (isPreEnroll && !enrolled) {
      if (isAlreadyEnrolledInChallengeGroup)
        return toggleOpen(similarQuestMaskedId);
      return handleStartChallenge();
    }
    if (isPreEnroll && !!enrolled) return null;

    // Leaderboard logic
    if (complete) return router.push(`${ROUTES.LEADERBOARDS}/${maskedId}`);

    // Quest logic
    if (type === CHALLENGES.QUEST) {
      // Set last activity timestamp

      if (isActive) {
        handleSetLastActivity();
        return router.push(`/${maskedId}/dashboard`);
      }
      return router.push(`/${maskedId}`);
    }

    // Mission logic
    if (type === CHALLENGES.MISSION) {
      // If user is not enrolled in the mission
      if (isActive) {
        handleSetLastActivity();
        return router.push(`/${maskedId}/dashboard`);
      }
      return router.push(`/${maskedId}`);
    }

    // Hackathon logic
    if (type === CHALLENGES.HACKATHON) {
      // If user is not enrolled in the mission
      if (!enrolled) return handleStartChallenge();

      handleSetLastActivity();
      return router.push(`${ROUTES.HACKATHONS}/${maskedId}`);
    }

    return null;
  };

  const renderLoader = () => <CircularProgress color="secondary" size={25} />;

  const renderTopText = () => {
    return (
      <Grid {...styles.titleGridConfig}>
        <Typography {...styles.timerTitleConfig}>{setTopText()}</Typography>
      </Grid>
    );
  };

  const renderTimer = () => {
    return (
      !complete && (
        <Grid {...styles.timerGridConfig(timerContainerProps)}>
          <TimerUnit
            text="Days"
            units={days}
            chipContainerProps={chipContainerProps}
            timerUnitContainerProps={timerUnitContainerProps}
            color={color}
          />
          <TimerUnit
            text="Hours"
            units={hours}
            chipContainerProps={chipContainerProps}
            timerUnitContainerProps={timerUnitContainerProps}
            color={color}
          />
          <TimerUnit
            text="Minutes"
            units={minutes}
            chipContainerProps={chipContainerProps}
            timerUnitContainerProps={timerUnitContainerProps}
            color={color}
          />
        </Grid>
      )
    );
  };

  const renderButton = () => {
    if (isPaymentPage)
      return (
        <GradientOutlinedButton
          text={<span>View Current Leaderboard 🏆</span>}
          clickHandler={handleRoute}
          {...styles.viewLeaderboardButtonProps}
        />
      );

    return (
      <Grid width="100%">
        <Button
          {...styles.missionButtonConfig(enrolling)}
          active={(isActive && !isFullCapacity).toString()}
          complete={false.toString()}
          pre_enroll={(isPreEnroll && !isFullCapacity)?.toString()}
          registered={(enrolled && !isFullCapacity).toString()}
          is_full={isFullCapacity?.toString()}
          disabled={enrolling}
          onClick={handleRoute}
        >
          {enrolling ? renderLoader() : setButtonText()}
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridConfig(complete, isPaymentPage, isHackathonPage)}>
      {renderTopText()}
      {renderTimer()}
      {!isHackathonPage && renderButton()}
    </Grid>
  );
};

export default CountDownTimer;
