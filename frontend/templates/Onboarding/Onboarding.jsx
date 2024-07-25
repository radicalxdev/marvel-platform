import Complete from './Complete';
import FinalSteps from './FinalSteps';
import ProfileSetupForm from './ProfileSetupForm';
import SystemConfigs from './SystemConfigs/SystemsConfig';
import Welcome from './Welcome';

const onboardingComponents = {
  0: Welcome,
  1: ProfileSetupForm,
  2: SystemConfigs,
  3: FinalSteps,
  4: Complete,
};

const OnboardingPage = ({ onboardingData }) => {
  const SpecificOnboardingScreen =
    onboardingComponents[onboardingData.id] || Welcome;

  return <SpecificOnboardingScreen />;
};

export default OnboardingPage;
