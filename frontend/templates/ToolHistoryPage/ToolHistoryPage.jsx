import { Grid, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

import ToolHistoryListingContainer from '@/components/ToolHistoryListingContainer';

import styles from './styles';

const ToolHistoryPage = () => {
  const { data, loading, error } = useSelector((state) => state.toolHistory);

  if (error) {
    return (
      <Grid {...styles.errorContainer}>
        <Typography {...styles.errorTitle}>
          {error || 'Something went wrong'}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid {...styles.mainGridProps}>
      <ToolHistoryListingContainer data={data} loading={loading} />
    </Grid>
  );
};

export default ToolHistoryPage;
