import axios from 'axios';

import createToolSession from './createToolSession';

import { setToolSessionData } from '@/redux/slices/toolsHistorySlice';
import fetchToolsHistory from '@/redux/thunks/toolsHistory';

const submitPrompt = async (payload, files, dispatch) => {
  try {
    const formData = new FormData();

    formData.append('data', JSON.stringify(payload));

    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    }

    const url = process.env.NEXT_PUBLIC_KAI_ENDPOINT;

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response:', response.data);

    const toolSessionPayload = {
      user: payload.user,
      tool_data: { ...payload.tool_data },
      type: payload.type,
      messages: response.data,
      sessionId: payload.sessionId,
    };

    // Corrected to await createToolSession and handle the result properly
    const createdToolSession = await createToolSession(
      toolSessionPayload,
      dispatch
    );

    dispatch(setToolSessionData(createdToolSession));

    // Corrected usage of fetchToolsHistory to pass userId correctly
    const historyData = await dispatch(
      fetchToolsHistory({ userId: payload.user.id })
    );

    console.log('Updated history data:', historyData);

    return response.data?.data; // Assuming response.data contains relevant data to return
  } catch (err) {
    const { response } = err;

    throw new Error(
      response?.data?.message || `Error: could not send prompt, ${err}`
    );
  }
};

export default submitPrompt;
