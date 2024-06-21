// services/createToolSession.js

import { httpsCallable } from 'firebase/functions';

import {
  setCommunicatorLoading,
  setError,
  setResponse,
} from '@/redux/slices/toolsSlice';
import { functions } from '@/redux/store';

/**
 * Creates a tool session.
 *
 * @param {Object} payload - The payload for creating the tool session.
 * @param {function} dispatch - The dispatch function for managing state.
 * @return {Promise<Object>} - A promise that resolves to an object containing the session data.
 * @throws {Error} - Throws an error if the tool session creation fails.
 */
const createToolSession = async (payload, dispatch) => {
  try {
    // Indicate loading state
    dispatch(setCommunicatorLoading(true));

    // Call the Firebase function to create a tool session
    const createSession = httpsCallable(functions, 'createToolSession');
    const response = await createSession(payload);

    // Update the state with the response
    dispatch(setResponse(response.data));

    return response.data;
  } catch (err) {
    // Handle errors and update the state using dispatch
    dispatch(setError('Error! Couldn\u0027t start the tool session'));
    setTimeout(() => {
      dispatch(setError(null));
    }, 3000);
    throw new Error('Error could not start tool session');
  } finally {
    // Ensure that the loading state is reset
    dispatch(setCommunicatorLoading(false));
  }
};

export default createToolSession;
