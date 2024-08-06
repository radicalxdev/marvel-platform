import { httpsCallable } from 'firebase/functions';

import { functions } from '@/redux/store';

const generatePrompts = async (payload) => {
  try {
    const genPrompts = httpsCallable(functions, 'generatePrompts');
    const response = await genPrompts(payload);

    return response.data;
  } catch (error) {
    throw new Error('Error could not generate prompts');
  }
};

export default generatePrompts;
