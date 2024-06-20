import { Grid, Typography } from '@mui/material';

import ToolsHistoryListingContainer from '@/components/ToolsHistoryListingContainer';

import styles from './styles';

const ToolHistoryPage = (props) => {
  const { data, loading, category } = props;

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
      <ToolsHistoryListingContainer
        data={data}
        loading={loading}
        category={category}
      />
    </Grid>
  );
};
export default ToolHistoryPage;
