import { Grid, Typography } from '@mui/material';

import ToolsListingContainer from '@/components/ToolsListingContainer';

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
      <ToolsListingContainer
        data={data}
        loading={loading}
        category="This Week"
      />
      <ToolsListingContainer
        data={data}
        loading={loading}
        category="This Month"
      />
    </Grid>
  );
};
export default HistoryPage;
