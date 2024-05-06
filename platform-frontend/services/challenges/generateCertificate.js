import { httpsCallable } from 'firebase/functions';
import { functions } from '@/redux/store';

import { amplitudeTracker } from '@/utils/IntegrationUtils';

/**
 * Generates a certificate for a user who has completed a challenge.
 *
 * @param {Object} props - The properties for generating the certificate.
 * @param {string} props.userId - The ID of the user.
 * @param {Object} props.challengeDoc - The challenge document.
 * @param {string} props.fullName - The full name of the user.
 * @throws {Error} If any of the required parameters are missing.
 * @throws {Error} If there is an error starting the challenge.
 */
const generateCertificate = async (props) => {
  try {
    const { userId, challengeDoc, fullName } = props;

    if (!userId || !challengeDoc || !fullName) {
      throw new Error('Missing required parameters');
    }

    const { id, name, difficulty, length, category } = challengeDoc;

    const createCertificate = httpsCallable(functions, 'generateCertificate');

    await createCertificate({ userId, challengeId: id, fullName });

    // Amplitude tracking
    amplitudeTracker('Quest_Completed', {
      name,
      challengeId: id,
      difficulty,
      duration: length,
      category: category?.replace(/[^a-zA-Z]/g, ''),
      userId,
    });
  } catch (error) {
    throw new Error('Failed to generate certificate');
  }
};

export default generateCertificate;
