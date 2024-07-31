import React from 'react';

import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Welcome = ({ onNext }) => {
  const router = useRouter();

  const handleStart = () => {
    onNext();
    router.push('/onboarding/1'); // Proceed to the first step
  };

  return (
    <Grid sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Kai!
      </Typography>
      <Typography>Let’s get started with your onboarding process.</Typography>
      <Button variant="contained" onClick={handleStart}>
        Start Here
      </Button>
    </Grid>
  );
};

export default Welcome;
