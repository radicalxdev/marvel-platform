import { doc, getDoc } from 'firebase/firestore';

/**
 * Async function to fetch the internal subcollection of a particular challenge from Firestore
 *
 * @param {Object} firestore - Firestore instance
 * @param {string} challengeId - ID of the challenge to fetch internal subcollection for
 * @returns {Array} - Array of mission objects in the internal subcollection
 */
const fetchQuestions = async (firestore, challengeId) => {
  // Get reference to the challenge document
  try {
    const challengeRef = doc(
      firestore,
      'challenges',
      challengeId,
      'internal',
      'tasksQuestions'
    );

    // Get documents in the internal subcollection
    const querySnapshot = await getDoc(challengeRef);

    if (!querySnapshot.exists()) return null;

    // return array of internal in the internal subcollection
    return querySnapshot.data();
  } catch (error) {
    throw new Error('Error fetching internal');
  }
};

export default fetchQuestions;
