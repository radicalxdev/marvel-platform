import React from 'react';

import { Button, Grid, Typography } from '@mui/material';

const SystemConfigs = ({ onNext }) => {
  const handleNext = () => {
    onNext();
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
