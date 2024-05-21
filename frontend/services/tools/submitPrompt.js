import axios from 'axios';

const submitPrompt = async (payload, files) => {
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

    const response = await axios.post('/api/tool', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data?.data;
  } catch (err) {
    throw new Error('Error could not send prompt');
  }
};

export default submitPrompt;
