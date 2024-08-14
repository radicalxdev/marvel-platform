import axios from 'axios';

import determineToolsSessionState from '../toolsHistorySession/determineToolsSessionState';

import { setToolsSessionState } from '@/redux/slices/toolsSlice';

const submitPrompt = async (payload, files, dispatch, sessionId, inSession) => {
  try {
    const formData = new FormData();

    // Append payload to the form data
    formData.append('data', JSON.stringify(payload));

    // Append files to the form data
    if (!!files && files?.length > 0) {
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    }

    const response = await axios.post('/api/tool/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // construct tool session payload
    const toolsSessionPayload = {
      sessionId: inSession ? sessionId : null,
      toolId: payload.tool_data.tool_id,
      userId: payload.user.id,
      inputs: payload.tool_data.inputs,
      outputs: response.data?.data,
    };

    // call the service function to create or update a tools session
    const sessionRef = await determineToolsSessionState(
      toolsSessionPayload,
      dispatch
    );

    // updating the tools session state within the toolsSlice to begin a new session
    dispatch(
      setToolsSessionState({
        sessionId: sessionRef.sessionId,
        inSession: true,
      })
    );
    return response.data?.data;
  } catch (err) {
    const { response } = err;
    throw new Error(response?.data?.message || 'Error could not send prompt');
  }
};

export default submitPrompt;
