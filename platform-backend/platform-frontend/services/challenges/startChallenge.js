import { httpsCallable } from 'firebase/functions';

import CHALLENGES from '@/constants/challenges';

import { functions } from '@/redux/store';

import { amplitudeTracker } from '@/utils/IntegrationUtils';

/**
 * Starts a challenge enrollment process for a user.
 *
 * @param {Object} props - The properties for starting the challenge.
 * @param {string} props.userId - The ID of the user.
 * @param {string} props.challengeId - The ID of the challenge.
 * @param {string} props.name - The name of the challenge.
 * @param {boolean} props.isPreEnroll - Indicates if the user is pre-enrolled in the challenge.
 * @param {boolean} props.isMission - Indicates if the challenge is a mission.
 * @return {Promise<void>} - A promise that resolves when the challenge is started.
 */
const startChallenge = async (props) => {
  const { userId, challengeDoc, isPreEnroll } = props;
  try {
    const enrollUserInChallenge = httpsCallable(
      functions,
      'enrollUserInChallenge'
    );

    const { id, name, difficulty, length, category, type } = challengeDoc;
    const isMission = type === CHALLENGES.MISSION;

    await enrollUserInChallenge({ userId, challengeId: id });

    // Amplitude tracking
    amplitudeTracker('enrolled_in_challenge', {
      userId,
      challengeId: id,
      preEnrolled: isPreEnroll,
      enrolledInMission: isMission,
      enrolledInQuest: !isMission,
      name,
      difficulty,
      duration: length,
      category: category?.replace(/[^a-zA-Z]/g, ''),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default startChallenge;
