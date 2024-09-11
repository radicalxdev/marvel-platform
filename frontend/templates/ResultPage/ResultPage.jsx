/* eslint-disable */
import React from 'react';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import CustomCheckCircle from '@/components/CustomCheckCircle';
import ROUTES from '@/constants/routes';

import { useRouter } from 'next/router'; // Use Next.js router

const ResultPageTemplate = () => {
  const theme = useTheme()
  const router = useRouter();

  const handleContinue = () => {
    router.push(ROUTES.HOME); // Navigate to homepage
  };

  return (
    <Grid
    container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: theme.palette.background.primary,
      }}
    >
      <CustomCheckCircle
        stroke={theme.palette.text.primary}
        fill={theme.palette.primary.light}
        tickColor={theme.palette.primary.contrastText} // Tick color
        tickSize={2} // Adjust this value to control the tick's thickness
        style={{ fontSize: '80px', marginBottom: '20px' }}
      />

      <Typography variant="h4" align="center" sx={{ mb: 1, color: 'text.primary' }}>
        Onboarding Complete!
      </Typography>

      <Typography variant="subtitle1" align="center" sx={{ color: 'text.primary' }}>
        Congrats! The onboarding is complete,<br /> 
        continue to go to the homepage.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleContinue}
        sx={{
          marginTop: '30px',
          backgroundColor: theme.palette.primary.light,
          borderRadius: '30px',
          width: 594,
        }}
      >
        Finish
      </Button>
    </Grid>
  );
};
export default ResultPageTemplate;
