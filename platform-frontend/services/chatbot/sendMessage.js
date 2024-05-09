import { httpsCallable } from 'firebase/functions';

import { BOT_TYPE } from '@/constants/bots';

import { setError, setStreaming, setTyping } from '@/redux/slices/chatSlice';
import { functions } from '@/redux/store';

const sendMessage = async (payload, dispatch) => {
  try {
    const selectCommunicator = () => {
      if (payload.botType === BOT_TYPE.EXPLAIN_MY_ANSWER) return 'communicator';
      return 'communicatorV2';
    };

    const sendCommunication = httpsCallable(functions, selectCommunicator());
    const response = await sendCommunication(payload);

    return response.data;
  } catch (err) {
    dispatch(setError('Error! Couldn\u0027t send message'));
    dispatch(setStreaming(false));
    dispatch(setTyping(false));
    setTimeout(() => {
      dispatch(setError(null));
    }, 3000);
    throw new Error('Error could not send message');
  }
};

export default sendMessage;
