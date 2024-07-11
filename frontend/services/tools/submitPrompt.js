import axios from 'axios';

import createToolSession from './createToolSession';

import { fetchToolsHistory } from '@/redux/thunks/toolsHistory';

const submitPrompt = async (payload, files, dispatch) => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));

    if (!!files && files?.length > 0) {
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

    const toolSessionPayload = {
      user: payload.user,
      tool_data: { ...payload.tool_data },
      type: payload.type,
      outputs: response.data,
      sessionId: payload.sessionId,
    };

    // Create new tool session and dispatch to update state
    const createdToolSession = await createToolSession(
      toolSessionPayload,
      dispatch
    );

    // Fetch updated tools history to ensure Redux state is up to date
    await dispatch(fetchToolsHistory({ userId: payload.user.id }));

    return response.data?.data;
  } catch (err) {
    const { response } = err;
    throw new Error(
      response?.data?.message || `Error: could not send prompt, ${err}`
    );
  }
};

export default submitPrompt;
