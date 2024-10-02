import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import SlideTransition from '@/components/SlideTransition';
import OnboardingLayout from '@/layouts/OnboardingLayout';
import FinalSteps from '@/templates/FinalSteps';
import ProfileSetupForm from '@/templates/ProfileSetup/ProfileSetupForm';
import ResultPageTemplate from '@/templates/ResultPage';
import SystemConfiguration from '@/templates/SystemConfig';
import WelcomeScreen from '@/templates/WelcomeScreen';

import ROUTES from '@/constants/routes';

const Onboarding = () => {
  const user = useSelector((state) => state.user.data);
  const router = useRouter();

  const calculateStep = useCallback((onboarding) => {
    if (!onboarding) return 1;
    const step =
      Object.values(onboarding).findIndex(
        (onboarding_step) => !onboarding_step
      ) + 1;
    return step > 0 ? step : Object.keys(onboarding).length + 1;
  }, []);

  const [currentStep, setCurrentStep] = useState(() =>
    calculateStep(user?.onboarding)
  );

  useEffect(() => {
    const newStep = calculateStep(user?.onboarding);
    setCurrentStep(newStep);
  }, [user, calculateStep]);

  const handleAdvanceOnboarding = useCallback(() => {
    setCurrentStep((prevStep) => {
      const newStep = prevStep + 1;
      const calculatedStep = calculateStep(user?.onboarding);
      return Math.max(newStep, calculatedStep);
    });
  }, [user, calculateStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WelcomeScreen user={user} onAdvance={handleAdvanceOnboarding} />
        );
      case 2:
        return <ProfileSetupForm user={user} />;
      case 3:
        return <SystemConfiguration user={user} />;
      case 4:
        return <FinalSteps onAdvance={handleAdvanceOnboarding} />;
      case 5:
        return <ResultPageTemplate />;
      default:
        router.push(ROUTES.HOME);
        return null;
    }
  };

  return (
    <OnboardingLayout currentStep={currentStep - 1}>
      <SlideTransition key={currentStep}>{renderStep()}</SlideTransition>
    </OnboardingLayout>
  );
};

export default Onboarding;
