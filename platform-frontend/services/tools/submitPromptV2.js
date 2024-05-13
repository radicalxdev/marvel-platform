import axios from 'axios';

const submitPromptV2 = async (payload, files) => {
  try {
    const formData = new FormData();

    // Append payload to the form data
    formData.append('data', JSON.stringify(payload));

    // Append files to the form data
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await axios.post('endpoint', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer token
        `,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error('Error could not send prompt');
  }
};

export default submitPromptV2;
