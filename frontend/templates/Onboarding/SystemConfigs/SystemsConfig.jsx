import React from 'react';

import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const SystemConfigs = ({ onNext }) => {
  const router = useRouter();

  const handleNext = () => {
    onNext();
    // router.push('/onboarding/3'); // Proceed to the next step
  };

  return (
    <Grid sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        System Configurations
      </Typography>
      <Typography variant="body1" paragraph>
        Configure your system settings to optimize your experience.
      </Typography>
      <Button variant="contained" onClick={handleNext}>
        Next
      </Button>
    </Grid>
  );
};

export default SystemConfigs;
