import { doc, getDoc } from 'firebase/firestore';

const fetchTasksAnswers = async (firestore, docId) => {
  // Get reference to the challenge document

  try {
    const enrolledPlayersRef = doc(
      firestore,
      'enrolledPlayers',
      docId,
      'internal',
      'tasksAnswers'
    );
    const getUserEnrolledDoc = await getDoc(enrolledPlayersRef);

    if (!getUserEnrolledDoc.exists()) return null;

    // return array of internal in the internal subcollection
    return getUserEnrolledDoc.data();
  } catch (error) {
    throw new Error('Error fetching internal');
  }
};

export default fetchTasksAnswers;
