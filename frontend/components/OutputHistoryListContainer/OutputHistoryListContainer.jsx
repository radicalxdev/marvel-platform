import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import OutputHistoryCard from '../OutputHistoryCard';

import styles from './styles';

import { fetchOutputHistory } from '@/redux/thunks/output';

import { categorizeDate } from '@/utils/DateUtils';

const OutputHistoryListContainer = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.outputHistory);
  const [historyOutput, setHistoryOutput] = useState({
    Week: [],
    Month: [],
    Year: [],
    Older: [],
  });

  useEffect(() => {
    dispatch(fetchOutputHistory());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.length > 0) {
      const newHistoryOutput = {
        Week: [],
        Month: [],
        Year: [],
        Older: [],
      };

      data.forEach((item) => {
        const category = categorizeDate(item.creationDate.toDate(), new Date());
        newHistoryOutput[category].push(item);
      });

      setHistoryOutput(newHistoryOutput);
    } else {
      // Clear the categorized output when there's no data
      setHistoryOutput({
        Week: [],
        Month: [],
        Year: [],
        Older: [],
      });
    }
  }, [data]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  const renderSection = ({ text, size }) => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.categoryTitleProps}>
          {text} ({size})
        </Typography>
      </Grid>
    );
  };

  const renderCards = ({ category }) => {
    return (
      <Grid {...styles.containerGridProps}>
        <Grid {...styles.innerListGridProps}>
          {historyOutput?.[category].map((item) => (
            <OutputHistoryCard key={item.id} {...item} />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Typography {...styles.titleProps}>History</Typography>
      {renderSection({ text: 'This Week', size: historyOutput?.Week?.length })}
      {historyOutput.Week.length > 0 ? (
        renderCards({ category: 'Week' })
      ) : (
        <Grid {...styles.containerGridProps}>
          <Typography>No data for this week.</Typography>
        </Grid>
      )}
      {renderSection({
        text: 'This Month',
        size: historyOutput?.Month?.length,
      })}
      {historyOutput.Month.length > 0 ? (
        renderCards({ category: 'Month' })
      ) : (
        <Grid {...styles.containerGridProps}>
          <Typography>No data for this month.</Typography>
        </Grid>
      )}
      {renderSection({ text: 'This Year', size: historyOutput?.Year?.length })}
      {historyOutput.Year.length > 0 ? (
        renderCards({ category: 'Year' })
      ) : (
        <Grid {...styles.containerGridProps}>
          <Typography>No data for this year.</Typography>
        </Grid>
      )}
      {renderSection({ text: 'Older', size: historyOutput?.Older?.length })}
      {historyOutput.Older.length > 0 ? (
        renderCards({ category: 'Older' })
      ) : (
        <Grid {...styles.containerGridProps}>
          <Typography>No older data available.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default OutputHistoryListContainer;
