import axios from 'axios';

import { setToolsSessionState } from '@/redux/slices/toolsSlice';

const submitPrompt = async (payload, files, dispatch) => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));

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

    // Extract sessionId and AI output from the response
    const { sessionId } = response.data;

    // Updating the tools session state within the toolsSlice to begin a new session
    dispatch(
      setToolsSessionState({
        sessionId,
      })
    );
    return response.data?.data;
  } catch (err) {
    const { response } = err;
    throw new Error(
      response?.data?.message || `Error: could not send prompt, ${err}`
    );
  }
};

export default submitPrompt;
