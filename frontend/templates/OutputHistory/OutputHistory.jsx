import React from 'react';

import { Grid } from '@mui/material';

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
