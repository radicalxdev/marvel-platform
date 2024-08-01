import React from 'react';

import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import styles from '../styles.js';

const Welcome = ({ onNext }) => {
  const router = useRouter();

  const handleStart = () => {
    onNext();
    router.push('/onboarding/1'); // Proceed to the first step
  };

  return (
    <Grid {...styles.mainGrid}>
      <Typography {...styles.titleProps}>Welcome to Kai 👋</Typography>
      <Typography {...styles.descriptionProps}>
        Let&lsquo;s get started with your onboarding process.
      </Typography>
      <Button {...styles.buttonProps} onClick={handleStart}>
        Start Here
      </Button>
    </Grid>
  );
};

export default Welcome;
