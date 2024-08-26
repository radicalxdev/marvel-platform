/* eslint-disable */
import { useRef, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from './styles';

import theme from '@/theme/theme';

const WelcomeScreen = (props) => {

  const renderMessage = () => {
    return (
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
          Let's get started!
        </Typography>

        <GradientOutlinedButton
          bgcolor={theme.palette.primary.main}
          clickHandler={() => {}}
          text="Start Here!"
          textColor="white"
          {...styles.submitButtonProps}
        />
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderMessage()}
    </Grid>
  );
};

export default WelcomeScreen;
