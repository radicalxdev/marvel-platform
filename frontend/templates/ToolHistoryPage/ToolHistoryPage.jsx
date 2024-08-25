import { useEffect } from 'react';

import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';

import useFilterByTime from '@/hooks/useFilterByTime';

import SnackBar from '@/components/SnackBar';
import ToolHistoryListingContainer from '@/components/ToolHistoryListingContainer';

import ROUTES from '@/constants/routes';

import styles from './styles';

import { fetchToolHistory } from '@/redux/thunks/toolHistory';

import AlertStateUtils from '@/utils/AlertStateUtils';

const ToolHistoryPage = () => {
  const { data, loading } = useSelector((state) => state.toolHistory);

  // grabs categorizedData from the filter hook
  const { isHistoryEmpty, ...categorizedData } = useFilterByTime(data);

  // Initialize alert state and related functions for the delete functionality
  const { alertState, setAlertState, handleAlertClose } = AlertStateUtils();

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the fetchToolHistory action when the component mounts
    dispatch(fetchToolHistory());
  }, [dispatch]);

  // Renders out a title of page
  const renderTitle = () => (
    <Grid {...styles.titleGridProps}>
      <Typography {...styles.titleProps}>Tool History</Typography>
    </Grid>
  );

  /**
   * Renders out an empty message for the user if they don't have any tools cards
   * @returns {JSX.Element} - The empty message grid
   */
  const renderEmptyMessage = () => (
    <Grid {...styles.emptyMessageGridProps}>
      <Typography {...styles.emptyMessageProps}>
        Looks like you don&apos;t have any tools saved. Time to make some!
      </Typography>
      <Typography {...styles.emptyMessageLinkProps}>
        <Link href={ROUTES.HOME} passHref>
          Explore Tools
        </Link>
      </Typography>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {isHistoryEmpty
        ? renderEmptyMessage()
        : Object.values(categorizedData || {}).map((timeData) => (
            <ToolHistoryListingContainer
              key={timeData.title}
              data={timeData.items}
              loading={loading}
              category={timeData.title}
              setAlertState={setAlertState}
            />
          ))}
      <SnackBar
        open={alertState.open}
        handleClose={handleAlertClose}
        message={alertState.message}
        severity={alertState.severity}
      />
    </Grid>
  );
};

export default ToolHistoryPage;
