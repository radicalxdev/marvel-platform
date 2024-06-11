// templates/OutputHistory/OutputHistory.jsx

import React from 'react';

// Import additional components and hooks as needed
// import { YourComponent } from '@/components/YourComponent';
import { Grid, Typography } from '@mui/material';

import styles from './styles';
import OutputHistoryListContainer from '@/components/OutputHistoryListContainer';

const OutputHistoryPage = (props) => {
  const { data, loading } = props;
  return (
    <Grid {...styles.mainGridProps}>
      <OutputHistoryListContainer data={data} loading={loading} />
    </Grid>
  );
};

export default OutputHistoryPage;
