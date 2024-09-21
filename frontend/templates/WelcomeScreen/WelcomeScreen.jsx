import React from 'react';

import { Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ROUTES from '@/constants/routes';

import styles from './styles';

const WelcomeScreen = () => {
  const user = useSelector((state) => state.user.data);
  const router = useRouter();
  const theme = useTheme();

  const handleAdvanceOnboarding = async () => {
    router.push(ROUTES.PROFILE_SETUP);
  };

  const renderMessage = () => (
    <Grid>
      <Typography {...styles.MainSectionProps}>
        Welcome to{' '}
        <span
          style={{
            color: '#8653FF',
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
        bgcolor={theme.palette.Dark_Colors.Dark[1]}
        textColor={theme.palette.Common.White['100p']}
        clickHandler={handleAdvanceOnboarding}
        text="Start Here!"
        {...styles.submitButtonProps}
      />
    </Grid>
  );

  return <Grid {...styles.mainGridProps}>{renderMessage()}</Grid>;
};

export default WelcomeScreen;
