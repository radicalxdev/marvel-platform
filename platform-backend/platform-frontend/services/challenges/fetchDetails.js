import { doc, getDoc } from 'firebase/firestore';

/**
 * Async function to fetch the details doc from the internal subcollection of a particular challenge from Firestore
 *
 * @param {Object} firestore - Firestore instance
 * @param {string} challengeId - ID of the challenge to fetch internal subcollection for
 * @returns {Array} - Array of mission objects in the internal subcollection
 */
const fetchDetails = async (firestore, challengeId) => {
  // Get reference to the challenge document
  try {
    const challengeRef = doc(
      firestore,
      'challenges',
      challengeId,
      'internal',
      'details'
    );

    // Get documents in the internal subcollection
    const querySnapshot = await getDoc(challengeRef);

    if (!querySnapshot.exists()) return null;

    // return array of the details prop in the internal subcollection
    return querySnapshot.data()?.details;
  } catch (error) {
    throw new Error('Error fetching details in internal subcollection');
  }
};

export default fetchDetails;
