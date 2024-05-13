import { httpsCallable } from 'firebase/functions';

import { functions } from '@/redux/store';

const submitPrompt = async (payload) => {
  try {
    const toolCommunicator = httpsCallable(functions, 'toolCommunicatorV1');
    const response = await toolCommunicator(payload);

    return response.data;
  } catch (err) {
    throw new Error('Error could not send prompt');
  }
};

export default submitPrompt;
