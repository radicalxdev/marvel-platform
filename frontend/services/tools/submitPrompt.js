import axios from 'axios';

import createToolsHistory from '../toolsHistory/createToolsHistory';
import updateToolsHistory from '../toolsHistory/updateToolsHistory';

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

    if (inSession && sessionId) {
      // Update the existing tools history document
      const updateToolsPayload = {
        sessionId,
        toolId: payload.tool_data.tool_id,
        userId: payload.user.id,
        newInputs: payload.tool_data.inputs,
        newOutputs: response.data?.data,
      };

      await updateToolsHistory(updateToolsPayload, dispatch);
    } else {
      // Create a new tools history document
      const createToolsPayload = {
        userId: payload.user.id,
        toolId: payload.tool_data.tool_id,
        inputs: payload.tool_data.inputs,
        outputs: response.data?.data,
      };

      const sessionRef = await createToolsHistory(createToolsPayload, dispatch);
      dispatch(
        setToolsSessionState({
          sessionId: sessionRef.sessionId,
          inSession: true,
        })
      );
    }
    return response.data?.data;
  } catch (err) {
    const { response } = err;
    throw new Error(response?.data?.message || 'Error could not send prompt');
  }
};

export default submitPrompt;
