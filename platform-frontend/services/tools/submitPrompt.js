import { httpsCallable } from 'firebase/functions';

import { setError } from '@/redux/slices/chatSlice';
import { functions } from '@/redux/store';

const submitPrompt = async (payload, dispatch) => {
  try {
    const toolCommunicator = httpsCallable(functions, 'toolCommunicatorV1');
    const response = await toolCommunicator(payload);

    return response.data;
  } catch (err) {
    dispatch(setError('Error! Couldn\u0027t send prompt'));
    throw new Error('Error could not send prompt');
  }
};

export default submitPrompt;
