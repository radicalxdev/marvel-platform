import React, { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ROUTES from '@/constants/routes';

import styles from './styles';

import { advanceOnboardingStatus } from '@/services/onboarding/advanceOnboardingStatus';

const DEFAULT_ERR_STATE = {
  general: null,
};

const WelcomeScreen = () => {
  const user = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERR_STATE);
  const router = useRouter();

  const handleAdvanceOnboarding = async () => {
    try {
      setLoading(true);
      setError(DEFAULT_ERR_STATE); // Reset error state

      const result = await advanceOnboardingStatus(user.id);

      if (!result.success) {
        setError({
          general: 'Please complete the required steps before progressing.',
        });
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to advance onboarding status';
      setError({ general: errorMessage });
    } finally {
      setLoading(false);
      router.push(ROUTES.PROFILE_SETUP);
    }
  };

  const renderMessage = () => (
    <Grid>
      <Typography {...styles.MainSectionProps}>
        Welcome to{' '}
        <span
          style={{
            color: 'primary.main',
          }}
        >
          Kai
        </span>{' '}
        <span>👋</span>
      </Typography>
      <Typography {...styles.MainSectionTwoProps}>
        {`Let's get started, ${user.fullName || 'User'}!`}
      </Typography>

      {error.general && (
        <Typography style={{ color: 'red', marginTop: '10px' }}>
          {error.general}
        </Typography>
      )}

      <GradientOutlinedButton
        bgcolor="primary.main"
        clickHandler={handleAdvanceOnboarding}
        text="Start Here!"
        textColor="white"
        loading={loading}
        {...styles.submitButtonProps}
      />
    </Grid>
  );

  return <Grid {...styles.mainGridProps}>{renderMessage()}</Grid>;
};

export default WelcomeScreen;
