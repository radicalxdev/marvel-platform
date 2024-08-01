import React from 'react';

import { Button, Grid, Typography } from '@mui/material';

const FinalSteps = ({ onNext }) => {
  const handleFinish = () => {
    onNext();
  };

  return (
    <Grid sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Final Steps
      </Typography>
      <Typography variant="body1" paragraph>
        Review your information and complete the setup process.
      </Typography>
      <Button variant="contained" onClick={handleFinish}>
        Finish
      </Button>
    </Grid>
  );
};

export default FinalSteps;
