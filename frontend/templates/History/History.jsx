import { Grid, Typography } from '@mui/material';

import SnackBar from '@/components/SnackBar';
import ToolCardSkeleton from '@/components/ToolCard/Skeleton';
import ToolSessionHistoryListing from '@/components/ToolsSessionHistoryListing';

import styles from './styles';

import AlertStateUtils from '@/utils/AlertStateUtils';

/**
 * Component for rendering the main interface of the history section, including the title and a list of history items.
 *
 * @return {JSX.Element} Rendered history interface component
 */
const History = (props) => {
  const { data, loading } = props;

  // Using AlertStateUtils to get the alert state and handlers
  const { alertState, setAlertState, handleAlertClose } = AlertStateUtils();
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

    return (
      <ToolSessionHistoryListing data={data} setAlertState={setAlertState} />
    );
  };
  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {loading ? <ToolCardSkeleton /> : renderForm()}
      <SnackBar
        open={alertState.open}
        handleClose={handleAlertClose}
        message={alertState.message}
        severity={alertState.severity}
      />
    </Grid>
  );
};

export default History;
