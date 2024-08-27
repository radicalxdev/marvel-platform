/* eslint-disable */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import styles from './styles';
import theme from '@/theme/theme';
import { advanceOnboardingStatus } from '@/services/onboarding/advanceOnboardingStatus';

const DEFAULT_ERR_STATE = {
  general: null,
};

const WelcomeScreen = () => {
  const user = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERR_STATE);

  const handleAdvanceOnboarding = async () => {
    try {
      setLoading(true);
      setError(DEFAULT_ERR_STATE); // Reset error state

      const result = await advanceOnboardingStatus(user.id);
      console.log('result:', result);

      if (!result.success) {
        setError({ general: 'Please complete the required steps before progressing.' });
      } else {
        console.log('Onboarding status advanced');
      }
    } catch (error) {
    
      // console.error('Failed to advance onboarding status:', error); // Log the full error object
      const errorMessage = error.message || 'Failed to advance onboarding status';
      setError({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = () => (
    <Grid>
      <Typography {...styles.MainSectionProps}>
        Welcome to{' '}
        <span
          style={{
            color: theme.palette.primary.main,
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
        bgcolor={theme.palette.primary.main}
        clickHandler={handleAdvanceOnboarding}
        text="Start Here!"
        textColor="white"
        loading={loading}
        {...styles.submitButtonProps}
      />
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {renderMessage()}
    </Grid>
  );
};

export default WelcomeScreen;
