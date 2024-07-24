import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '@/redux/store';
import fetchOnboardingData from '@/redux/thunks/onboarding'; // Adjust the import based on your actual thunk

/**
 * Returns properties used in the OnboardingPage component.
 *
 * @param {string} onboardingId - The ID of the onboarding item.
 * @return {object} - An object containing the onboarding data and loading state.
 */
const useOnboardingProps = (onboardingId) => {
  const dispatch = useDispatch();
  const { data: onboardingData, loading } = useSelector(
    (state) => state.onboarding
  ); // Adjust the selector based on your state structure

  const [currentOnboarding, setCurrentOnboarding] = useState(null);

  useEffect(() => {
    const fetchOnboarding = async () => {
      if (onboardingId) {
        await dispatch(fetchOnboardingData({ firestore, onboardingId }));
      }
    };

    if (
      onboardingId &&
      (!onboardingData ||
        !onboardingData.some((data) => data.id === onboardingId))
    ) {
      fetchOnboarding();
    } else {
      setCurrentOnboarding(
        onboardingData?.find((data) => data.id === onboardingId)
      );
    }
  }, [dispatch, onboardingId, onboardingData]);

  useEffect(() => {
    setCurrentOnboarding(
      onboardingData?.find((data) => data.id === onboardingId)
    );
  }, [onboardingData, onboardingId]);

  return {
    loading,
    onboardingData: currentOnboarding,
  };
};

export default useOnboardingProps;
