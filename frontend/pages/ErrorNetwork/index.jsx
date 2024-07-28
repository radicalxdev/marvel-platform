import React from 'react';

import { Button, Grid, Typography } from '@mui/material';

import MainAppLayout from '@/layouts/MainAppLayout';

const NetworkErrorPage = ({ retry }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh', textAlign: 'center' }}
    >
      <Typography variant="h1">Network Error</Typography>
      <Typography variant="h6">
        There was a problem with your network connection. Please check your
        connection and try again.
      </Typography>
      <Button variant="contained" color="primary" onClick={retry}>
        Retry
      </Button>
      <Button variant="outlined" color="primary" href="/">
        Go to Homepage
      </Button>
    </Grid>
  );
};

NetworkErrorPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default NetworkErrorPage;
