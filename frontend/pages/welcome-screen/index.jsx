import OnboardingLayout from '@/layouts/OnboardingLayout';
import WelcomeScreenTem from '@/templates/WelcomeScreen';

const WelcomeScreen = () => {
  return <WelcomeScreenTem />;
};

WelcomeScreen.getLayout = function getLayout(page) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default WelcomeScreen;
