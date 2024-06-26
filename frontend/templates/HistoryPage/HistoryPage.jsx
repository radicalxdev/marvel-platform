import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

import useFilterByTime from '@/hooks/useFilterByTime';

import HistoryListingContainer from '@/components/HistoryListingContainer';

import ROUTES from '@/constants/routes';

import styles from './styles';

const HistoryPage = ({ data, loading }) => {
  const { today, yesterday, previous7Days, previous30Days, monthsBefore } =
    useFilterByTime(data);

  console.log('HistoryPage render - data:', data, 'loading:', loading);

  const renderTitle = () => (
    <Grid {...styles.titleGridProps}>
      <Typography {...styles.titleProps}>History</Typography>
    </Grid>
  );

  const renderToolHistoryContainer = (category, timeData) => {
    if (timeData.length === 0) return null;

    return (
      <HistoryListingContainer
        key={category}
        data={timeData} // Corrected data prop to pass timeData instead of data
        loading={loading}
        category={category}
      />
    );
  };

  const renderHistorySections = () => (
    <>
      {renderToolHistoryContainer('Today', today)}
      {renderToolHistoryContainer('Yesterday', yesterday)}
      {renderToolHistoryContainer('Previous 7 days', previous7Days)}
      {renderToolHistoryContainer('Previous 30 days', previous30Days)}
      {Object.entries(monthsBefore).map(([month, timeData]) =>
        renderToolHistoryContainer(month, timeData)
      )}
    </>
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
    today.length === 0 &&
    yesterday.length === 0 &&
    previous30Days.length === 0 &&
    Object.values(monthsBefore).every((timeData) => timeData.length === 0);

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {isHistoryEmpty ? renderEmptyMessage() : renderHistorySections()}{' '}
      {/* Corrected function call */}
    </Grid>
  );
};

export default HistoryPage;
