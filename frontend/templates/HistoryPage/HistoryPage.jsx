import React from 'react';

import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

import useFilterByTime from '@/hooks/useFilterByTime';

import HistoryListingContainer from '@/components/HistoryListingContainer';

import ROUTES from '@/constants/routes';

import styles from './styles';

const HistoryPage = ({ mockData }) => {
  const { today, yesterday, previous7Days, previous30Days, monthsBefore } =
    useFilterByTime(mockData);

  const renderTitle = () => (
    <Grid {...styles.titleGridProps}>
      <Typography {...styles.titleProps}>History</Typography>
    </Grid>
  );

  const renderToolHistoryContainer = (category, data) => {
    if (data.length === 0) return null;

    return (
      <HistoryListingContainer
        key={category}
        data={data}
        loading={false} // Since we're using mock data, set loading to false
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
      {Object.entries(monthsBefore).map(([month, data]) =>
        renderToolHistoryContainer(month, data)
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
    Object.values(monthsBefore).every((data) => data.length === 0);

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {isHistoryEmpty ? renderEmptyMessage : renderHistorySections()}
    </Grid>
  );
};

export default HistoryPage;
