import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

// Thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'userData/fetch',
  async ({ firestore, id }) => {
    try {
      const userQuery = query(
        collection(firestore, 'users'),
        where('id', '==', id)
      );

      const userDocSnapshot = await getDocs(userQuery);

      if (userDocSnapshot.empty) return null;

      const user = userDocSnapshot.docs[0].data();

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
);

// Thunk for submitting onboarding data
export const submitOnboardingData = createAsyncThunk(
  'onboarding/submitOnboardingData',
  async ({ firestore, data }, { getState, rejectWithValue }) => {
    console.log('submitOnboardingData thunk called'); // Log at the very start

    try {
      const { user } = getState();
      const userId = user?.data?.id;

      if (!userId) {
        console.error('User ID is not available');
        return rejectWithValue('User ID is not available');
      }

      console.log('Submitting onboarding data for user ID:', userId);

      // Log before creating document reference
      console.log('Firestore instance:', firestore);
      console.log('User ID:', userId);

      // Step 1: Create document reference
      const userDocRef = doc(firestore, 'users', userId);
      console.log('Document reference created:', userDocRef);

      // Log the data being set
      console.log('Data to be set:', data);

      // Step 2: Set the document data
      await setDoc(userDocRef, data, { merge: true });
      console.log(
        'Data submitted successfully to Firestore for user ID:',
        userId
      );

      return data;
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      return rejectWithValue(error.message);
    }
  }
);

export default fetchUserData;
