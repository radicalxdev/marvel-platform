import React from 'react';

import { Grid, Typography } from '@mui/material';

import HistoryListingContainer from '@/components/HistoryListingContainer';

import styles from './styles';

const HistoryPage = (props) => {
  const { data, loading, error } = props;

  if (error) {
    return (
      <Grid {...styles.errorContainer}>
        <Typography {...styles.errorTitle}>
          Error: Could not fetch history data.
        </Typography>
        <Typography {...styles.errorMessage}>
          Please try again later.
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid {...styles.mainGridProps}>
      <HistoryListingContainer data={data} loading={loading} />
    </Grid>
  );
};

export default HistoryPage;
