import { httpsCallable } from 'firebase/functions';
import { functions } from '@/redux/store';

const updateTasks = async (challengeId, userId) => {
  try {
    const taskUpdater = httpsCallable(functions, 'tasksUpdater');
    return await taskUpdater({
      challengeId,
      userId,
    });
  } catch (err) {
    throw new Error('Error updating tasks');
  }
};

export default updateTasks;
