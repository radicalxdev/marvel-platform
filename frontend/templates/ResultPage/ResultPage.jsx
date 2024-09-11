import React, { useState } from 'react';

import { Button, Grid, Typography, useTheme } from '@mui/material';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import CustomCheckCircle from '@/components/CustomCheckCircle';

import ROUTES from '@/constants/routes';

import { advanceOnboardingStatus } from '@/services/onboarding/advanceOnboardingStatus';

const DEFAULT_ERR_STATE = {
  general: null,
};

const ResultPageTemplate = () => {
  const theme = useTheme();
  const router = useRouter();
  const [error, setError] = useState(DEFAULT_ERR_STATE);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.data);

  const handleContinue = async () => {
    try {
      setLoading(true);
      setError(DEFAULT_ERR_STATE);

      const result = await advanceOnboardingStatus(user.id, 5);

      if (!result.success) {
        setError({
          general:
            'Please, contact support to complete the onboarding process.',
        });
      }
      setLoading(false);
      router.push(ROUTES.HOME);
    } catch (err) {
      const errorMessage = err.message || 'Failed to advance onboarding status';
      setError({ general: errorMessage });
      setLoading(false);
    }
  };
  const renderHead = () => (
    <Head>
      <title>Kai Onboarding</title>
    </Head>
  );

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
      {renderHead()}
      <CustomCheckCircle
        stroke={theme.palette.text.primary}
        fill={theme.palette.primary.light}
        tickColor={theme.palette.primary.contrastText} // Tick color
        tickSize={2} // Adjust this value to control the tick's thickness
        style={{ fontSize: '80px', marginBottom: '20px' }}
      />

      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 1, color: 'text.primary' }}
      >
        Onboarding Complete!
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: 'text.primary' }}
      >
        Congrats! The onboarding is complete,
        <br />
        continue to go to the homepage.
      </Typography>

      {error.general && (
        <Typography style={{ color: 'red', marginTop: '10px' }}>
          {error.general}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleContinue}
        disabled={loading}
        sx={{
          marginTop: '30px',
          backgroundColor: theme.palette.primary.light,
          borderRadius: '30px',
          width: 594,
        }}
      >
        {loading ? 'Submitting...' : 'Finish'}
      </Button>
    </Grid>
  );
};
export default ResultPageTemplate;
