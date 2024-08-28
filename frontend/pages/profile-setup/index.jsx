import { useState } from 'react';
// import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

import ProfileSetupForm from '@/templates/ProfileSetup/ProfileSetupForm';
import OnboardingLayout from '@/layouts/OnboardingLayout';
import { setupUserProfile } from '@/services/onboarding/setupUserProfile';

// import ROUTES from '@/constants/routes';

const ProfileSetup = () => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Access the auth data from the Redux store
  const userData = useSelector((state) => state.user.data);

  const handleProfileSubmit = async (formData) => {
    setIsLoading(true);

    // Construct the profileData object dynamically
    const profileData = {
      uid: userData.id,
      ...(formData.fullName && { fullName: formData.fullName }),
      ...(formData.occupation && { occupation: formData.occupation }),
      ...(formData.bio && { bio: formData.bio }),
      socialLinks: {
        ...(formData.twitterLink && { twitter: formData.twitterLink }),
        ...(formData.facebookLink && { facebook: formData.facebookLink }),
        ...(formData.linkedinLink && { linkedin: formData.linkedinLink }),
      },
      ...(formData.profileImage && { profileImage: formData.profileImage }),
    };

    try {
      // Call the backend service to update preferences
      const response = await setupUserProfile(profileData);
      console.log('Profile updated successfully:', response);
      console.log('Moved to the next step');
      // router.push(ROUTES.NEXT_ONBOARDING_STEP);
    } catch (error) {
      throw new Error(error.message || 'Failed to setup User Profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileSetupForm onSubmit={handleProfileSubmit} isLoading={isLoading} user={userData}/>
  );
};

ProfileSetup.getLayout = function getLayout(page) {
  return <OnboardingLayout currentStep={1}>{page}</OnboardingLayout>;
};

export default ProfileSetup;