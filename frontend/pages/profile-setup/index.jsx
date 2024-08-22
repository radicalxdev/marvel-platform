import { useState} from 'react';
// import { useRouter } from 'next/router';
import { Container, Box } from '@mui/material';

import ProfileSetupForm from '@/templates/ProfileSetup/ProfileSetupForm';
import AuthLayout from '@/layouts/AuthLayout';

// import ROUTES from '@/constants/routes';

const ProfileSetup = () => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileSubmit = async (profileData) => {
    setIsLoading(true);
    try {
      console.log('Call backed with:', profileData);
      console.log('Moved to the next step');
      // router.push(ROUTES.NEXT_ONBOARDING_STEP);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Container maxWidth="md">
      <ProfileSetupForm onSubmit={handleProfileSubmit} isLoading={isLoading} />
    </Container>
    
  );
}

ProfileSetup.getLayout = function getLayout(page) {
  return <AuthLayout isAuthScreen>{page}</AuthLayout>;
};

export default ProfileSetup;