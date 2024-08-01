import React from 'react';

import { Button, Grid, Typography } from '@mui/material';

import styles from '../styles.js';

const SystemConfigs = ({ onNext }) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <Grid {...styles.mainGrid}>
      <Typography {...styles.titleProps}>System Configurations</Typography>
      <Typography {...styles.descriptionProps}>
        Configure your system settings to optimize your experience.
      </Typography>
      <Button {...styles.buttonProps} onClick={handleNext}>
        Next
      </Button>
    </Grid>
  );
};

export default SystemConfigs;
