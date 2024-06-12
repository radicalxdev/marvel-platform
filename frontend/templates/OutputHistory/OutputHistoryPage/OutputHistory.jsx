// templates/OutputHistory/OutputHistory.jsx

import React from 'react';

// Import additional components and hooks as needed
// import { YourComponent } from '@/components/YourComponent';
import { Grid, Typography } from '@mui/material';

import OutputHistoryListContainer from '@/components/OutputHistoryListContainer';

import styles from './styles';

const OutputHistoryPage = (props) => {
  const { data, loading } = props;
  return (
    <Grid {...styles.mainGridProps}>
      <OutputHistoryListContainer data={data} loading={loading} />
    </Grid>
  );
};

export default OutputHistoryPage;
