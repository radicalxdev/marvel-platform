import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Timestamp } from 'firebase/firestore';

import { firestore } from '@/redux/store';
import fetchEnrolledChallenges from '@/redux/thunks/enrolledChallenges';
import { updateEnrolledChallenge } from '@/redux/slices/enrolledChallengesSlice';
import fetchChallenges from '@/redux/thunks/challenges';

import { getMapProps } from '@/utils/ChallengeUtils';

import { AuthContext } from '@/providers/GlobalProvider';
import updateEnrolPlayerDoc from '@/services/chatbot/updateEnrolPlayerDoc';

import STATUS from '@/constants/mission';
import ALERT_COLORS from '@/constants/notification';
import CHALLENGES from '@/constants/challenges';

/**
 * Generates a hook to handle Quest mapping.
 *
 * @return {Object} An object containing the following properties:
 *   - enrolledQuest: The enrolled quest object.
 *   - questDoc: The quest document object.
 *   - questId: The ID of the quest.
 *   - isLoading: A boolean indicating if the data is currently loading.
 *   - isPreEnroll: A boolean indicating if the quest is in the pre-enroll phase.
 *   - isCompleted: A boolean indicating if the quest is completed.
 *   - practiceIsComplete: A boolean indicating if the practice is completed.
 *   - practiceStatus: The status of the practice.
 *   - currentLevel: The current level of the quest.
 *   - practiceTitles: An array of practice titles.
 *   - assessmentStarted: A boolean indicating if the assessment has started.
 *   - resetQuizLevel: A function to reset the quiz level.
 *   - isError: A boolean indicating if an error occurred.
 *   - auth: The authentication data.
 *   - user: The user data.
 */
const useQuestMap = (challengeType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    query: { questId, missionId, hackathonId, level },
  } = router;

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const challenges = useSelector((state) => state.challenges[challengeType]);
  const { data, loading, error } = useSelector(
    (state) => state.enrolledChallenges
  );

  const { handleOpenSnackBar } = useContext(AuthContext);

  useEffect(() => {
    if (!challenges.data)
      dispatch(fetchChallenges({ firestore, challengeType }));
    dispatch(fetchEnrolledChallenges({ firestore, id: auth.data.uid }));
  }, []);

  const challengeDoc = challenges.data?.find((challenge) => {
    const selectCurrentMaskedId = () => {
      if (challengeType === CHALLENGES.QUEST) return questId;
      if (challengeType === CHALLENGES.MISSION) return missionId;
      return hackathonId;
    };

    return challenge.maskedId === selectCurrentMaskedId();
  });

  const enrolledQuest = data?.find((ec) => ec.challengeId === challengeDoc?.id);

  const isLoading = [challenges.loading, user.loading, loading].includes(true);

  const isError = challenges.error || error;

  const {
    practiceIsComplete,
    practiceStatus,
    isCompleted,
    currentLevel,
    nextLevel,
    assessmentStarted,
    practiceTitles,
    totalLevels,
  } = getMapProps(enrolledQuest);

  const isPreEnroll = Date.now() < challengeDoc?.startTime;
  const timeUp = Date.now() > challengeDoc?.endTime;
  const levelComplete = [STATUS.COMPLETED, STATUS.INCOMPLETE].includes(
    practiceStatus[level]
  );

  const resetQuizLevel = async (quizLevel) => {
    try {
      const updatePractice = enrolledQuest?.practice?.map((question) => {
        if (parseInt(question.level, 10) === quizLevel) {
          return {
            ...question,
            status: STATUS.INCOMPLETE,
            correct: null,
            endTime: null,
            startTime: null,
          };
        }
        return question;
      });

      await updateEnrolPlayerDoc(
        firestore,
        enrolledQuest?.userId,
        enrolledQuest?.challengeId,
        { practice: updatePractice }
      );

      dispatch(
        updateEnrolledChallenge({
          challengeId: enrolledQuest?.challengeId,
          updatedData: {
            ...enrolledQuest,
            practice: updatePractice,
          },
        })
      );
    } catch (err) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, 'Error resetting quiz');
    }
  };

  const startMissionTask = async (taskLevel) => {
    try {
      const updatePractice = enrolledQuest?.practice?.map((task) => {
        if (parseInt(task.level, 10) === parseInt(taskLevel, 10)) {
          return {
            ...task,
            status: STATUS.IN_PROGRESS,
            startTime: Timestamp.fromMillis(Date.now()),
          };
        }
        return task;
      });

      await updateEnrolPlayerDoc(
        firestore,
        enrolledQuest?.userId,
        enrolledQuest?.challengeId,
        { practice: updatePractice }
      );

      dispatch(
        updateEnrolledChallenge({
          challengeId: enrolledQuest?.challengeId,
          updatedData: {
            ...enrolledQuest,
            practice: updatePractice,
          },
        })
      );
    } catch (err) {
      handleOpenSnackBar(ALERT_COLORS.ERROR, 'Error resetting quiz');
    }
  };

  return {
    enrolledQuest,
    challengeDoc,
    challengeId: challengeDoc?.id,
    isLoading,
    timeUp,
    isPreEnroll,
    isCompleted,
    practiceIsComplete,
    practiceStatus,
    currentLevel,
    nextLevel,
    practiceTitles,
    assessmentStarted,
    resetQuizLevel,
    levelComplete,
    startMissionTask,
    totalLevels,
    isError,
    auth,
    user: user.data,
  };
};

export default useQuestMap;
