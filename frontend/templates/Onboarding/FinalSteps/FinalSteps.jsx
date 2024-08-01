import React from 'react';

import { Button, Grid, Typography } from '@mui/material';

import styles from '../styles.js';

const FinalSteps = ({ onNext }) => {
  const handleFinish = () => {
    onNext();
  };

  return (
    <Grid {...styles.mainGrid}>
      <Typography {...styles.titleProps}>Final Steps</Typography>
      <Typography {...styles.descriptionProps}>
        Review your information and complete the setup process.
      </Typography>
      <Button {...styles.buttonProps} onClick={handleFinish}>
        Finish
      </Button>
    </Grid>
  );
};

export default FinalSteps;
