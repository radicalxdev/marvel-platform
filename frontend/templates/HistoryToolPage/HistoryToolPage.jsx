import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

import useFilterByTime from '@/hooks/useFilterByTime';

import ROUTES from '@/constants/routes';

import styles from './styles';

import { renderHistorySections } from '@/utils/TimeUtils';

const HistoryToolPage = ({ data, loading }) => {
  const filteredData = useFilterByTime(data);

  const renderTitle = () => (
    <Grid {...styles.titleGridProps}>
      <Typography {...styles.titleProps}>Tool History</Typography>
    </Grid>
  );

  const renderEmptyMessage = () => (
    <Grid {...styles.emptyMessageGridProps}>
      <Typography {...styles.emptyMessageProps}>
        Looks like you haven&apos;t explored history yet. Time to make some!
      </Typography>
      <Typography {...styles.emptyMessageLinkProps}>
        <Link href={ROUTES.HOME} passHref>
          Explore Tools
        </Link>
      </Typography>
    </Grid>
  );

  const isHistoryEmpty =
    filteredData.today.length === 0 &&
    filteredData.yesterday.length === 0 &&
    filteredData.previous30Days.length === 0 &&
    Object.values(filteredData.monthsBefore).every(
      (timeData) => timeData.length === 0
    );

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {isHistoryEmpty
        ? renderEmptyMessage()
        : renderHistorySections(filteredData, loading)}
    </Grid>
  );
};

export default HistoryToolPage;
