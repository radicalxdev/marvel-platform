import axios from 'axios';
import createToolsHistory from '../toolsHistory/createToolsHistory';

const submitPrompt = async (payload, files, dispatch) => {
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

    const createToolsPayload = {
      userId: payload.user.id,
      toolId: payload.tool_data.tool_id,
      response: {
        inputs: payload.tool_data.inputs,
        outputs: response.data,
      },
    };

    await createToolsHistory(createToolsPayload, dispatch);
    return response.data?.data;
  } catch (err) {
    const { response } = err;
    throw new Error(response?.data?.message || 'Error could not send prompt');
  }
};

export default submitPrompt;