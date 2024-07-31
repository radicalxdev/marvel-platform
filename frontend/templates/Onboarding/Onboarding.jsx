import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Complete from './Complete';
import FinalSteps from './FinalSteps';
import ProfileSetupForm from './ProfileSetupForm';
import SystemConfigs from './SystemConfigs/SystemsConfig';
import Welcome from './Welcome';

import {
  setCompleted,
  setStep,
  setTempData,
} from '@/redux/slices/onboardingSlice';
import { firestore } from '@/redux/store'; // Adjust the import path as needed
import { submitOnboardingData } from '@/redux/thunks/user';

const onboardingComponents = {
  0: Welcome,
  1: ProfileSetupForm,
  2: SystemConfigs,
  3: FinalSteps,
  4: Complete,
};

const OnboardingPage = ({ onboardingData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const step = useSelector((state) => state.onboarding.step);
  const tempData = useSelector((state) => state.onboarding.tempData);

  useEffect(() => {
    if (onboardingData.id !== step) {
      console.log(`Setting step: ${onboardingData.id}`);
      dispatch(setStep(onboardingData.id)); // Ensure the Redux state is in sync with the URL
    }
  }, [dispatch, onboardingData.id, step]);

  const handleNext = (formData = {}) => {
    console.log('Current Form Data:', formData);
    if (onboardingComponents[onboardingData.id] === ProfileSetupForm) {
      console.log('Storing form data in Redux');
      dispatch(setTempData(formData)); // Store form data in Redux
    }

    if (onboardingData.id === Object.keys(onboardingComponents).length - 2) {
      console.log('Submitting onboarding data:', tempData);
      dispatch(submitOnboardingData({ firestore, data: tempData })); // Correctly passing parameters
      dispatch(setCompleted(true));
    }
    console.log(`Moving to step: ${onboardingData.id + 1}`);
    dispatch(setStep(onboardingData.id + 1)); // Update the step in Redux
    router.push(`/onboarding/${onboardingData.id + 1}`);
  };

  const SpecificOnboardingScreen =
    onboardingComponents[onboardingData.id] || Welcome;

  return <SpecificOnboardingScreen onNext={handleNext} tempData={tempData} />;
};

export default OnboardingPage;
