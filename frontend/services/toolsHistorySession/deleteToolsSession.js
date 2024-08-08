import { httpsCallable } from 'firebase/functions';

import { setError, setStreaming, setTyping } from '@/redux/slices/chatSlice';
import { functions } from '@/redux/store';

/**
 * Deletes a tool session.
 *
 * @param {Object} payload - The payload for creating the chat session.
 * @param {function} dispatch - The dispatch function for managing state.
 * @return {Object} - An object containing a status and data containing the session.
 */
const deleteToolsSession = async (payload, dispatch) => {
  try {
    const deleteToolsHistorySession = httpsCallable(
      functions,
      'deleteToolsSession'
    );
    const response = await deleteToolsHistorySession(payload);
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

export default deleteToolsSession;
