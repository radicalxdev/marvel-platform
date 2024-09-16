import React from 'react';

import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ROUTES from '@/constants/routes';

import styles from './styles';

const WelcomeScreen = () => {
  const user = useSelector((state) => state.user.data);
  const router = useRouter();

  const handleAdvanceOnboarding = async () => {
    router.push(ROUTES.PROFILE_SETUP);
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
          Marvel AI
        </span>{' '}
        <span>👋</span>
      </Typography>
      <Typography {...styles.MainSectionTwoProps}>
        {`Let's get started, ${user.fullName || 'User'}!`}
      </Typography>

      <GradientOutlinedButton
        bgcolor="primary.main"
        clickHandler={handleAdvanceOnboarding}
        text="Start Here!"
        textColor="white"
        {...styles.submitButtonProps}
      />
    </Grid>
  );

  return <Grid {...styles.mainGridProps}>{renderMessage()}</Grid>;
};

export default WelcomeScreen;
