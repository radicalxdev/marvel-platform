import { Grid, Typography } from '@mui/material';

import HistoryListingContainer from '@/components/HistoryListingContainer';

import styles from './styles';

const HistoryPage = (props) => {
  const { data, loading } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>History</Typography>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      <HistoryListingContainer
        data={data}
        loading={loading}
        category="This Week (3)"
      />
    </Grid>
  );
};
export default HistoryPage;
