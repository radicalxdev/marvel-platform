import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

/**
 * Fetch onboarding data from Firestore.
 *
 * @param {object} params - The parameters to fetch data.
 * @param {object} params.firestore - Firestore instance or configuration.
 * @param {string} params.onboardingId - The ID of the onboarding item.
 * @return {Promise<object>} - A promise that resolves to the fetched onboarding data.
 */
const fetchOnboardingData = createAsyncThunk(
  'onboarding/fetch',
  async ({ firestore, onboardingId }) => {
    try {
      // Query to fetch onboarding data
      const onboardingQuery = query(
        collection(firestore, 'onboarding'),
        where('id', '==', onboardingId)
      );

      const onboardingDocsSnapshot = await getDocs(onboardingQuery);

      if (onboardingDocsSnapshot.empty) return null;

      const onboarding = onboardingDocsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return onboarding.length ? onboarding[0] : null; // Assuming onboardingId is unique and returns a single document
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export default fetchOnboardingData;
