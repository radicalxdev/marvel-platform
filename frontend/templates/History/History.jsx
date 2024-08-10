import { Grid, Typography } from '@mui/material';

import SnackBar from '@/components/SnackBar';
import ToolCardSkeleton from '@/components/ToolCard/Skeleton';
import ToolSessionHistoryListing from '@/components/ToolsSessionHistoryListing';

import styles from './styles';

import AlertStateUtils from '@/utils/AlertStateUtils';

/**
 * Renders the history component with title, form, and snack bar.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.data - The data to be displayed in the history.
 * @param {boolean} props.loading - Indicates if the data is still loading.
 *
 * @returns {JSX.Element} JSX element representing the history component.
 */
const History = (props) => {
  const { data, loading } = props;

  // Initialize alert state and related functions for the delete functionality
  const { alertState, setAlertState, handleAlertClose } = AlertStateUtils();

  /**
   * Function to render the title of the history component
   */
  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>Output History</Typography>
      </Grid>
    );
  };

  /**
   * Function to render the form section of the history component
   */
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
      {/* This Snackbar is mainly here for the delete functionality for when the user deletes a session */}
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
