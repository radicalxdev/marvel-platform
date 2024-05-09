import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

/**
 * Updates the enrollment document for a player in the Firestore database.
 *
 * @param {Object} firestore - The Firestore instance.
 * @param {string} userId - The ID of the user.
 * @param {string} challengeId - The ID of the challenge.
 * @param {Object} updateFields - The fields to update in the document.
 * @return {Promise} A promise that resolves when the document is updated.
 * @throws {Error} If the user document is not found or there is an error updating the document.
 */
const updateEnrolPlayerDoc = async (
  firestore,
  userId,
  challengeId,
  updateFields
) => {
  try {
    const docQuery = query(
      collection(firestore, 'enrolledPlayers'),
      where('userId', '==', userId),
      where('challengeId', '==', challengeId)
    );

    const docSnapshot = await getDocs(docQuery);

    if (!docSnapshot.empty) {
      const userRef = docSnapshot.docs[0];

      return await updateDoc(userRef.ref, updateFields);
    }
    throw new Error('User document not found.');
  } catch (error) {
    throw new Error('Error updating user document.');
  }
};

export default updateEnrolPlayerDoc;
