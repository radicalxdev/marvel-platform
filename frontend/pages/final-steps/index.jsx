import OnboardingLayout from '@/layouts/OnboardingLayout';
import FinalStpsTem from '@/templates/FinalSteps';

const FinalSteps = () => {
  return <FinalStpsTem />;
};

FinalSteps.getLayout = function getLayout(page) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default FinalSteps;
