import React from 'react';

import { Button, Grid, Typography } from '@mui/material';

import MainAppLayout from '@/layouts/MainAppLayout';

const ApplicationErrorPage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh', textAlign: 'center' }}
    >
      <Typography variant="h1">Application Error</Typography>
      <Typography variant="h6">
        An error occurred in the application. Please try again later.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go to Homepage
      </Button>
    </Grid>
  );
};

ApplicationErrorPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default ApplicationErrorPage;
