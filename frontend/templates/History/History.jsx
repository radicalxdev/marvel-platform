import { Grid, Typography } from '@mui/material';

import HistoryListing from '@/components/HistoryListing';
import ToolCardSkeleton from '@/components/ToolCard/Skeleton';

import styles from './styles';

/**
 * Component for rendering the main interface of the history section, including the title and a list of history items.
 *
 * @return {JSX.Element} Rendered history interface component
 */
const HistoryInterface = (props) => {
  const { data, loading } = props;

  /**
   * Function to render the title section of the history interface.
   *
   * @return {JSX.Element} Rendered title component
   */
  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>Output History</Typography>
      </Grid>
    );
  };
  const renderForm = () => {
    if (!data || data.length === 0) {
      return (
        <Typography {...styles.sectionHeaderProps}>
          No history exists
        </Typography>
      );
    }

    return <HistoryListing data={data} />;
  };
  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {loading ? <ToolCardSkeleton /> : renderForm()}
    </Grid>
  );
};

export default HistoryInterface;
